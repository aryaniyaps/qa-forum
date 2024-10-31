from typing import Annotated

from aioinject import Inject
from aioinject.ext.strawberry import inject

from app.users.repositories import UserRepo

from .models import User


@inject
async def load_user_by_id(
    user_ids: list[str],
    user_repo: Annotated[
        UserRepo,
        Inject,
    ],
) -> list[User | None]:
    """Load multiple users by their IDs."""
    return await user_repo.get_many_by_ids(
        user_ids=list(map(int, user_ids)),
    )
