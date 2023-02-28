import { collectDefaultMetrics, Counter } from 'prom-client';
import { logger } from '../logger';

export const initializeMetrics = () => {
    collectDefaultMetrics();

    new Counter({
        name: 'scrape_counter',
        help: 'Number of scrapes (example of a counter with a collect fn)',
        collect() {
            // collect is invoked each time `register.metrics()` is called.
            this.inc();
        },
    });

    logger.info('Metrics initialized');
};
