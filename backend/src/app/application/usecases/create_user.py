from app.application.dto.user import UserRegistration, UserAdd
from app.application.auth_utils import hash_password
from app.application.protocols.uow import UoW
from app.main.exceptions import UserAlreadyExists


class CreateUserUseCase:
    def __init__(self, uow: UoW):
        self.uow = uow

    def __call__(self, register_user: UserRegistration) -> None:
        if self.uow.users.get_one_by_username(register_user.username):
            raise UserAlreadyExists

        user = UserAdd(
            username=register_user.username,
            password=hash_password(register_user.password),
            role=register_user.role,
        )
        self.uow.users.add_one(user)
