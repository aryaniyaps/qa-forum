from typing import Annotated

from aioinject import Inject
from aioinject.ext.strawberry import inject

from app.audit_logs.repositories import AuditLogRepo

from .models import AuditLog


@inject
async def load_audit_log_by_id(
    audit_log_ids: list[str],
    audit_log_repo: Annotated[
        AuditLogRepo,
        Inject,
    ],
) -> list[AuditLog | None]:
    """Load multiple audit_logs by their IDs."""
    return await audit_log_repo.get_many_by_ids(
        audit_log_ids=list(map(int, audit_log_ids)),
    )
