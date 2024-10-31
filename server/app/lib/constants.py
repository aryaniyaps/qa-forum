from enum import Enum

# branding

SUPPORT_EMAIL = "support@example.com"

APP_NAME = "QA Forum"

APP_URL = "https://example.com"  # frontend app URL

# pagination

MAX_PAGINATION_LIMIT = 100

# authentication

VERIFICATION_TOKEN_EXPIRES_IN = 60 * 10  # 10 minutes


class VoteType(Enum):
    UPVOTE = "upvote"
    DOWNVOTE = "downvote"
