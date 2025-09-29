from dishka import Provider, Scope, provide

from app.main.config import JWTConfig
from app.application.protocols.uow import UoW
from app.application.usecases.auth_login import AuthLoginUsecase
from app.application.usecases.create_user import CreateUserUsecase
from app.application.usecases.get_reviews_by_topic import GetReviewsByTopicUsecase
from app.application.usecases.get_topics import GetTopicsUsecase


class UseCaseProvider(Provider):
    @provide(scope=Scope.REQUEST)
    def provide_create_user_usecase(self, uow: UoW) -> CreateUserUsecase:
        return CreateUserUsecase(uow)

    @provide(scope=Scope.REQUEST)
    def provide_auth_login_usecase(
        self, uow: UoW, jwt_config: JWTConfig
    ) -> AuthLoginUsecase:
        return AuthLoginUsecase(uow, jwt_config)

    @provide(scope=Scope.REQUEST)
    def provide_get_topics_usecase(self, uow: UoW) -> GetTopicsUsecase:
        return GetTopicsUsecase(uow)

    @provide(scope=Scope.REQUEST)
    def provide_get_reviews_by_topic(self, uow: UoW) -> GetReviewsByTopicUsecase:
        return GetReviewsByTopicUsecase(uow)
