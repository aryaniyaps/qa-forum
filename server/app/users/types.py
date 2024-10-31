from collections.abc import Iterable
from datetime import datetime
from typing import Self

import strawberry

from app.base.types import BaseNodeType
from app.context import Info
from app.users.models import User


@strawberry.type(name="User")
class UserType(BaseNodeType[User]):
    username: str
    created_at: datetime
    updated_at: datetime | None

    @classmethod
    def from_orm(cls, user: User) -> Self:
        """Construct a node from an ORM instance."""
        return cls(
            id=user.id,
            username=user.username,
            created_at=user.created_at,
            updated_at=user.updated_at,
        )

    @classmethod
    async def resolve_nodes(  # type: ignore[no-untyped-def] # noqa: ANN206
        cls,
        *,
        info: Info,
        node_ids: Iterable[str],
        required: bool = False,  # noqa: ARG003
    ):
        users = await info.context.loaders.user_by_id.load_many(node_ids)
        return [cls.from_orm(user) if user is not None else user for user in users]
