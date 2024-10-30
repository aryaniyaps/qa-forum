from result import Err, Ok, Result

from app.lib.constants import VoteType

from .exceptions import AnswerNotFoundError, QuestionNotFoundError
from .models import Answer, Question
from .repositories import AnswerRepo, QuestionRepo, QuestionVoteRepo


class QuestionService:
    def __init__(
        self, question_repo: QuestionRepo, question_vote_repo: QuestionVoteRepo
    ) -> None:
        self._question_repo = question_repo
        self._question_vote_repo = question_vote_repo

    async def create(self, title: str, description: str) -> Result[Question, None]:
        """Create a new question."""
        return Ok(
            await self._question_repo.create(
                title=title,
                description=description,
            )
        )

    async def vote_question(
        self, user_id: str, question_id: int, vote_type: VoteType
    ) -> Result[None, QuestionNotFoundError]:
        """Upvote a question."""
        existing_question = await self._question_repo.get(question_id=question_id)
        if existing_question is None:
            return Err(QuestionNotFoundError())

        if existing_question_vote := await self._question_vote_repo.get(
            question_id=existing_question.id, user_id=user_id
        ):
            await self._question_vote_repo.update(
                question_vote=existing_question_vote,
                vote_type=vote_type,
            )
        else:
            await self._question_vote_repo.create(
                question=existing_question,
                user_id=user_id,
                vote_type=vote_type,
            )
        return Ok(None)

    async def delete_vote(
        self, user_id: str, question_id: int
    ) -> Result[None, QuestionNotFoundError]:
        """Delete a vote from a question."""
        existing_question = await self._question_repo.get(question_id=question_id)
        if existing_question is None:
            return Err(QuestionNotFoundError())

        await self._question_vote_repo.delete(
            question_id=existing_question.id,
            user_id=user_id,
        )
        return Ok(None)

    async def delete(self, question_id: int) -> Result[Question, QuestionNotFoundError]:
        """Delete a question by ID."""
        existing_question = await self._question_repo.get(question_id=question_id)
        if existing_question is None:
            return Err(QuestionNotFoundError())
        await self._question_repo.delete(
            question=existing_question,
        )
        return Ok(existing_question)


class AnswerService:
    def __init__(self, answer_repo: AnswerRepo) -> None:
        self._answer_repo = answer_repo

    async def create(self, question_id: int, content: str) -> Result[Answer, None]:
        """Create a new answer."""
        return Ok(
            await self._answer_repo.create(
                question_id=question_id,
                content=content,
            )
        )

    async def delete(self, answer_id: int) -> Result[Answer, AnswerNotFoundError]:
        """Delete a answer by ID."""
        existing_answer = await self._answer_repo.get(answer_id=answer_id)
        if existing_answer is None:
            return Err(AnswerNotFoundError())
        await self._answer_repo.delete(
            answer=existing_answer,
        )
        return Ok(existing_answer)
