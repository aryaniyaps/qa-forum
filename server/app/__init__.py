from asgi_correlation_id import CorrelationIdMiddleware
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.constants import APP_NAME
from app.error_handlers import (
    pagination_error_handler,
    resource_not_found_error_handler,
)
from app.errors import PaginationError, ResourceNotFoundError
from app.openapi import generate_operation_id
from app.settings import AppSettings, CoreSettings, get_settings


def add_routes(app: FastAPI) -> None:
    """Register routes for the app."""


def add_error_handlers(app: FastAPI) -> None:
    """Register error handlers for the app."""
    app.add_exception_handler(
        ResourceNotFoundError,
        handler=resource_not_found_error_handler,  # type: ignore[arg-type]
    )
    app.add_exception_handler(
        PaginationError,
        handler=pagination_error_handler,  # type: ignore[arg-type]
    )


def add_middleware(app: FastAPI, app_settings: AppSettings) -> None:
    """Register middleware for the app."""
    app.add_middleware(
        CORSMiddleware,
        allow_origins=app_settings.cors_allow_origins,
        allow_credentials=True,
        allow_headers=["*"],
        allow_methods=["*"],
        expose_headers=["*"],
    )
    app.add_middleware(
        CorrelationIdMiddleware,
        header_name="X-Request-ID",
    )


def create_app() -> FastAPI:
    """Create a new application instance."""
    app_settings = get_settings(AppSettings)
    app = FastAPI(
        version="0.0.1",
        title=f"{APP_NAME} HTTP API",
        summary=f"""
        The {APP_NAME} HTTP API provides endpoints for extracting structured data from documents.
        Users can create separate pipelines for different document types and configure the extraction process.
        """,
        license_info={
            "name": "Apache 2.0",
            "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
        },
        terms_of_service="https://velocius.ai/terms/",
        debug=get_settings(CoreSettings).debug,
        openapi_url=app_settings.openapi_url,
        redoc_url="/docs",
        docs_url=None,
        swagger_ui_parameters={
            "syntaxHighlight.theme": "monokai",
            "displayRequestDuration": True,
        },
        generate_unique_id_function=generate_operation_id,
    )
    add_routes(app)
    add_error_handlers(app)
    add_middleware(app, app_settings)
    return app
