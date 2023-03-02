import { ApplicationTracer } from './tracer';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { ApplicationLogger } from './logger';
import { ApplicationMetrics } from './metrics';

export class ApplicationObservability {
    private logger: ApplicationLogger;
    private tracer: ApplicationTracer;
    private metrics: ApplicationMetrics;

    public constructor(private serviceName: string) {
        this.logger = new ApplicationLogger(this.serviceName);

        const bunyan = this.logger.getInstance();

        this.tracer = new ApplicationTracer(
            'app',
            new JaegerExporter({
                host: 'jaeger',
            }),
            bunyan
        );

        this.metrics = new ApplicationMetrics(bunyan);
    }

    public initialize(): void {
        this.tracer.initialize();
        this.metrics.initialize();
    }

    public getLogger(): ApplicationLogger {
        return this.logger;
    }

    public getTracer(): ApplicationTracer {
        return this.tracer;
    }

    public getMetrics(): ApplicationMetrics {
        return this.metrics;
    }
}
