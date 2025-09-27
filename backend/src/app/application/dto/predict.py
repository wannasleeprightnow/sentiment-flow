from typing import Literal

from pydantic import BaseModel


class Review(BaseModel):
    id: int
    text: str


class Prediction(BaseModel):
    id: int
    topics: list[str]
    sentiments: list[Literal["положительно", "отрицательно", "нейтрально"]]


class PredictRequest(BaseModel):
    data: list[Review]


class PredictsResponse(BaseModel):
    predictions: list[Prediction]
