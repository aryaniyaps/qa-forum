"""
initial migration

Revision ID: ac8621e3cfcb
Revises: 722078f9ceb4
Create Date: 2024-10-31 19:06:43.353192

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "ac8621e3cfcb"
down_revision: str | None = "722078f9ceb4"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("fingerprint", sa.TEXT(), nullable=False),
        sa.Column("username", sa.String(length=8), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint("id", name=op.f("users_pkey")),
    )
    op.create_index(
        op.f("users_fingerprint_idx"), "users", ["fingerprint"], unique=False
    )
    op.create_table(
        "questions",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("title", postgresql.CITEXT(length=150), nullable=False),
        sa.Column("description", sa.TEXT(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], name=op.f("questions_user_id_fkey")
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("questions_pkey")),
    )
    op.create_table(
        "answers",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
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
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], name=op.f("answers_user_id_fkey")
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("answers_pkey")),
    )
    op.create_table(
        "question_votes",
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("question_id", sa.Integer(), nullable=False),
        sa.Column(
            "vote_type", sa.Enum("UPVOTE", "DOWNVOTE", name="votetype"), nullable=False
        ),
        sa.ForeignKeyConstraint(
            ["question_id"],
            ["questions.id"],
            name=op.f("question_votes_question_id_fkey"),
        ),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], name=op.f("question_votes_user_id_fkey")
        ),
        sa.PrimaryKeyConstraint(
            "user_id", "question_id", name=op.f("question_votes_pkey")
        ),
    )


def downgrade() -> None:
    op.drop_table("question_votes")
    op.drop_table("answers")
    op.drop_table("questions")
    op.drop_index(op.f("users_fingerprint_idx"), table_name="users")
    op.drop_table("users")
