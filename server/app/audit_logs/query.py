from typing import Annotated

import strawberry
from aioinject import Inject
from aioinject.ext.strawberry import inject
from strawberry import relay

from .repositories import AuditLogRepo
from .types import AuditLogConnectionType


@strawberry.type
class AuditLogQuery:
    @strawberry.field(  # type: ignore[misc]
        graphql_type=AuditLogConnectionType,
        description="Get all audit logs available.",
    )
    @inject
    async def audit_logs(
        self,
        audit_log_repo: Annotated[AuditLogRepo, Inject],
        before: relay.GlobalID | None = None,
        after: relay.GlobalID | None = None,
        first: int | None = None,
        last: int | None = None,
    ) -> AuditLogConnectionType:
        paginated_result = await audit_log_repo.get_all(
            first=first,
            last=last,
            after=(int(after.node_id) if after else None),
            before=(int(before.node_id) if before else None),
        )

        return AuditLogConnectionType.from_paginated_result(
            paginated_result=paginated_result,
        )
