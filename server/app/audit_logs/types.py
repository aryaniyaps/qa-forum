from collections.abc import Iterable
from datetime import datetime
from typing import Self

import strawberry
from strawberry import relay
from strawberry.scalars import JSON

from app.audit_logs.models import AuditLog
from app.base.types import BaseNodeType
from app.context import Info
from app.database.paginator import PaginatedResult


@strawberry.type(name="AuditLog")
class AuditLogType(BaseNodeType[AuditLog]):
    table_name: str
    operation: str
    row_id: int
    old_data: JSON | None  # type: ignore[valid-type]
    new_data: JSON | None  # type: ignore[valid-type]
    created_at: datetime

    @classmethod
    def from_orm(cls, audit_log: AuditLog) -> Self:
        """Construct a node from an ORM instance."""
        return cls(
            id=audit_log.id,
            table_name=audit_log.table_name,
            operation=audit_log.operation,
            row_id=audit_log.row_id,
            old_data=audit_log.old_data,
            new_data=audit_log.new_data,
            created_at=audit_log.created_at,
        )

    @classmethod
    async def resolve_nodes(  # type: ignore[no-untyped-def] # noqa: ANN206
        cls,
        *,
        info: Info,
        node_ids: Iterable[str],
        required: bool = False,  # noqa: ARG003
    ):
        audit_logs = await info.context["loaders"].audit_log_by_id.load_many(node_ids)
        return [
            cls.from_orm(audit_log) if audit_log is not None else audit_log
            for audit_log in audit_logs
        ]


@strawberry.type(name="AuditLogConnection")
class AuditLogConnectionType(relay.Connection[AuditLogType]):
    @classmethod
    def from_paginated_result(
        cls, paginated_result: PaginatedResult[AuditLog, int]
    ) -> Self:
        return cls(
            page_info=relay.PageInfo(
                has_next_page=paginated_result.page_info.has_next_page,
                has_previous_page=paginated_result.page_info.has_previous_page,
                start_cursor=relay.to_base64(
                    AuditLogType,
                    paginated_result.page_info.start_cursor,
                )
                if paginated_result.page_info.start_cursor
                else None,
                end_cursor=relay.to_base64(
                    AuditLogType,
                    paginated_result.page_info.end_cursor,
                )
                if paginated_result.page_info.end_cursor
                else None,
            ),
            edges=[
                relay.Edge(
                    node=AuditLogType.from_orm(audit_log),
                    cursor=relay.to_base64(AuditLogType, audit_log.id),
                )
                for audit_log in paginated_result.entities
            ],
        )
