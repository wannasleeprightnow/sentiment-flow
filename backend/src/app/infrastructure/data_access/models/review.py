import enum
import datetime
from typing import TYPE_CHECKING
import uuid

from sqlalchemy import Enum, DateTime, Text
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship


from app.infrastructure.data_access.models.base import Base

if TYPE_CHECKING:
    from app.infrastructure.data_access.models.topic import TopicModel


class Sentiment(str, enum.Enum):
    POSITIVE = "положительно"
    NEGATIVE = "отрицатетельно"
    NEUTRAL = "нейтрально"


class ReviewModel(Base):
    __tablename__ = "reviews"

    review_id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True)
    text: Mapped[str] = mapped_column(Text, nullable=True)
    sentiment: Mapped[Sentiment] = mapped_column(Enum(Sentiment))
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime)
    rating: Mapped[int]

    topics: Mapped[list["TopicModel"]] = relationship(
        back_populates="reviews", uselist=True, secondary="topic_review"
    )
