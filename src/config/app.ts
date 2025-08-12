import express from 'express';
import { globalErrorHandler } from '../middleware/globalErrorHandler';
import { mountRouters } from '../routes';

const app: express.Application = express();

app.use(express.json());

mountRouters(app);

app.use(globalErrorHandler);

export default app;
