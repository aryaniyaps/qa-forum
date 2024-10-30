from typing import Annotated

from aioinject import Inject
from aioinject.ext.strawberry import inject

from app.questions.repositories import QuestionRepo

from .models import Question


@inject
async def load_question_by_id(
    question_ids: list[str],
    question_repo: Annotated[
        QuestionRepo,
        Inject,
    ],
) -> list[Question | None]:
    """Load multiple questions by their IDs."""
    return await question_repo.get_many_by_ids(
        question_ids=list(map(int, question_ids)),
    )
