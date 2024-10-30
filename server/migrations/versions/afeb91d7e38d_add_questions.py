"""
add questions

Revision ID: afeb91d7e38d
Revises: 06d9c3482e85
Create Date: 2024-10-30 11:57:05.883235

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "afeb91d7e38d"
down_revision: str | None = "06d9c3482e85"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "questions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("title", postgresql.CITEXT(length=150), nullable=False),
        sa.Column("description", sa.TEXT(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint("id", name=op.f("questions_pkey")),
    )


def downgrade() -> None:
    op.drop_table("questions")
