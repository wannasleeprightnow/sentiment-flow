from uuid import UUID

from fastapi import APIRouter, Body
from dishka.integrations.fastapi import DishkaRoute, FromDishka

from app.application.dto.predict import PredictRequest, PredictsResponse, Prediction


router = APIRouter(route_class=DishkaRoute)


@router.post("/predict", response_model=PredictsResponse)
def predict(
    user_id: FromDishka[UUID], predict: PredictRequest = Body()
) -> PredictsResponse:
    return PredictsResponse(
        predictions=[
            Prediction(id=1, topics=["Обслуживание"], sentiments=["положительно"])
        ]
    )
