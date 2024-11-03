from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.paginator import PaginatedResult, Paginator

from .models import AuditLog


class AuditLogRepo:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_many_by_ids(self, audit_log_ids: list[int]) -> list[AuditLog | None]:
        """Get multiple audit logs by IDs."""
        stmt = select(AuditLog).where(AuditLog.id.in_(audit_log_ids))
        audit_log_by_id = {
            audit_log.id: audit_log for audit_log in await self._session.scalars(stmt)
        }

        return [audit_log_by_id.get(audit_log_id) for audit_log_id in audit_log_ids]

    async def get_all(
        self,
        first: int | None = None,
        last: int | None = None,
        before: int | None = None,
        after: int | None = None,
    ) -> PaginatedResult[AuditLog, int]:
        """Get a paginated result of audit logs."""
        paginator: Paginator[AuditLog, int] = Paginator(
            session=self._session,
            paginate_by=AuditLog.id,
            reverse=True,
        )

        return await paginator.paginate(
            statement=select(AuditLog),
            first=first,
            last=last,
            before=before,
            after=after,
        )
