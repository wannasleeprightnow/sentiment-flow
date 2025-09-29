from abc import abstractmethod
from typing import Protocol

from app.application.dto.topic import TopicsDTO


class TopicRepository(Protocol):

    @abstractmethod
    async def get_all(self) -> TopicsDTO:
        ...