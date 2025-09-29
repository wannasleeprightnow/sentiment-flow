from uuid import UUID

from fastapi import APIRouter
from dishka.integrations.fastapi import FromDishka, DishkaRoute

from app.application.dto.topic import TopicsDTO
from app.application.usecases.get_topics import GetTopicsUsecase

router = APIRouter(prefix="/topic", tags=["topic"], route_class=DishkaRoute)


@router.get("", response_model=TopicsDTO, status_code=200)
async def get_topics(
    user_id: FromDishka[UUID], usecase: FromDishka[GetTopicsUsecase]
) -> TopicsDTO:
    topics = await usecase()
    return topics
