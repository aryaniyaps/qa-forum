from strawberry.extensions import FieldExtension
from strawberry.types.field import StrawberryField


class QueryCostExtension(FieldExtension):
    def __init__(self, cost_value: int = 0) -> None:
        self.cost_value = cost_value

    def apply(self, field: StrawberryField) -> None:
        field.metadata["complexity_cost"] = self.cost_value  # type: ignore[index]
