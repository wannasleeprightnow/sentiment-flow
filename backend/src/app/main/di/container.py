from dishka import AsyncContainer, make_async_container

from app.main.config import Config
from app.main.di.providers.config import ConfigProvider
# from app.main.di.providers.sqlal import SqlAlProvider
# from app.main.di.providers.usecases import UseCaseProvider


def container_factory(config: Config) -> AsyncContainer:
    return make_async_container(
        ConfigProvider(),
        # SqlAlProvider(),
        # UseCaseProvider(),
        context={Config: config},
    )
