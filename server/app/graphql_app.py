from fastapi import Request, Response, WebSocket
from strawberry.asgi import GraphQL

from .context import Context
from .dataloaders import create_dataloaders
from .schema import schema


class GraphQLApp(GraphQL[Context, None]):
    async def get_context(
        self,
        request: Request | WebSocket,
        response: Response | None = None,
    ) -> Context:
        return Context(
            user_id=request.cookies.get("user_id"),
            request=request,
            response=response,
            loaders=create_dataloaders(),
        )


def create_graphql_app() -> GraphQL[Context, None]:
    return GraphQLApp(
        schema=schema,
    )
