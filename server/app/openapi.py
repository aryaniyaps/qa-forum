from fastapi.routing import APIRoute


def generate_operation_id(route: APIRoute) -> str:
    """Generate a unique ID for each path operation."""
    if not route.tags:
        return route.name
    return f"{route.tags[0]}-{route.name}"
