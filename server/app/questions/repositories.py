from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.paginator import PaginatedResult, Paginator

from .models import Question


class QuestionRepo:
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def create(self, title: str, description: str) -> Question:
        """Create a new question."""
        question = Question(title=title, description=description)
        self._session.add(question)
        await self._session.flush()
        return question

    async def get(self, question_id: int) -> Question | None:
        """Get question by ID."""
        return await self._session.scalar(
            select(Question).where(
                Question.id == question_id,
            ),
        )

    async def update(
        self,
        question: Question,
        *,
        title: str,
        description: str,
    ) -> Question:
        """Update the given question."""
        question.title = title
        question.description = description
        self._session.add(question)
        await self._session.flush()
        return question

    async def get_many_by_ids(self, question_ids: list[int]) -> list[Question | None]:
        """Get multiple questions by IDs."""
        stmt = select(Question).where(Question.id.in_(question_ids))
        question_by_id = {
            question.id: question for question in await self._session.scalars(stmt)
        }

        return [question_by_id.get(question_id) for question_id in question_ids]

    async def get_all(
        self,
        first: int | None = None,
        last: int | None = None,
        before: int | None = None,
        after: int | None = None,
    ) -> PaginatedResult[Question, int]:
        """Get a paginated result of questions."""
        paginator: Paginator[Question, int] = Paginator(
            session=self._session,
            paginate_by=Question.id,
            reverse=True,
        )

        return await paginator.paginate(
            statement=select(Question),
            first=first,
            last=last,
            before=before,
            after=after,
        )

    async def delete(self, question: Question) -> None:
        """Delete a question by ID."""
        await self._session.delete(question)
        await self._session.flush()
