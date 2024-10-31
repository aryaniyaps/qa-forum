from collections.abc import Awaitable, Callable
from uuid import uuid4

from fastapi import Request, Response


async def set_fingerprint_middleware(
    request: Request,
    call_next: Callable[
        [Request],
        Awaitable[Response],
    ],
):
    """Middleware to set a fingerprint cookie if it does not exist."""
    fingerprint = request.cookies.get("fingerprint")
    if fingerprint is None:
        fingerprint = str(uuid4())
    request.state.fingerprint = fingerprint
    response = await call_next(request)
    response.set_cookie(key="fingerprint", value=request.state.fingerprint)

    return response
