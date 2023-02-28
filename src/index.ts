import dotenv from 'dotenv';
dotenv.config();

import { initializeTracer } from './tracer';

initializeTracer();

import express, { Express } from 'express';

import { initializeMetrics } from './metrics';

initializeMetrics();
import { logger } from './logger';
import router from './route';

const app: Express = express();
app.use(router);

const port = process.env.PORT;

app.listen(port, () => {
    logger.info(`Application running at port: ${port}`);
});
