import dataclasses

from strawberry.dataloader import DataLoader

from app.questions.dataloaders import load_answer_by_id, load_question_by_id
from app.questions.models import Answer, Question
from app.users.dataloaders import load_user_by_id
from app.users.models import User


@dataclasses.dataclass(slots=True, kw_only=True)
class Dataloaders:
    user_by_id: DataLoader[str, User | None]
    question_by_id: DataLoader[str, Question | None]
    answer_by_id: DataLoader[str, Answer | None]


def create_dataloaders() -> Dataloaders:
    return Dataloaders(
        user_by_id=DataLoader(
            load_fn=load_user_by_id,  # type: ignore[arg-type]
        ),
        question_by_id=DataLoader(
            load_fn=load_question_by_id,  # type: ignore[arg-type]
        ),
        answer_by_id=DataLoader(
            load_fn=load_answer_by_id,  # type: ignore[arg-type]
        ),
    )
