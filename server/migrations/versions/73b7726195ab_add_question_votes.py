"""
add question votes

Revision ID: 73b7726195ab
Revises: 19897739fb47
Create Date: 2024-10-30 17:35:37.719376

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "73b7726195ab"
down_revision: str | None = "19897739fb47"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "question_votes",
        sa.Column("user_id", sa.String(), nullable=False),
        sa.Column("question_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["question_id"],
            ["questions.id"],
            name=op.f("question_votes_question_id_fkey"),
        ),
        sa.PrimaryKeyConstraint(
            "user_id", "question_id", name=op.f("question_votes_pkey")
        ),
    )


def downgrade() -> None:
    op.drop_table("question_votes")
