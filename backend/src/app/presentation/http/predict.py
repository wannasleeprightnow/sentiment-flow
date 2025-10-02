from pathlib import Path
import re
import numpy as np
from uuid import UUID
from fastapi import APIRouter, Body
from dishka.integrations.fastapi import DishkaRoute, FromDishka
from app.application.dto.predict import (
    PredictRequestDTO,
    PredictsResponseDTO,
    PredictionDTO,
)
from sklearn.preprocessing import normalize

import joblib
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

MODELS_DIR = Path("/code/models")
vectorizer = joblib.load(MODELS_DIR / "multilable" / "tfidf_vectorizer.pkl")
nmf = joblib.load(MODELS_DIR / "multilable" / "nmf_model.pkl")
threshold = joblib.load(MODELS_DIR / "multilable" / "threshold.pkl")
tokenizer = AutoTokenizer.from_pretrained(MODELS_DIR / "sentiment")
model = AutoModelForSequenceClassification.from_pretrained(MODELS_DIR / "sentiment")

topic_names = {
    0: "Поддержка по горячей линии",
    1: "Выпуск UnionPay карт",
    2: "Навязанные услуги",
    3: "Выпуск дебетовых и кредитных карт",
    4: "Банковский счет",
    5: "Кэшбэк",
    6: "Вознаграждение за друга",
    7: "Сертификаты Озон",
    8: "Очная консультация с сотрудником банка",
    9: "Премиум пакет услуг",
    10: "Чат и техническая поддержка",
}


def preprocess_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"\d+", "", text)
    text = re.sub(r"[^\w\s]", "", text)
    return text


def predict_multilabel(texts: list[str]) -> list[list[str]]:
    preprocessed = [preprocess_text(text) for text in texts]
    X_new = vectorizer.transform(preprocessed)
    W_new = nmf.transform(X_new)
    W_normalized_new = normalize(W_new, norm="l1", axis=1)
    labels_new = (W_normalized_new > threshold).astype(int)
    topics_list = [list(np.where(row == 1)[0]) for row in labels_new]
    named_topics = [[topic_names[i] for i in topics] for topics in topics_list]
    return named_topics


def predict_sentiment(texts: list[str]) -> list[str]:
    results = []
    for text in texts:
        inputs = tokenizer(
            text, return_tensors="pt", padding=True, truncation=True, max_length=512
        )
        with torch.no_grad():
            outputs = model(**inputs)
        probs = torch.softmax(outputs.logits, dim=1)
        label = torch.argmax(probs, dim=1).item()
        labels_map = {0: "отрицательно", 1: "нейтрально", 2: "положительно"}
        results.append(labels_map[label])
    return results


router = APIRouter(prefix="/predict", route_class=DishkaRoute)


@router.post("", response_model=PredictsResponseDTO)
def predict(
    user_id: FromDishka[UUID],
    predict: PredictRequestDTO = Body(),
) -> PredictsResponseDTO:
    texts = [review.text for review in predict.data]
    ids = [review.id for review in predict.data]

    topics = predict_multilabel(texts)
    sentiments = predict_sentiment(texts)

    predictions = [
        PredictionDTO(id=idx, topics=topic_list, sentiments=[sentiment])
        for idx, topic_list, sentiment in zip(ids, topics, sentiments)
    ]

    return PredictsResponseDTO(predictions=predictions)
