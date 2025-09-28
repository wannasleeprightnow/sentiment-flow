from typing import Literal

from pydantic import BaseModel


class ReviewDTO(BaseModel):
    id: int
    text: str


class PredictRequestDTO(BaseModel):
    data: list[ReviewDTO]


class PredictionDTO(BaseModel):
    id: int
    topics: list[str]
    sentiments: list[Literal["положительно", "отрицательно", "нейтрально"]]


class PredictsResponseDTO(BaseModel):
    predictions: list[PredictionDTO]
