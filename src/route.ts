import { Router, Request, Response } from 'express';
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
            res.send('Some information');
            this.logger.info({ req }, 'Some information');
        });
    }

    public getRouter(): Router {
        return this.router;
    }
}
