from http import HTTPStatus

from fastapi import HTTPException


class BaseError(Exception):
    """Base error class."""

    def __init__(self, message: str) -> None:
        self.message = message
        super().__init__(self.message)


class ResourceNotFoundError(BaseError):
    """Indicate that the requested resource doesn't exist."""


class PaginationError(BaseError):
    """Indicate that pagination arguments are invalid."""


class UnauthorizedException(HTTPException):
    def __init__(self, detail: str, **kwargs):
        super().__init__(HTTPStatus.FORBIDDEN, detail=detail)


class UnauthenticatedException(HTTPException):
    def __init__(self):
        super().__init__(
            status_code=HTTPStatus.UNAUTHORIZED, detail="Requires authentication"
        )
