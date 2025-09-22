from abc import abstractmethod
from typing import Protocol
from uuid import UUID

from app.application.dto.user import User, UserAdd


class UserRepository(Protocol):
    @abstractmethod
    async def add_one(self, user: UserAdd) -> None:
        raise NotImplementedError

    @abstractmethod
    async def get_one_by_username(self, username: str) -> User | None:
        raise NotImplementedError

    @abstractmethod
    async def get_one_by_user_id(self, user_id: UUID) -> User | None:
        raise NotImplementedError
