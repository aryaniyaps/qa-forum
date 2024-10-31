from typing import Annotated

import strawberry
from aioinject import Inject
from aioinject.ext.strawberry import inject
from result import Err
from strawberry import relay

from app.context import Info
from app.lib.constants import VoteType
from app.scalars import ID

from .exceptions import QuestionNotFoundError
from .services import AnswerService, QuestionService
from .types import (
    AnswerType,
    CreateAnswerPayload,
    CreateQuestionPayload,
    DeleteQuestionPayload,
    DeleteQuestionVotePayload,
    QuestionNotFoundErrorType,
    QuestionType,
    VoteQuestionPayload,
)


@strawberry.type
class QuestionMutation:
    @strawberry.mutation(  # type: ignore[misc]
        graphql_type=CreateQuestionPayload,
        description="Create a new question.",
    )
    @inject
    async def create_question(
        self,
        info: Info,
        title: Annotated[
            str,
            strawberry.argument(
                description="The title of the question.",
            ),
        ],
        description: Annotated[
            str,
            strawberry.argument(
                description="The title of the question.",
            ),
        ],
        question_service: Annotated[QuestionService, Inject],
    ) -> CreateQuestionPayload:
        """Create a new question."""
        result = await question_service.create(
            title=title,
            description=description,
            user_id=info.context["user"].id,
        )

        question = result.unwrap()

        return CreateQuestionPayload(
            question_edge=relay.Edge(
                node=QuestionType.from_orm(question),
                cursor=relay.to_base64(QuestionType, question.id),
            ),
        )

    @strawberry.mutation(  # type: ignore[misc]
        graphql_type=DeleteQuestionPayload,
        description="Delete a question by ID.",
    )
    @inject
    async def delete_question(
        self,
        question_id: Annotated[
            relay.GlobalID,
            strawberry.argument(
                description="The ID of the question to delete.",
            ),
        ],
        question_service: Annotated[QuestionService, Inject],
    ) -> QuestionType | QuestionNotFoundErrorType:
        """Delete a question by ID."""
        result = await question_service.delete(
            question_id=int(question_id.node_id),
        )

        if isinstance(result, Err):
            match result.err_value:
                case QuestionNotFoundError():
                    return QuestionNotFoundErrorType()

        return QuestionType.from_orm(
            question=result.ok_value,
        )

    @strawberry.mutation(  # type: ignore[misc]
        graphql_type=VoteQuestionPayload,
        description="Upvote a question.",
    )
    @inject
    async def vote_question(
        self,
        info: Info,
        question_id: Annotated[
            ID,
            strawberry.argument(
                description="The ID of the question to vote for.",
            ),
        ],
        vote_type: Annotated[
            VoteType,
            strawberry.argument(
                description="The type of vote to cast.",
            ),
        ],
        question_service: Annotated[QuestionService, Inject],
    ) -> VoteQuestionPayload | QuestionNotFoundErrorType:
        """Vote for a question."""
        result = await question_service.vote_question(
            user_id=info.context["user"].id,
            question_id=int(question_id.node_id),
            vote_type=vote_type,
        )

        if isinstance(result, Err):
            match result.err_value:
                case QuestionNotFoundError():
                    return QuestionNotFoundErrorType()

        return VoteQuestionPayload(question=await question_id.resolve_node(info))

    @strawberry.mutation(  # type: ignore[misc]
        graphql_type=DeleteQuestionVotePayload,
        description="Delete a question vote.",
    )
    @inject
    async def delete_question_vote(
        self,
        info: Info,
        question_id: Annotated[
            ID,
            strawberry.argument(
                description="The ID of the question to remove the vote for.",
            ),
        ],
        question_service: Annotated[QuestionService, Inject],
    ) -> DeleteQuestionVotePayload | QuestionNotFoundErrorType:
        """Delete a question vote."""
        result = await question_service.delete_vote(
            user_id=info.context["user"].id, question_id=int(question_id.node_id)
        )

        if isinstance(result, Err):
            match result.err_value:
                case QuestionNotFoundError():
                    return QuestionNotFoundErrorType()

        return DeleteQuestionVotePayload(question=await question_id.resolve_node(info))

    @strawberry.mutation(  # type: ignore[misc]
        graphql_type=CreateAnswerPayload,
        description="Create a new answer.",
    )
    @inject
    async def create_answer(
        self,
        info: Info,
        content: Annotated[
            str,
            strawberry.argument(
                description="The content of the answer.",
            ),
        ],
        question_id: Annotated[
            ID,
            strawberry.argument(
                description="The ID of the question to create the answer under.",
            ),
        ],
        answer_service: Annotated[AnswerService, Inject],
    ) -> CreateAnswerPayload:
        """Create a new answer."""
        result = await answer_service.create(
            content=content,
            question_id=int(question_id.node_id),
            user_id=info.context["user"].id,
        )

        answer = result.unwrap()

        question = await question_id.resolve_node(info)

        return CreateAnswerPayload(
            answer_edge=relay.Edge(
                node=AnswerType.from_orm(answer),
                cursor=relay.to_base64(AnswerType, answer.id),
            ),
            question=question,
        )
