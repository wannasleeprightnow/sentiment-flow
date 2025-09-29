from uuid import UUID

from pydantic import BaseModel

class TopicDTO(BaseModel):
    topic_id: UUID
    title: str


class TopicsDTO(BaseModel):
    topics: list[TopicDTO]
    total_count: int
