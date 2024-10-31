import random
import string

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from .models import User


class UserRepo:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get(self, user_id: int) -> User | None:
        """Get user by ID."""
        return await self._session.scalar(
            select(User).where(User.id == user_id),
        )

    async def get_by_fingerprint(self, fingerprint: str) -> User | None:
        """Get user by fingerprint."""
        return await self._session.scalar(
            select(User).where(User.fingerprint == fingerprint),
        )

    async def create(self, fingerprint: str) -> User:
        """Create a new user."""
        user = User(
            fingerprint=fingerprint,
            username=self.generate_random_username(),
        )
        self._session.add(user)
        await self._session.commit()
        return user

    @staticmethod
    def generate_random_username() -> str:
        """Generate a partially readable unique random username within 8 characters."""
        letters = string.ascii_letters
        return "".join(random.choice(letters) for _ in range(8))

    async def get_many_by_ids(self, user_ids: list[int]) -> list[User | None]:
        """Get multiple users by IDs."""
        stmt = select(User).where(User.id.in_(user_ids))
        user_by_id = {user.id: user for user in await self._session.scalars(stmt)}

        return [user_by_id.get(user_id) for user_id in user_ids]
