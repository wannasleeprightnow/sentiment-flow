from dishka import Provider, Scope, from_context, provide
from dishka.dependency_source.composite import CompositeDependencySource

from app.main.config import AppConfig, Config, JWTConfig, PostgresConfig, SqlaConfig


class ConfigProvider(Provider):
    config: CompositeDependencySource = from_context(
        provides=Config, scope=Scope.RUNTIME
    )

    @provide(scope=Scope.APP)
    def provide_config(self, config: Config) -> Config:
        return config

    @provide(scope=Scope.APP)
    def provide_postgres_config(self, config: Config) -> PostgresConfig:
        return config.postgres

    @provide(scope=Scope.APP)
    def provide_jwt_config(self, config: Config) -> JWTConfig:
        return config.jwt

    @provide(scope=Scope.APP)
    def provide_sqla_config(self, config: Config) -> SqlaConfig:
        return config.sqla

    @provide(scope=Scope.APP)
    def provide_app_config(self, config: Config) -> AppConfig:
        return config.app
