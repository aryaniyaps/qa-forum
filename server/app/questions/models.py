from datetime import datetime

from sqlalchemy import TEXT, ForeignKey, func, select
from sqlalchemy.dialects.postgresql import CITEXT
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql.functions import now

from app.database.base import Base


class Answer(Base):
    __tablename__ = "answers"

    id: Mapped[int] = mapped_column(primary_key=True)

    question_id: Mapped[int] = mapped_column(
        ForeignKey("questions.id"),
        nullable=False,
    )

    content: Mapped[str] = mapped_column(
        TEXT(),
    )

    created_at: Mapped[datetime] = mapped_column(
        server_default=now(),
    )

    updated_at: Mapped[datetime | None] = mapped_column(
        onupdate=now(),
    )

    question = relationship("Question", back_populates="answers")


class QuestionVote(Base):
    __tablename__ = "question_votes"

    user_id: Mapped[str] = mapped_column(primary_key=True)

    question_id: Mapped[int] = mapped_column(
        ForeignKey("questions.id"),
        nullable=False,
        primary_key=True,
    )

    question = relationship("Question", back_populates="votes")


class Question(Base):
    __tablename__ = "questions"

    id: Mapped[int] = mapped_column(primary_key=True)

    title: Mapped[str] = mapped_column(
        CITEXT(150),
    )

    description: Mapped[str] = mapped_column(
        TEXT(),
    )

    created_at: Mapped[datetime] = mapped_column(
        server_default=now(),
    )

    updated_at: Mapped[datetime | None] = mapped_column(
        onupdate=now(),
    )

    answers: Mapped[list["Answer"]] = relationship(
        "Answer",
        back_populates="question",
        cascade="all, delete-orphan",  # This enables cascading delete
        lazy="selectin",
    )

    votes: Mapped[list["QuestionVote"]] = relationship(
        "QuestionVote",
        back_populates="question",
        cascade="all, delete-orphan",  # This enables cascading delete
        lazy="selectin",
    )

    @hybrid_property
    def answers_count(self):
        return len(self.answers)

    @answers_count.expression
    @classmethod
    def answers_count(cls):
        return (
            select(func.count(Answer.id))
            .where(Answer.question_id == cls.id)
            .correlate_except(Answer)
            .scalar_subquery()
        )

    @hybrid_property
    def votes_count(self):
        return len(self.votes)

    @votes_count.expression
    @classmethod
    def votes_count(cls):
        return (
            select(func.count(QuestionVote.id))
            .where(QuestionVote.question_id == cls.id)
            .correlate_except(QuestionVote)
            .scalar_subquery()
        )
