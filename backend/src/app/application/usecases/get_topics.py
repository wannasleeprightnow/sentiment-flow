from app.application.dto.topic import TopicsDTO
from app.application.protocols.uow import UoW


class GetTopicsUsecase:
    def __init__(self, uow: UoW):
        self._uow = uow

    async def __call__(self) -> TopicsDTO:
        async with self._uow:
            topics = await self._uow.topics.get_all()
            return topics
