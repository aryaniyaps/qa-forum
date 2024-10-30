from collections.abc import Iterable
from datetime import datetime
from typing import Annotated, Self

import strawberry
from aioinject import Inject
from aioinject.ext.strawberry import inject
from strawberry import relay

from app.base.types import BaseErrorType, BaseNodeType
from app.context import Info
from app.database.paginator import PaginatedResult
from app.questions.models import Answer, Question
from app.questions.repositories import AnswerRepo


@strawberry.type(name="Answer")
class AnswerType(BaseNodeType[Answer]):
    content: str
    created_at: datetime
    updated_at: datetime | None

    @classmethod
    def from_orm(cls, answer: Answer) -> Self:
        """Construct a node from an ORM instance."""
        return cls(
            id=answer.id,
            content=answer.content,
            created_at=answer.created_at,
            updated_at=answer.updated_at,
        )

    @classmethod
    async def resolve_nodes(  # type: ignore[no-untyped-def] # noqa: ANN206
        cls,
        *,
        info: Info,
        node_ids: Iterable[str],
        required: bool = False,  # noqa: ARG003
    ):
        answers = await info.context.loaders.answer_by_id.load_many(node_ids)
        return [
            cls.from_orm(answer) if answer is not None else answer for answer in answers
        ]


@strawberry.type(name="AnswerConnection")
class AnswerConnectionType(relay.Connection[AnswerType]):
    @classmethod
    def from_paginated_result(
        cls, paginated_result: PaginatedResult[Answer, int]
    ) -> Self:
        return cls(
            page_info=relay.PageInfo(
                has_next_page=paginated_result.page_info.has_next_page,
                start_cursor=relay.to_base64(
                    AnswerType,
                    paginated_result.page_info.start_cursor,
                ),
                has_previous_page=paginated_result.page_info.has_previous_page,
                end_cursor=relay.to_base64(
                    AnswerType,
                    paginated_result.page_info.end_cursor,
                ),
            ),
            edges=[
                relay.Edge(
                    node=AnswerType.from_orm(todo),
                    cursor=relay.to_base64(AnswerType, todo.id),
                )
                for todo in paginated_result.entities
            ],
        )


@strawberry.type(name="Question")
class QuestionType(BaseNodeType[Question]):
    title: str
    description: str
    created_at: datetime
    updated_at: datetime | None

    @strawberry.field
    def description_preview(self) -> str:
        """Return the first 50 characters of the description."""
        if len(self.description) <= 50:
            return self.description
        return self.description[:50] + "..."

    @strawberry.field
    @inject
    async def answers(
        self,
        info: Info,
        answer_repo: Annotated[
            AnswerRepo,
            Inject,
        ],
        before: str | None = None,
        after: str | None = None,
        first: int | None = None,
        last: int | None = None,
    ) -> AnswerConnectionType:
        """Return a paginated connection of answers for the question."""
        # Retrieve paginated answers for this question
        paginated_answers = await answer_repo.get_all(
            question_id=self.id,
            after=(
                int(
                    relay.from_base64(after)[1],
                )
                if after
                else None
            ),
            before=(
                int(
                    relay.from_base64(before)[1],
                )
                if before
                else None
            ),
            first=first,
            last=last,
        )

        # Convert to AnswerConnectionType
        return AnswerConnectionType.from_paginated_result(paginated_answers)

    @classmethod
    def from_orm(cls, question: Question) -> Self:
        """Construct a node from an ORM instance."""
        return cls(
            id=question.id,
            title=question.title,
            description=question.description,
            created_at=question.created_at,
            updated_at=question.updated_at,
        )

    @classmethod
    async def resolve_nodes(  # type: ignore[no-untyped-def] # noqa: ANN206
        cls,
        *,
        info: Info,
        node_ids: Iterable[str],
        required: bool = False,  # noqa: ARG003
    ):
        questions = await info.context.loaders.question_by_id.load_many(node_ids)
        return [
            cls.from_orm(question) if question is not None else question
            for question in questions
        ]


@strawberry.type(name="QuestionNotFoundError")
class QuestionNotFoundErrorType(BaseErrorType):
    message: str = "Question does not exist"


@strawberry.type
class CreateQuestionPayload:
    question_edge: relay.Edge[QuestionType]


DeleteQuestionPayload = Annotated[
    QuestionType | QuestionNotFoundErrorType,
    strawberry.union(name="DeleteQuestionPayload"),
]


@strawberry.type
class CreateAnswerPayload:
    answer_edge: relay.Edge[AnswerType]


@strawberry.type(name="QuestionConnection")
class QuestionConnectionType(relay.Connection[QuestionType]):
    @classmethod
    def from_paginated_result(
        cls, paginated_result: PaginatedResult[Question, int]
    ) -> Self:
        return cls(
            page_info=relay.PageInfo(
                has_next_page=paginated_result.page_info.has_next_page,
                start_cursor=relay.to_base64(
                    QuestionType,
                    paginated_result.page_info.start_cursor,
                ),
                has_previous_page=paginated_result.page_info.has_previous_page,
                end_cursor=relay.to_base64(
                    QuestionType,
                    paginated_result.page_info.end_cursor,
                ),
            ),
            edges=[
                relay.Edge(
                    node=QuestionType.from_orm(todo),
                    cursor=relay.to_base64(QuestionType, todo.id),
                )
                for todo in paginated_result.entities
            ],
        )
