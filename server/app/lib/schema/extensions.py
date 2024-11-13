import json
from collections.abc import AsyncIterator, Iterator

# Add import for loading persisted queries
from pathlib import Path

from graphql import ExecutionResult, GraphQLError
from strawberry.extensions import FieldExtension, SchemaExtension
from strawberry.types.field import StrawberryField


class PersistedQueriesExtension(SchemaExtension):
    def __init__(self, *, persisted_queries_path: Path) -> None:
        self.cache: dict[str, str] = {}

        with Path.open(persisted_queries_path, "r") as f:
            self.cache = json.load(f)

    async def on_operation(self) -> AsyncIterator[None] | Iterator[None]:
        body = await self.execution_context.context.get("request").json()
        document_id = body.get("document_id")
        persisted_query = self.cache.get(document_id)
        if persisted_query is None:
            self.execution_context.result = ExecutionResult(
                data=None,
                errors=[
                    GraphQLError("Invalid query provided."),
                ],
            )
        else:
            self.execution_context.query = persisted_query
        yield


# TODO: use query complexity extension from https://github.com/Checho3388/graphql-complexity
# READ https://shopify.dev/docs/api/usage/rate-limits#graphql-admin-api-rate-limits
# READ https://shopify.dev/docs/api/admin-graphql#rate_limits
