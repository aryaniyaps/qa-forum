from typing import Annotated

import strawberry
from aioinject import Inject
from aioinject.ext.strawberry import inject
from result import Err
from strawberry import relay

from app.scalars import ID

from .exceptions import QuestionNotFoundError
from .services import AnswerService, QuestionService
from .types import (
    AnswerType,
    CreateAnswerPayload,
    CreateQuestionPayload,
    DeleteQuestionPayload,
    QuestionNotFoundErrorType,
    QuestionType,
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
        result = await question_service.create(title=title, description=description)

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
        graphql_type=CreateAnswerPayload,
        description="Create a new answer.",
    )
    @inject
    async def create_answer(
        self,
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
        )

        answer = result.unwrap()

        return CreateAnswerPayload(
            answer_edge=relay.Edge(
                node=AnswerType.from_orm(answer),
                cursor=relay.to_base64(AnswerType, answer.id),
            ),
        )
