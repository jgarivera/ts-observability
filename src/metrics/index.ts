import Logger from 'bunyan';
import { Router } from 'express';
import { collectDefaultMetrics, Counter } from 'prom-client';
import router from './route';

export class ApplicationMetrics {
    public constructor(private logger: Logger) {}

    public initialize(): void {
        collectDefaultMetrics();
        this.registerMetrics();

        this.logger.info('Metrics initialized');
    }

    private registerMetrics(): void {
        new Counter({
            name: 'scrape_counter',
            help: 'Number of scrapes (example of a counter with a collect fn)',
            collect() {
                // collect is invoked each time `register.metrics()` is called.
                this.inc();
            },
        });
    }

    public getRouter(): Router {
        return router;
    }
}
