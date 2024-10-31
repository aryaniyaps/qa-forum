from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import TEXT, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.functions import now

from app.database.base import Base

if TYPE_CHECKING:
    from app.questions.models import Answer, Question, QuestionVote


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)

    fingerprint: Mapped[str] = mapped_column(
        TEXT(),
        index=True,
    )

    username: Mapped[str] = mapped_column(
        String(8),
    )

    created_at: Mapped[datetime] = mapped_column(
        server_default=now(),
    )

    updated_at: Mapped[datetime | None] = mapped_column(
        onupdate=now(),
    )

    votes: Mapped[list["QuestionVote"]] = relationship(
        "QuestionVote",
        back_populates="user",
        cascade="all, delete-orphan",  # This enables cascading delete
        lazy="selectin",
    )

    questions: Mapped[list["Question"]] = relationship(
        "Question",
        back_populates="user",
        cascade="all, delete-orphan",  # This enables cascading delete
        lazy="selectin",
    )

    answers: Mapped[list["Answer"]] = relationship(
        "Answer",
        back_populates="user",
        cascade="all, delete-orphan",  # This enables cascading delete
        lazy="selectin",
    )
