import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { logger } from './logger';

const jaegerExporter = new JaegerExporter({
    host: 'jaeger',
});

const sdk = new NodeSDK({
    serviceName: 'app',
    traceExporter: jaegerExporter,
    instrumentations: [new HttpInstrumentation(), new ExpressInstrumentation()],
});

export const initializeTracer = () => {
    sdk.start()
        .then(() => {
            logger.info('Tracer initialized');
        })
        .catch((err) => {
            logger.error({ err }, 'Error initializing tracer');
        });
};
