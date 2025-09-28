from abc import abstractmethod
from typing import Protocol, Self

from app.application.protocols.repositories.user import UserRepository


class UoW(Protocol):
    users: UserRepository

    @abstractmethod
    def __aenter__(self) -> Self: ...

    @abstractmethod
    async def __aexit__(self, *args: tuple) -> None:  # pyright: ignore[reportUnknownParameterType, reportMissingTypeArgument]
        ...

    @abstractmethod
    async def commit(self) -> None: ...

    @abstractmethod
    async def rollback(self) -> None: ...
