from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.dto.topic import TopicsDTO
from app.infrastructure.data_access.models.topic import TopicModel




class SqlaTopicRepository:
    _model = TopicModel

    def __init__(self, session: AsyncSession):
        self._session = session

    async def get_all(self) -> TopicsDTO:
        topics = (await self._session.execute(
            select(self._model)
        )).scalars().all()
        return TopicsDTO(topics=[topic.to_dto() for topic in topics], total_count=len(topics))
