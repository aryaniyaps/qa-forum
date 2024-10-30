import dataclasses

from strawberry.dataloader import DataLoader

from app.questions.dataloaders import load_question_by_id
from app.questions.models import Question


@dataclasses.dataclass(slots=True, kw_only=True)
class Dataloaders:
    question_by_id: DataLoader[str, Question | None]


def create_dataloaders() -> Dataloaders:
    return Dataloaders(
        question_by_id=DataLoader(
            load_fn=load_question_by_id,  # type: ignore[arg-type]
        ),
    )
