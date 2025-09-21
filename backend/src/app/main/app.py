from contextlib import asynccontextmanager
import logging
import sys

from fastapi import FastAPI
from dishka.integrations.fastapi import setup_dishka

from app.main.config import Config
from app.main.di.container import container_factory


@asynccontextmanager
async def lifespan(app: FastAPI):  # noqa
    yield
    await app.state.dishka_container.close()


def create_app() -> FastAPI:
    config = Config()

    app = FastAPI(
        lifespan=lifespan,
        title=config.app.title,
        docs_url=config.app.docs_url,
        openapi_url=config.app.openapi_url,
    )

    container = container_factory(config)
    setup_dishka(container, app)

    logging.basicConfig(level=config.logging.level, stream=sys.stdout)

    return app
