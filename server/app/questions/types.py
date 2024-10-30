from collections.abc import Iterable
from datetime import datetime
from typing import Annotated, Self

import strawberry
from strawberry import relay

from app.base.types import BaseErrorType, BaseNodeType
from app.context import Info
from app.database.paginator import PaginatedResult
from app.questions.models import Question


@strawberry.type(name="Question")
class QuestionType(BaseNodeType[Question]):
    title: str
    description: str
    created_at: datetime
    updated_at: datetime | None

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
