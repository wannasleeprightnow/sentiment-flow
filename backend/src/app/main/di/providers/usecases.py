from dishka import Provider, Scope, provide

from app.application.protocols.uow import UoW
from app.application.usecases.create_user import CreateUserUseCase


class UseCaseProvider(Provider):
    @provide(scope=Scope.REQUEST)
    def provide_create_user_usecase(self, uow: UoW) -> CreateUserUseCase:
        return CreateUserUseCase(uow)
