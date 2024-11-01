import json
from pathlib import Path

from app import create_app
from fastapi.openapi.utils import get_openapi

openapi_schema_path = Path("../schema/openapi.json")

openapi_schema_path.parent.mkdir(parents=True, exist_ok=True)

app = create_app()

openapi_content = get_openapi(
    title=app.title,
    version=app.version,
    openapi_version=app.openapi_version,
    description=app.description,
    routes=app.routes,
)

for path_data in openapi_content["paths"].values():
    for operation in path_data.values():
        tag = operation["tags"][0]
        operation_id = operation["operationId"]
        to_remove = f"{tag}-"
        new_operation_id = operation_id[len(to_remove) :]
        operation["operationId"] = new_operation_id

openapi_schema_path.write_text(json.dumps(openapi_content))
