from uuid import UUID

from fastapi import APIRouter, Body
from dishka.integrations.fastapi import DishkaRoute, FromDishka

from app.application.dto.predict import (
    PredictRequestDTO,
    PredictsResponseDTO,
    PredictionDTO,
)

router = APIRouter(route_class=DishkaRoute)


@router.post("/predict", response_model=PredictsResponseDTO)
def predict(
    user_id: FromDishka[UUID], predict: PredictRequestDTO = Body()
) -> PredictsResponseDTO:
    return PredictsResponseDTO(
        predictions=[
            PredictionDTO(id=1, topics=["Обслуживание"], sentiments=["положительно"])
        ]
    )
