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
from app.lib.constants import VoteType
from app.questions.models import Answer, Question
from app.questions.repositories import AnswerRepo, QuestionVoteRepo


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
        answers = await info.context["loaders"].answer_by_id.load_many(node_ids)
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
    answers_count: int
    votes_count: int
    created_at: datetime
    updated_at: datetime | None

    @strawberry.field
    def description_preview(self) -> str:
        """Return a preview of the description."""
        if len(self.description) <= 65:
            return self.description
        return self.description[:65] + "..."

    @strawberry.field(
        graphql_type=VoteType | None,
    )
    @inject
    async def current_user_vote(
        self,
        info: Info,
        question_vote_repo: Annotated[
            QuestionVoteRepo,
            Inject,
        ],
    ) -> VoteType | None:
        """The vote of the current user for this question."""
        existing_vote = await question_vote_repo.get(
            question_id=self.id,
            user_id=info.context["user"].id,
        )
        if not existing_vote:
            return None
        return existing_vote.vote_type

    @strawberry.field
    @inject
    async def answers(
        self,
        info: Info,
        answer_repo: Annotated[
            AnswerRepo,
            Inject,
        ],
        before: relay.GlobalID | None = None,
        after: relay.GlobalID | None = None,
        first: int | None = None,
        last: int | None = None,
    ) -> AnswerConnectionType:
        """Return a paginated connection of answers for the question."""
        # Retrieve paginated answers for this question
        paginated_answers = await answer_repo.get_all(
            question_id=self.id,
            after=(int(after.node_id) if after else None),
            before=(int(before.node_id) if before else None),
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
            answers_count=question.answers_count,
            votes_count=question.votes_count,
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
        questions = await info.context["loaders"].question_by_id.load_many(node_ids)
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
    question: QuestionType


@strawberry.type
class VoteQuestionPayload:
    question: QuestionType


@strawberry.type
class DeleteQuestionVotePayload:
    question: QuestionType


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
