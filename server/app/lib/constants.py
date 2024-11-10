from enum import Enum

# branding

SUPPORT_EMAIL = "support@example.com"

APP_NAME = "QA Forum"

APP_URL = "https://example.com"  # frontend app URL

# pagination

MAX_PAGINATION_LIMIT = 100

# description previews

DESCRIPTION_PREVIEW_MAX_LENGTH = 65


class VoteType(Enum):
    UPVOTE = "upvote"
    DOWNVOTE = "downvote"
