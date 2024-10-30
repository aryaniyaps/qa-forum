from typing import Annotated

import strawberry
from aioinject import Inject
from aioinject.ext.strawberry import inject
from strawberry import relay

from .repositories import QuestionRepo
from .types import QuestionConnectionType


@strawberry.type(name="Viewer")
class QuestionQuery:
    @strawberry.field(  # type: ignore[misc]
        graphql_type=QuestionConnectionType,
        description="Get all questions available.",
    )
    @inject
    async def questions(
        self,
        question_repo: Annotated[QuestionRepo, Inject],
        before: str | None = None,
        after: str | None = None,
        first: int | None = None,
        last: int | None = None,
    ) -> QuestionConnectionType:
        paginated_result = await question_repo.get_all(
            first=first,
            last=last,
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
        )

        return QuestionConnectionType.from_paginated_result(
            paginated_result=paginated_result,
        )
