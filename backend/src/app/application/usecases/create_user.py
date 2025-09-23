from app.application.dto.user import UserRegistration, UserAdd
from app.application.auth_utils import hash_password
from app.application.protocols.uow import UoW
from app.main.exceptions import UserAlreadyExistsError


class CreateUserUsecase:
    def __init__(self, uow: UoW):
        self._uow = uow

    async def __call__(self, register_user: UserRegistration) -> None:
        async with self._uow:
            if (
                await self._uow.users.get_one_by_username(register_user.username)
                is not None
            ):
                raise UserAlreadyExistsError

            user = UserAdd(
                username=register_user.username,
                password=hash_password(register_user.password),
                role=register_user.role,
            )
            await self._uow.users.add_one(user)
            await self._uow.commit()
