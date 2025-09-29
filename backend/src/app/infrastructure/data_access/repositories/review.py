from datetime import date
from uuid import UUID

from sqlalchemy import func, and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.dto.review import ReviewsDTO, ReviewDTO
from app.infrastructure.data_access.models.topic import TopicModel
from app.infrastructure.data_access.models.review import ReviewModel


class SqlaReviewRepository:
    _model = ReviewModel

    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_reviews_by_topic_id_and_date(
        self, topic_id: UUID, from_date: date, to_date: date
    ) -> ReviewsDTO:
        reviews = (
            await self._session.execute(
                select(self._model.created_at, self._model.sentiment)
                .join(self._model.topics)
                .where(
                    and_(
                        TopicModel.topic_id == topic_id,
                        self._model.created_at.between(from_date, to_date),
                    )
                )
            )
        ).all()
        total_count = (
            await self._session.execute(
                select(func.count())
                .select_from(self._model)
                .join(self._model.topics)
                .where(
                    and_(
                        TopicModel.topic_id == topic_id,
                        self._model.created_at.between(from_date, to_date),
                    )
                )
            )
        ).scalar_one()
        return ReviewsDTO(
            reviews=[
                ReviewDTO(date=created_at, sentiment=sentiment)
                for created_at, sentiment in reviews
            ],
            total_count=total_count,
        )
