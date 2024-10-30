"""
add answers

Revision ID: 19897739fb47
Revises: 551d1556bb23
Create Date: 2024-10-30 15:05:34.093274

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "19897739fb47"
down_revision: str | None = "551d1556bb23"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "answers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("question_id", sa.Integer(), nullable=False),
        sa.Column("content", sa.TEXT(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(
            ["question_id"], ["questions.id"], name=op.f("answers_question_id_fkey")
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("answers_pkey")),
    )


def downgrade() -> None:
    op.drop_table("answers")
