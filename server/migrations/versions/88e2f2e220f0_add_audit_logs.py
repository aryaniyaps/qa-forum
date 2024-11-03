"""
add audit logs

Revision ID: 88e2f2e220f0
Revises: ac8621e3cfcb
Create Date: 2024-11-03 09:13:58.975793

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "88e2f2e220f0"
down_revision: str | None = "ac8621e3cfcb"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    # Create the audit_logs table
    op.create_table(
        "audit_logs",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("table_name", sa.String(), nullable=False),
        sa.Column("operation", sa.String(), nullable=False),
        sa.Column("row_id", sa.Integer(), nullable=False),
        sa.Column("old_data", postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column("new_data", postgresql.JSONB(astext_type=sa.Text()), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id", name=op.f("audit_logs_pkey")),
    )

    # Create the function and trigger for questions table
    op.execute(
        """
        CREATE OR REPLACE FUNCTION log_question_changes()
        RETURNS TRIGGER AS $$
        BEGIN
            IF TG_OP = 'INSERT' THEN
                INSERT INTO audit_logs (table_name, operation, row_id, new_data, created_at)
                VALUES ('questions', 'INSERT', NEW.id, row_to_json(NEW), NOW());
            ELSIF TG_OP = 'UPDATE' THEN
                INSERT INTO audit_logs (table_name, operation, row_id, old_data, new_data, created_at)
                VALUES ('questions', 'UPDATE', OLD.id, row_to_json(OLD), row_to_json(NEW), NOW());
            ELSIF TG_OP = 'DELETE' THEN
                INSERT INTO audit_logs (table_name, operation, row_id, old_data, created_at)
                VALUES ('questions', 'DELETE', OLD.id, row_to_json(OLD), NOW());
            END IF;
            RETURN NULL;
        END;
        $$ LANGUAGE plpgsql;
        """
    )

    op.execute(
        """
        CREATE TRIGGER question_audit_trigger
        AFTER INSERT OR UPDATE OR DELETE ON questions
        FOR EACH ROW
        EXECUTE FUNCTION log_question_changes();
        """
    )

    # Create the function and trigger for question_votes table
    op.execute(
        """
        CREATE OR REPLACE FUNCTION log_question_vote_changes()
        RETURNS TRIGGER AS $$
        BEGIN
            IF TG_OP = 'INSERT' THEN
                INSERT INTO audit_logs (table_name, operation, row_id, new_data, created_at)
                VALUES ('question_votes', 'INSERT', NEW.question_id, row_to_json(NEW), NOW());
            ELSIF TG_OP = 'UPDATE' THEN
                INSERT INTO audit_logs (table_name, operation, row_id, old_data, new_data, created_at)
                VALUES ('question_votes', 'UPDATE', OLD.question_id, row_to_json(OLD), row_to_json(NEW), NOW());
            ELSIF TG_OP = 'DELETE' THEN
                INSERT INTO audit_logs (table_name, operation, row_id, old_data, created_at)
                VALUES ('question_votes', 'DELETE', OLD.question_id, row_to_json(OLD), NOW());
            END IF;
            RETURN NULL;
        END;
        $$ LANGUAGE plpgsql;
        """
    )

    op.execute(
        """
        CREATE TRIGGER question_vote_audit_trigger
        AFTER INSERT OR UPDATE OR DELETE ON question_votes
        FOR EACH ROW
        EXECUTE FUNCTION log_question_vote_changes();
        """
    )

    # Create the function and trigger for answers table
    op.execute(
        """
        CREATE OR REPLACE FUNCTION log_answer_changes()
        RETURNS TRIGGER AS $$
        BEGIN
            IF TG_OP = 'INSERT' THEN
                INSERT INTO audit_logs (table_name, operation, row_id, new_data, created_at)
                VALUES ('answers', 'INSERT', NEW.id, row_to_json(NEW), NOW());
            ELSIF TG_OP = 'UPDATE' THEN
                INSERT INTO audit_logs (table_name, operation, row_id, old_data, new_data, created_at)
                VALUES ('answers', 'UPDATE', OLD.id, row_to_json(OLD), row_to_json(NEW), NOW());
            ELSIF TG_OP = 'DELETE' THEN
                INSERT INTO audit_logs (table_name, operation, row_id, old_data, created_at)
                VALUES ('answers', 'DELETE', OLD.id, row_to_json(OLD), NOW());
            END IF;
            RETURN NULL;
        END;
        $$ LANGUAGE plpgsql;
        """
    )

    op.execute(
        """
        CREATE TRIGGER answer_audit_trigger
        AFTER INSERT OR UPDATE OR DELETE ON answers
        FOR EACH ROW
        EXECUTE FUNCTION log_answer_changes();
        """
    )


def downgrade() -> None:
    # Drop the triggers and functions for each table first
    op.execute("DROP TRIGGER IF EXISTS question_audit_trigger ON questions;")
    op.execute("DROP FUNCTION IF EXISTS log_question_changes;")

    op.execute("DROP TRIGGER IF EXISTS question_vote_audit_trigger ON question_votes;")
    op.execute("DROP FUNCTION IF EXISTS log_question_vote_changes;")

    op.execute("DROP TRIGGER IF EXISTS answer_audit_trigger ON answers;")
    op.execute("DROP FUNCTION IF EXISTS log_answer_changes;")

    # Drop the audit_logs table
    op.drop_table("audit_logs")
