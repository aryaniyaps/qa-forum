from typing import Annotated

import strawberry
from aioinject import Inject
from aioinject.ext.strawberry import inject

from app.scalars import ID

from .repositories import QuestionRepo
from .types import QuestionConnectionType


@strawberry.type
class QuestionQuery:
    @strawberry.field(  # type: ignore[misc]
        graphql_type=QuestionConnectionType,
        description="Get all questions available.",
    )
    @inject
    async def questions(
        self,
        question_repo: Annotated[QuestionRepo, Inject],
        before: ID | None = None,
        after: ID | None = None,
        first: int | None = None,
        last: int | None = None,
    ) -> QuestionConnectionType:
        paginated_result = await question_repo.get_all(
            first=first,
            last=last,
            after=(int(after.node_id) if after else None),
            before=(int(before.node_id) if before else None),
        )

        return QuestionConnectionType.from_paginated_result(
            paginated_result=paginated_result,
        )
