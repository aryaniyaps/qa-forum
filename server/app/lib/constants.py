from enum import Enum

MAX_PAGINATION_LIMIT = 100


class VoteType(Enum):
    UPVOTE = "upvote"
    DOWNVOTE = "downvote"
