import uuid

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from app.infrastructure.data_access.models.base import Base


class TopicReviewModel(Base):
    __tablename__ = "topic_review"

    topic_id: Mapped[uuid.UUID] = mapped_column(
        UUID, ForeignKey("topics.topic_id", ondelete="CASCADE"), primary_key=True
    )
    review_id: Mapped[uuid.UUID] = mapped_column(
        UUID, ForeignKey("reviews.review_id", ondelete="CASCADE"), primary_key=True
    )
