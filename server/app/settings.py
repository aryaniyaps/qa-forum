import enum
import functools
from typing import TYPE_CHECKING, Annotated, TypeVar
from urllib.parse import quote_plus

import dotenv
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

TSettings = TypeVar("TSettings", bound=BaseSettings)


@functools.cache
def _load_dotenv_once() -> None:
    dotenv.load_dotenv()


def get_settings(cls: type[TSettings]) -> TSettings:
    _load_dotenv_once()
    return cls()


if not TYPE_CHECKING:  # pragma: no cover
    get_settings = functools.lru_cache(get_settings)


class LoggingLevel(enum.StrEnum):
    DEBUG = enum.auto()
    INFO = enum.auto()
    WARNING = enum.auto()
    ERROR = enum.auto()
    CRITICAL = enum.auto()


class CloudPlatform(enum.StrEnum):
    AZURE = enum.auto()
    AWS = enum.auto()


class AppSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="app_")

    cors_allow_origins: Annotated[
        list[str],
        Field(
            examples=[
                {
                    "example.com",
                },
            ],
        ),
    ] = ["*"]

    openapi_url: str | None = None

    root_path: str = ""


class CoreSettings(BaseSettings):
    debug: bool = False

    cloud_platform: CloudPlatform


class ServerSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="server_")

    host: Annotated[
        str,
        Field(
            examples=[
                "127.0.0.1",
            ],
        ),
    ] = "127.0.0.1"

    port: Annotated[
        int,
        Field(
            examples=[
                8000,
            ],
        ),
    ] = 8000


class DatabaseSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="database_")

    driver: str = "postgresql+asyncpg"
    name: str
    username: str
    password: str
    host: str
    use_ssl: bool = False

    echo: bool = False

    pool_size: Annotated[
        int,
        Field(
            examples=[
                20,
            ],
            gt=0,
        ),
    ] = 20

    @property
    def url(self) -> str:
        password = quote_plus(self.password)
        url = f"{self.driver}://{self.username}:{password}@{self.host}/{self.name}"
        if self.use_ssl:
            url = f"{url}?ssl=require"
        return url


class LoggingSettings(BaseSettings):
    model_config = SettingsConfigDict(env_prefix="logging_")

    level: LoggingLevel = LoggingLevel.INFO
