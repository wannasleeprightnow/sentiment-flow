from contextlib import asynccontextmanager
import logging
import sys

from fastapi import FastAPI
from dishka.integrations.fastapi import setup_dishka

from app.main.config import Config
from app.main.di.container import container_factory
from app.presentation.http.predict import router as predict_router


@asynccontextmanager
async def lifespan(app: FastAPI):  # noqa
    yield
    await app.state.dishka_container.close()


def init_routers(app: FastAPI, api_prefix: str) -> None:
    app.include_router(predict_router, prefix=api_prefix)


def create_app() -> FastAPI:
    config = Config()

    app = FastAPI(
        lifespan=lifespan,
        title=config.app.title,
        docs_url=config.app.docs_url,
        openapi_url=config.app.openapi_url,
    )

    init_routers(app, config.app.prefix)

    container = container_factory(config)
    setup_dishka(container, app)

    logging.basicConfig(level=config.logging.level, stream=sys.stdout)

    return app
