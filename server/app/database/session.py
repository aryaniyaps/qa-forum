from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from app.settings import DatabaseSettings, get_settings

database_settings = get_settings(DatabaseSettings)

database_engine = create_async_engine(
    url=database_settings.url,
    echo=database_settings.echo,
    pool_size=database_settings.pool_size,
    pool_use_lifo=True,
    pool_pre_ping=True,
)

async_session_factory = async_sessionmaker(
    bind=database_engine,
    expire_on_commit=False,
)


async def get_database_session() -> AsyncGenerator[AsyncSession, None]:
    """Get the database session."""
    async with async_session_factory() as session:
        yield session
