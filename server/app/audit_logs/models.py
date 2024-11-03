from datetime import datetime

from sqlalchemy import String, func
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.database.base import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id: Mapped[int] = mapped_column(primary_key=True)

    table_name: Mapped[str] = mapped_column(
        String, nullable=False
    )  # Table being audited

    operation: Mapped[str] = mapped_column(
        String, nullable=False
    )  # INSERT, UPDATE, DELETE

    row_id: Mapped[int] = mapped_column(nullable=False)  # ID of the row being changed

    old_data: Mapped[dict] = mapped_column(JSONB)  # JSON data before change

    new_data: Mapped[dict] = mapped_column(JSONB)  # JSON data after change

    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
