from fastapi import FastAPI


def create_app() -> FastAPI:
    app = FastAPI(title="sentiment-flow")

    return app
