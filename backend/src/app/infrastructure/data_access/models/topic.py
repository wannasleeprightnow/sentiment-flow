from typing import TYPE_CHECKING
import uuid

from sqlalchemy import String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.infrastructure.data_access.models.base import Base

if TYPE_CHECKING:
    from app.infrastructure.data_access.models.review import ReviewModel


class TopicModel(Base):
    __tablename__ = "topics"

    topic_id: Mapped[uuid.UUID] = mapped_column(UUID, primary_key=True)
    title: Mapped[str] = mapped_column(String(40))

    reviews: Mapped[list["ReviewModel"]] = relationship(
        back_populates="topics", uselist=True, secondary="topic_review"
    )
