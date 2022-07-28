import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './config/logger';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

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

app.listen(port, () => {
    logger.info(`Application running at port: ${port}`);
});
