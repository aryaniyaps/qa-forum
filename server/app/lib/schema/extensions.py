import json
from collections.abc import AsyncIterator, Iterator

# Add import for loading persisted queries
from pathlib import Path

from graphql import ExecutionResult, GraphQLError
from strawberry.extensions import SchemaExtension


class PersistedQueriesExtension(SchemaExtension):
    def __init__(self, *, persisted_queries_path: Path) -> None:
        self.cache: dict[str, str] = {}

        with Path.open(persisted_queries_path, "r") as f:
            self.cache = json.load(f)

    async def on_execute(self):
        execution_context = self.execution_context
        body = await execution_context.context.get("request").json()
        document_id = body.get("document_id")
        persisted_query = self.cache.get(document_id)
        if persisted_query is None:
            self.execution_context.result = ExecutionResult(
                data=None,
                errors=[
                    GraphQLError("Invalid query provided."),
                ],
            )

    async def on_operation(self) -> AsyncIterator[None] | Iterator[None]:
        execution_context = self.execution_context
        body = await execution_context.context.get("request").json()
        document_id = body.get("document_id")
        persisted_query = self.cache.get(document_id)
        execution_context.query = persisted_query
        yield