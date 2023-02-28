import { Router, Request, Response } from 'express';
import { logger } from './config/logger';
import { register } from 'prom-client';

const router = Router();

router.get('/warn', (req: Request, res: Response) => {
    try {
        throw new Error('Some warning');
    } catch (err) {
        res.send('A warning has occured');
        logger.warn({ err }, 'Warning has occured');
    }
});

router.get('/error', (req: Request, res: Response) => {
    try {
        throw new Error('Some error');
    } catch (err) {
        res.send('An error has occured');
        logger.error({ err }, 'Error has occured');
    }
});

router.get('/', (req: Request, res: Response) => {
    res.send('Some information');
    logger.info({ req }, 'Some information');
});

router.get('/metrics', async (req: Request, res: Response) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (ex) {
        res.status(500).end(ex);
    }
});

export default router;
