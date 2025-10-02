from os import environ
from pathlib import Path
from typing import Literal

from pydantic import BaseModel, Field, PostgresDsn

BASE_DIR = Path(__file__).parent.parent.parent.parent
MODELS_DIR = BASE_DIR / "models"


class AppConfig(BaseModel):
    title: str = Field(alias="APP_TITLE")
    allow_origins: list[str] = Field(
        alias="API_ALLOW_ORIGINS",
        default=["*"],
    )
    docs_url: str | None = Field(alias="API_DOCS_URL", default=None)
    openapi_url: str | None = Field(alias="API_OPENAPI_URL", default=None)
    prefix: str = Field(alias="APP_PREFIX_API", default="/api")


class JWTConfig(BaseModel):
    expire_at_seconds: int = Field(alias="JWT_EXPIRE_TIME_SECONDS", default=1800)
    alghorithm: str = "RS256"
    public_key: Path = BASE_DIR / "private_keys" / "jwt-public.pem"
    private_key: Path = BASE_DIR / "private_keys" / "jwt-private.pem"


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


class Config(BaseModel):
    app: AppConfig = Field(
        default_factory=lambda: AppConfig(**environ)  # pyright: ignore
    )
    jwt: JWTConfig = Field(
        default_factory=lambda: JWTConfig(**environ)  # pyright: ignore
    )
    logging: LoggingConfig = Field(
        default_factory=lambda: LoggingConfig(**environ)  # pyright: ignore
    )
    postgres: PostgresConfig = Field(
        default_factory=lambda: PostgresConfig(**environ)  # pyright: ignore
    )
    sqla: SqlaConfig = Field(
        default_factory=lambda: SqlaConfig(**environ)
    )  # pyright: ignore
