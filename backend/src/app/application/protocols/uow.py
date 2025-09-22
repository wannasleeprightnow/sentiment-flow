from abc import abstractmethod
from typing import Protocol, Self

from app.application.protocols.repositories.user import UserRepository


class UoW(Protocol):
    users: UserRepository

    @abstractmethod
    def __aenter__(self) -> Self:
        raise NotImplementedError

    @abstractmethod
    async def __aexit__(self, *args: tuple) -> None:  # pyright: ignore[reportUnknownParameterType, reportMissingTypeArgument]
        raise NotImplementedError

    @abstractmethod
    async def commit(self) -> None:
        raise NotImplementedError

    @abstractmethod
    async def rollback(self) -> None:
        raise NotImplementedError
