"""
create extensions

Revision ID: 722078f9ceb4
Revises:
Create Date: 2024-10-30 10:13:20.328509

"""

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = "722078f9ceb4"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.execute(sa.text("CREATE EXTENSION IF NOT EXISTS citext;"))


def downgrade() -> None:
    op.execute(sa.text("DROP EXTENSION IF EXISTS citext;"))
