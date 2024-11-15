import json
from collections.abc import AsyncIterator, Iterator

# Add import for loading persisted queries
from pathlib import Path
from typing import Any

from graphql import (
    ExecutionResult,
    FieldNode,
    FragmentDefinitionNode,
    GraphQLError,
    OperationDefinitionNode,
)
from strawberry.extensions import SchemaExtension


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
        yield None


class QueryCostRateLimitExtension(SchemaExtension):
    def get_results(self) -> dict[str, Any]:
        # Example result structure with placeholders
        return {
            "cost": {
                "requestedQueryCost": self.execution_context.context.get(
                    "query_cost", 0
                ),
                "throttleStatus": {
                    "maximumAvailable": 1000,
                    "currentlyAvailable": max(
                        0, 1000 - self.execution_context.context.get("query_cost", 0)
                    ),
                    "restoreRate": 50,
                },
            }
        }

    def on_execute(self) -> AsyncIterator[None] | Iterator[None]:
        graphql_document = self.execution_context.graphql_document

        if graphql_document is None:
            return None

        # Iterate through operation and fragment definitions in the GraphQL document
        for definition in graphql_document.definitions:
            if isinstance(definition, OperationDefinitionNode):
                # Get root type (e.g., "Query", "Mutation", or "Subscription") for the operation
                operation_type = definition.operation.name
                parent_type = self.execution_context.schema.get_type_by_name(
                    operation_type
                )

                # Process each field in the operation's selection set
                for selection in definition.selection_set.selections:
                    if isinstance(selection, FieldNode):
                        field_name = selection.name.value
                        self._calculate_field_cost(field_name, parent_type)

            elif isinstance(definition, FragmentDefinitionNode):
                # For fragments, use the type condition to get the parent type
                fragment_type_name = definition.type_condition.name.value
                parent_type = self.execution_context.schema.get_type_by_name(
                    fragment_type_name
                )

                for selection in definition.selection_set.selections:
                    if isinstance(selection, FieldNode):
                        field_name = selection.name.value
                        self._calculate_field_cost(field_name, parent_type)

        yield None

    def _calculate_field_cost(self, field_name: str, parent_type: Any):
        total_cost = self.execution_context.context.get("query_cost", 0)
        # Helper method to calculate and add field complexity cost
        if parent_type:
            field = self.execution_context.schema.get_field_for_type(
                field_name, parent_type.name
            )

            if field and hasattr(field, "metadata"):
                # Get the complexity cost from field metadata or set default to 0
                complexity_cost = field.metadata.get("complexity_cost", 0)
                total_cost += complexity_cost
                self.execution_context.context["query_cost"] = total_cost


# TODO: assign 10 cost to mutations
# TODO: assign 1 cost to each node, for connections, use the first or last params to calulate the cost
# TODO: use query complexity extension from https://github.com/Checho3388/graphql-complexity
# READ https://shopify.dev/docs/api/usage/rate-limits#graphql-admin-api-rate-limits
# READ https://shopify.dev/docs/api/admin-graphql#rate_limits
