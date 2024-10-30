"""
initial migration

Revision ID: 06d9c3482e85
Revises: 722078f9ceb4
Create Date: 2024-10-30 10:13:53.471800

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "06d9c3482e85"
down_revision: str | None = "722078f9ceb4"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "notes",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("content", postgresql.CITEXT(length=250), nullable=False),
        sa.Column("completed", sa.Boolean(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint("id", name=op.f("notes_pkey")),
    )


def downgrade() -> None:
    op.drop_table("notes")
