from datetime import date
from typing import Literal

from pydantic import BaseModel


class ReviewDTO(BaseModel):
    date: date
    sentiment: Literal["положительно", "нейтрально", "отрицательно"]


class ReviewsDTO(BaseModel):
    reviews: list[ReviewDTO]
    total_count: int
