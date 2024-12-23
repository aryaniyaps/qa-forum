from opentelemetry import trace
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.resources import SERVICE_NAME, SERVICE_VERSION, Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import (
    BatchSpanProcessor,
)


def setup_tracing(oltp_exporter_endpoint: str) -> None:
    # Define the service name using the Resource object
    resource = Resource.create(
        attributes={
            SERVICE_NAME: "qa-server",  # Replace with your desired service name
            SERVICE_VERSION: "1.0.0",  # Optional: You can add version info
        }
    )

    provider = TracerProvider(resource=resource)
    otlp_exporter = OTLPSpanExporter(endpoint=oltp_exporter_endpoint, insecure=True)
    span_processor = BatchSpanProcessor(otlp_exporter)
    provider.add_span_processor(span_processor)

    # Sets the global default tracer provider
    trace.set_tracer_provider(provider)
