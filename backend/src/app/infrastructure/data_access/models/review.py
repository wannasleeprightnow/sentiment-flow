from datetime import date
from typing import Literal, TYPE_CHECKING
import uuid

from sqlalchemy import Date, Text, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship


from app.infrastructure.data_access.models.base import Base

if TYPE_CHECKING:
    from app.infrastructure.data_access.models.topic import TopicModel


class ReviewModel(Base):
    __tablename__ = "reviews"

    review_id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True)
    text: Mapped[str] = mapped_column(Text, nullable=True)
    sentiment: Mapped[Literal["положительно", "отрицательно", "нейтрально"]] = (
        mapped_column(String(12))
    )
    created_at: Mapped[date] = mapped_column(Date)
    rating: Mapped[int]

    topics: Mapped[list["TopicModel"]] = relationship(
        back_populates="reviews", uselist=True, secondary="topic_review"
    )
