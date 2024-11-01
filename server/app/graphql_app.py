from aioinject import Injected
from aioinject.ext.fastapi import inject
from fastapi import Request
from strawberry.fastapi import GraphQLRouter

from app.users.repositories import UserRepo

from .context import Context
from .dataloaders import create_dataloaders
from .schema import schema


@inject
async def get_context(
    request: Request,
    user_repo: Injected[UserRepo],
) -> Context:
    fingerprint = request.state.fingerprint

    existing_user = await user_repo.get_by_fingerprint(fingerprint=fingerprint)

    if not existing_user:
        existing_user = await user_repo.create(fingerprint=fingerprint)

    return Context(
        user=existing_user,
        request=request,
        loaders=create_dataloaders(),
    )


def create_graphql_router() -> GraphQLRouter:
    return GraphQLRouter(
        schema=schema,
        context_getter=get_context,
    )
