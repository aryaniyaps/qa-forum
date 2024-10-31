import strawberry
from aioinject.ext.strawberry import inject

from app.context import Info
from app.users.types import UserType


@strawberry.type
class UserQuery:
    @strawberry.field(  # type: ignore[misc]
        graphql_type=UserType,
        description="Get the current user.",
    )
    @inject
    async def viewer(self, info: Info) -> UserType:
        """Get the current user."""
        return UserType.from_orm(info.context["user"])
