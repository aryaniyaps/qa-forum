"""
remove todos

Revision ID: 551d1556bb23
Revises: afeb91d7e38d
Create Date: 2024-10-30 12:13:49.445096

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "551d1556bb23"
down_revision: str | None = "afeb91d7e38d"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.drop_table("notes")


def downgrade() -> None:
    op.create_table(
        "notes",
        sa.Column("id", sa.INTEGER(), autoincrement=True, nullable=False),
        sa.Column("content", postgresql.CITEXT(), autoincrement=False, nullable=False),
        sa.Column("completed", sa.BOOLEAN(), autoincrement=False, nullable=False),
        sa.Column(
            "created_at",
            postgresql.TIMESTAMP(timezone=True),
            server_default=sa.text("now()"),
            autoincrement=False,
            nullable=False,
        ),
        sa.Column(
            "updated_at",
            postgresql.TIMESTAMP(timezone=True),
            autoincrement=False,
            nullable=True,
        ),
        sa.PrimaryKeyConstraint("id", name="notes_pkey"),
    )
