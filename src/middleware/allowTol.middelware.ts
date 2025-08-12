import { Request, Response, NextFunction } from 'express';
import { User } from '../modules/users/users.interface';
import ApiError from '../utils/apiError';
import asyncHandler from 'express-async-handler';

export const allowedTo = (...roles: User['role'][]) =>
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ApiError('You do not have permission to perform this action', 403));
        }
        next();
    });
