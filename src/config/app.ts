import express from 'express';
import { globalErrorHandler } from '../middleware/globalErrorHandler';
import { mountRouters } from '../routes';
import rateLimit from 'express-rate-limit';

const app: express.Application = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        error: 'Too many requests, please try again later.',
    },
});

app.use(limiter);

app.use(express.json());

mountRouters(app);

app.use(globalErrorHandler);

export default app;
