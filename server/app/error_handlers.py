from http import HTTPStatus

from fastapi import Request
from fastapi.responses import JSONResponse

from app.errors import PaginationError, ResourceNotFoundError


async def resource_not_found_error_handler(
    _request: Request, exc: ResourceNotFoundError
) -> JSONResponse:
    """Handle resource not found errors."""
    return JSONResponse(
        status_code=HTTPStatus.NOT_FOUND,
        content={"message": exc.message},
    )


async def pagination_error_handler(
    _request: Request, exc: PaginationError
) -> JSONResponse:
    """Handle pagination errors."""
    return JSONResponse(
        status_code=HTTPStatus.UNPROCESSABLE_ENTITY,
        content={"message": exc.message},
    )
