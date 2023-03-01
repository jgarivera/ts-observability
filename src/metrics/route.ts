import { Router, Request, Response } from 'express';
import { register } from 'prom-client';

const router = Router();

router.get('/metrics', async (req: Request, res: Response) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        res.status(500).end(err);
    }
});

export default router;
