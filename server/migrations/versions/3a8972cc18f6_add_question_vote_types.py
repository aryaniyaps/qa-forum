"""
add question vote types

Revision ID: 3a8972cc18f6
Revises: 73b7726195ab
Create Date: 2024-10-30 18:07:27.111012

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "3a8972cc18f6"
down_revision: str | None = "73b7726195ab"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

vote_type_enum = postgresql.ENUM("UPVOTE", "DOWNVOTE", name="votetype")


def upgrade() -> None:
    vote_type_enum.create(op.get_bind(), checkfirst=True)
    op.add_column(
        "question_votes",
        sa.Column(
            "vote_type",
            sa.Enum("UPVOTE", "DOWNVOTE", name="votetype"),
            nullable=False,
            server_default="UPVOTE",
        ),
    )


def downgrade() -> None:
    op.drop_column("question_votes", "vote_type")
    vote_type_enum.drop(op.get_bind(), checkfirst=True)
