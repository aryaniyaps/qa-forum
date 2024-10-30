from typing import Awaitable, Callable
from uuid import uuid4

from fastapi import Request, Response


async def user_id_middleware(
    request: Request,
    call_next: Callable[
        [Request],
        Awaitable[Response],
    ],
):
    """Middleware to set a user ID cookie if it does not exist."""
    # Check if the user ID cookie exists
    user_id = request.cookies.get("user_id")
    # If not, generate a new UUID and set it in the cookies
    if not user_id:
        user_id = str(uuid4())
        request.cookies.setdefault("user_id", user_id)

    response = await call_next(request)
    response.set_cookie(key="user_id", value=user_id)

    return response
