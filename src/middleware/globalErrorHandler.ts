import { Request, Response, NextFunction } from 'express';
import { env } from '../config/constants';
import ApiError from '../utils/apiError';

export const globalErrorHandler = (error: ApiError, req: Request, res: Response, next: NextFunction) => {
    const statusCode = error.statusCode || 500;
    const environment = env.NODE_ENV || 'production';

    res.status(statusCode).json({
        success: false,
        status: error.status || 'Error',
        message: error.message || 'Internal server error',
        stack: environment === 'development' ? error.stack : 'protected',
    });
};
