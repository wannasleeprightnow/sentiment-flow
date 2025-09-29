from abc import abstractmethod
from datetime import date
from typing import Protocol
from uuid import UUID

from app.application.dto.review import ReviewsDTO


class ReviewRepository(Protocol):
    @abstractmethod
    async def get_reviews_by_topic_id_and_date(
        self, topic_id: UUID, from_date: date, to_date: date
    ) -> ReviewsDTO: ...
