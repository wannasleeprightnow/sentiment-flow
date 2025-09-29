from datetime import date
from uuid import UUID

from app.application.dto.review import ReviewsDTO
from app.application.protocols.uow import UoW


class GetReviewsByTopicUsecase:
    def __init__(self, uow: UoW):
        self._uow = uow

    async def __call__(
        self, topic_id: UUID, from_date: date = None, to_date: date = None
    ) -> ReviewsDTO:
        from_date = date(2024, 1, 1) if from_date is None else from_date
        to_date = date(2025, 5, 31) if to_date is None else to_date

        async with self._uow:
            reviews = await self._uow.reviews.get_reviews_by_topic_id_and_date(
                topic_id, from_date, to_date
            )
            return reviews
