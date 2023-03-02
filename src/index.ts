import dotenv from 'dotenv';
dotenv.config();

import { ApplicationObservability } from './observability';
import { ApplicationRoutes } from './route';
import express, { Express } from 'express';

const app: Express = express();

const observability = new ApplicationObservability('app');
observability.initialize();

const logger = observability.getLogger().getInstance();
const routes = new ApplicationRoutes(logger);

app.use(routes.getRouter());
app.use(observability.getMetrics().getRouter());

const port = process.env.PORT;

app.listen(port, () => {
    logger.info(`Application running at port: ${port}`);
});
