from app.application.protocols.uow import UoW
from app.application.dto.user import UserCredentials
from app.application.auth_utils import is_valid_password, jwt_encode
from app.main.config import JWTConfig
from app.main.exceptions import InvalidCredentials


class AuthLoginUsecase:
    def __init__(self, uow: UoW, jwt_config: JWTConfig):
        self._jwt_config = jwt_config
        self._uow = uow

    async def __call__(self, credentials: UserCredentials) -> str:
        async with self._uow:
            user = await self._uow.users.get_one_by_username(credentials.username)

            if user is None or not is_valid_password(
                credentials.password, user.password
            ):
                raise InvalidCredentials

            access_token = jwt_encode({"sub": str(user.user_id)}, self._jwt_config)

            return f"Bearer {access_token}"
