from functools import lru_cache

import aioinject

from app.database.dependencies import get_session
from app.questions.repositories import AnswerRepo, QuestionRepo
from app.questions.services import AnswerService, QuestionService


@lru_cache
def create_container() -> aioinject.Container:
    container = aioinject.Container()
    container.register(aioinject.Scoped(get_session))
    container.register(aioinject.Scoped(QuestionRepo))
    container.register(aioinject.Scoped(QuestionService))
    container.register(aioinject.Scoped(AnswerRepo))
    container.register(aioinject.Scoped(AnswerService))
    return container
