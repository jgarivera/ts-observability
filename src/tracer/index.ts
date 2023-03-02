import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { Resource } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import Logger from 'bunyan';
import {
    BatchSpanProcessor,
    ConsoleSpanExporter,
    NodeTracerProvider,
} from '@opentelemetry/sdk-trace-node';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

// Not functionally required but gives some insight what happens behind the scenes
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

export class ApplicationTracer {
    public constructor(
        private serviceName: string,
        private jaegerExporter: JaegerExporter,
        private logger: Logger
    ) {}

    public initialize(): void {
        const resource = Resource.default().merge(
            new Resource({
                [SemanticResourceAttributes.SERVICE_NAME]: this.serviceName,
            })
        );

        const provider = new NodeTracerProvider({
            resource: resource,
        });

        const exporter = new ConsoleSpanExporter();
        const batchProcessor = new BatchSpanProcessor(this.jaegerExporter);

        provider.addSpanProcessor(batchProcessor);
        provider.register();

        registerInstrumentations({
            tracerProvider: provider,
            instrumentations: [
                new HttpInstrumentation(),
                new ExpressInstrumentation(),
            ],
        });

        this.logger.info('Tracer initialized');
    }
}
