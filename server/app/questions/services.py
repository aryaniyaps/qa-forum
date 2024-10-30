from result import Err, Ok, Result

from .exceptions import QuestionNotFoundError
from .models import Question
from .repositories import QuestionRepo


class QuestionService:
    def __init__(self, question_repo: QuestionRepo) -> None:
        self._question_repo = question_repo

    async def create(self, title: str, description: str) -> Result[Question, None]:
        """Create a new question."""
        return Ok(
            await self._question_repo.create(
                title=title,
                description=description,
            )
        )

    async def delete(self, question_id: int) -> Result[Question, QuestionNotFoundError]:
        """Delete a question by ID."""
        existing_question = await self._question_repo.get(question_id=question_id)
        if existing_question is None:
            return Err(QuestionNotFoundError())
        await self._question_repo.delete(
            question=existing_question,
        )
        return Ok(existing_question)
