from datetime import date
from uuid import UUID

from fastapi import APIRouter
from dishka.integrations.fastapi import FromDishka, DishkaRoute

from app.application.dto.review import ReviewsDTO
from app.application.usecases.get_reviews_by_topic import GetReviewsByTopicUsecase


router = APIRouter(tags=["review"], route_class=DishkaRoute)


@router.get("/review/{topic_id}", response_model=ReviewsDTO, status_code=200)
async def get_reviews_by_topic(
    topic_id: UUID,
    user_id: FromDishka[UUID],
    usecasse: FromDishka[GetReviewsByTopicUsecase],
    from_date: date = None,
    to_date: date = None,
) -> ReviewsDTO:
    reviews = await usecasse(topic_id, from_date, to_date)
    return reviews
