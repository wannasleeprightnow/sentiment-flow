from abc import abstractmethod
from typing import Protocol
from uuid import UUID

from sqlalchemy import insert, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.dto.user import UserAdd, UserRegistration, User
from app.infrastructure.data_access.models.user import UserModel


class SqlaUserRepository:
    _model = UserModel

    def __init__(self, session: AsyncSession):
        self._session = session

    async def add_one(self, user: UserAdd) -> None:
        await self._session.execute(insert(UserModel).values(user.model_dump()))

    async def get_one_by_username(self, username: str) -> User | None:
        user = await self._session.execute(
            select(UserModel).where(UserModel.username == username)
        )
        return user.scalar_one().to_dto() if user else None

    # @abstractmethod
    # async def get_one_by_user_id(self, user_id: UUID) -> User | None:
    #     raise NotImplementedError
