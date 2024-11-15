from strawberry.extensions import FieldExtension
from strawberry.types.field import StrawberryField


class QueryCostExtension(FieldExtension):
    def __init__(self, cost_value: int = 0) -> None:
        self.cost_value = cost_value

    def apply(self, field: StrawberryField) -> None:
        # TODO: check if field is a connection here. If it is, we should apply the cost based on the first/last arguments
        # TODO: check if field is a mutation here. If it is, we should apply a cost of 10
        # TODO: check if field is a node here. If it is, we should apply a cost of 1
        field.metadata["complexity_cost"] = self.cost_value  # type: ignore[index]
