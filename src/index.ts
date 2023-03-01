import dotenv from 'dotenv';
dotenv.config();

import { ApplicationTracer } from './tracer';
import { ApplicationMetrics } from './metrics';
import { ApplicationLogger } from './logger';

import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import express, { Express } from 'express';
import { ApplicationRoutes } from './route';

const logger = new ApplicationLogger('app').getInstance();

const tracer = new ApplicationTracer(
    'app',
    new JaegerExporter({
        host: 'jaeger',
    }),
    logger
);

tracer.initialize();

const metrics = new ApplicationMetrics(logger);

const app: Express = express();
const routes = new ApplicationRoutes(logger);

app.use(routes.getRouter());
app.use(metrics.getRouter());

const port = process.env.PORT;

app.listen(port, async () => {
    metrics.initialize();

    logger.info(`Application running at port: ${port}`);
});
