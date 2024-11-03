import json
from collections.abc import AsyncIterator, Iterator

# Add import for loading persisted queries
from pathlib import Path

from graphql import ExecutionResult, GraphQLError
from strawberry.extensions import SchemaExtension
from strawberry.types.execution import ExecutionContext


class PersistedQueriesExtension(SchemaExtension):
    def __init__(self, *, execution_context: ExecutionContext) -> None:
        super().__init__(execution_context=execution_context)
        self.cache: dict[str, str] = {}

        # Load persisted queries from JSON file
        persisted_queries_path = "../schema/persisted_queries.json"

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
                errors=[GraphQLError("Invalid query provided.")],
            )

    async def on_operation(self) -> AsyncIterator[None] | Iterator[None]:
        execution_context = self.execution_context
        body = await execution_context.context.get("request").json()
        document_id = body.get("document_id")
        persisted_query = self.cache.get(document_id)
        execution_context.query = persisted_query
