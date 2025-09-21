from os import environ
from typing import Literal

from pydantic import BaseModel, Field, PostgresDsn


class AppConfig(BaseModel):
    title: str = Field(alias="APP_TITLE")
    allow_origins: list[str] = Field(
        alias="API_ALLOW_ORIGINS",
        default=["http://localhost:5173", "http://frontend_app"],
    )
    docs_url: str | None = Field(alias="API_DOCS_URL", default=None)
    openapi_url: str | None = Field(alias="API_OPENAPI_URL", default=None)


class PostgresConfig(BaseModel):
    host: str = Field(alias="POSTGRES_HOST")
    port: int = Field(alias="POSTGRES_PORT")
    username: str = Field(alias="POSTGRES_USER")
    password: str = Field(alias="POSTGRES_PASSWORD")
    database: str = Field(alias="POSTGRES_DB")

    @property
    def database_dsn(self) -> str:
        return str(
            PostgresDsn.build(  # pyright: ignore
                scheme="postgresql+asyncpg",
                username=self.username,
                password=self.password,
                host=self.host,
                port=self.port,
                path=self.database,
            )
        )


class SqlaConfig(BaseModel):
    echo: bool = Field(alias="SQLA_ECHO", default=False)
    pool_size: int = Field(alias="SQLA_POOL_SIZE", default=15)
    max_overflow: int = Field(alias="SQLA_MAX_OVERFLOW", default=15)


class LoggingConfig(BaseModel):
    level: Literal[
        "DEBUG",
        "INFO",
        "WARNING",
        "ERROR",
        "CRITICAL",
    ] = Field(alias="LOG_LEVEL")


class RedisConfig(BaseModel):
    host: str = Field(alias="REDIS_HOST")
    port: int = Field(alias="REDIS_PORT")
    db_num: str = Field(alias="REDIS_NUM_DB")


class Config(BaseModel):
    app: AppConfig = Field(
        default_factory=lambda: AppConfig(**environ)  # pyright: ignore
    )
    logging: LoggingConfig = Field(
        default_factory=lambda: LoggingConfig(**environ)  # pyright: ignore
    )
    postgres: PostgresConfig = Field(
        default_factory=lambda: PostgresConfig(**environ)  # pyright: ignore
    )
    sqlal: SqlaConfig = Field(default_factory=lambda: SqlaConfig(**environ))  # pyright: ignore
    redis: RedisConfig = Field(default_factory=lambda: RedisConfig(**environ))  # pyright: ignore
