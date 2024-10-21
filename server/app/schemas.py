from typing import Generic, TypeVar

from pydantic import BaseModel, ConfigDict


def _snake_to_camel(name: str) -> str:
    """Convert the given name from snake case to camel case."""
    first, *rest = name.split("_")
    return first + "".join(map(str.capitalize, rest))


class BaseSchema(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        coerce_numbers_to_str=True,
        str_strip_whitespace=True,
        alias_generator=_snake_to_camel,
    )


ModelType = TypeVar("ModelType", bound=BaseSchema)
CursorType = TypeVar("CursorType", str, int)


class PageInfoSchema(BaseSchema, Generic[CursorType]):
    has_next_page: bool
    has_previous_page: bool
    start_cursor: CursorType | None
    end_cursor: CursorType | None


class PaginatedResultSchema(BaseSchema, Generic[ModelType, CursorType]):
    entities: list[ModelType]
    page_info: PageInfoSchema[CursorType]
