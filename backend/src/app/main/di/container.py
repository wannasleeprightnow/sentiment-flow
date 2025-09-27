from dishka import AsyncContainer, make_async_container
from dishka.integrations.fastapi import FastapiProvider

from app.main.config import Config
from app.main.di.providers.auth import AuthProvider
from app.main.di.providers.config import ConfigProvider
from app.main.di.providers.sqla import SqlaProvider
from app.main.di.providers.usecases import UseCaseProvider


def container_factory(config: Config) -> AsyncContainer:
    return make_async_container(
        AuthProvider(),
        ConfigProvider(),
        SqlaProvider(),
        UseCaseProvider(),
        FastapiProvider(),
        context={Config: config},
    )
