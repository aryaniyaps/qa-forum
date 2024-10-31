from typing import TypedDict

from fastapi import Request
from strawberry.types import Info as StrawberryInfo

from app.dataloaders import Dataloaders
from app.users.models import User


class Context(TypedDict):
    user: User
    request: Request
    loaders: Dataloaders


Info = StrawberryInfo[Context, None]
