from uuid import UUID

from fastapi import APIRouter
from dishka.integrations.fastapi import DishkaRoute, FromDishka

router = APIRouter(route_class=DishkaRoute)


@router.post("/predict", response_model=UUID)
def predict(user_id: FromDishka[UUID]) -> UUID:
    return user_id
