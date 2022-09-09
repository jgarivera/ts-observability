import { initializeTracer } from './config/tracer';

initializeTracer();

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './config/logger';
import { initializeMetrics } from './config/metrics';
import { register } from 'prom-client';
initializeMetrics();

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.get('/warn', (req: Request, res: Response) => {
    try {
        throw new Error('Some warning');
    } catch (err) {
        res.send('A warning has occured');
        logger.warn({ err }, 'Warning has occured');
    }
});

app.get('/error', (req: Request, res: Response) => {
    try {
        throw new Error('Some error');
    } catch (err) {
        res.send('An error has occured');
        logger.error({ err }, 'Error has occured');
    }
});

app.get('/', (req: Request, res: Response) => {
    res.send('Some information');
    logger.info({ req }, 'Some information');
});

app.get('/metrics', async (req: Request, res: Response) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

app.listen(port, () => {
    logger.info(`Application running at port: ${port}`);
});
