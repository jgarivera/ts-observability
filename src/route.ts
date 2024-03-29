import { Router, Request, Response } from 'express';
import { register } from 'prom-client';
import Logger from 'bunyan';

export class ApplicationRoutes {
    private router: Router = Router();

    public constructor(private logger: Logger) {
        this.router.get('/warn', (req: Request, res: Response) => {
            try {
                throw new Error('Some warning');
            } catch (err) {
                res.send('A warning has occured');
                this.logger.warn({ err }, 'Warning has occured');
            }
        });

        this.router.get('/error', (req: Request, res: Response) => {
            try {
                throw new Error('Some error');
            } catch (err) {
                res.send('An error has occured');
                this.logger.error({ err }, 'Error has occured');
            }
        });

        this.router.get('/', (req: Request, res: Response) => {
            res.send('Received information');
        });

        this.router.get('/slow', async (req: Request, res: Response) => {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            res.send('Received information slowly');
        });

        this.router.get('/metrics', async (req: Request, res: Response) => {
            try {
                res.set('Content-Type', register.contentType);
                res.end(await register.metrics());
            } catch (err) {
                res.status(500).end(err);
            }
        });
    }

    public getRouter(): Router {
        return this.router;
    }
}
