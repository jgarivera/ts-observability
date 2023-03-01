import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NodeSDK } from '@opentelemetry/sdk-node';
import Logger from 'bunyan';

export class ApplicationTracer {
    public constructor(
        private serviceName: string,
        private jaegerExporter: JaegerExporter,
        private logger: Logger
    ) {}

    public async initialize(): Promise<void> {
        const sdk = new NodeSDK({
            serviceName: this.serviceName,
            traceExporter: this.jaegerExporter,
            instrumentations: [
                new ExpressInstrumentation(),
                new HttpInstrumentation(),
            ],
        });

        try {
            await sdk.start();

            this.logger.info('Tracer initialized');
        } catch (err) {
            this.logger.error({ err }, 'Error initializing tracer');
        }
    }
}
