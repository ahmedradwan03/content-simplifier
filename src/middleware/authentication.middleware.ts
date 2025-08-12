import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ApiError from '../utils/apiError';
import asyncHandler from 'express-async-handler';
import pool from '../config/database';
import { User } from '../modules/users/users.interface';
import { env } from '../config/constants';

interface DecodedToken extends JwtPayload {
    id: string;
}

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export const isAuthenticated = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization?.startsWith('Bearer')) {
        return next(new ApiError('Please login to the app', 400));
    }
    const token = req.headers.authorization.split(' ')[1];

    const decoded: any = jwt.verify(token, env.JWT_SECRET_KEY!) as DecodedToken;

    const userResult = await pool.query<User>('SELECT * FROM users WHERE id = $1', [decoded.id]);
    const currentUser = userResult.rows[0];

    if (!currentUser) {
        return next(new ApiError('The user belonging to this token no longer exists.', 401));
    }

    req.user = currentUser;
    res.locals.user = currentUser;

    next();
});
