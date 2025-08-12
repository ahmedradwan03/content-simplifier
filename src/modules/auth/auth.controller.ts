import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import * as authService from './auth.service';
import ApiError from '../../utils/apiError';

export const signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    const existingUser = await authService.findUserByEmail(email);
    if (existingUser) {
        return next(new ApiError('Email is already in use', 400));
    }

    const newUser = await authService.createUser(name, email, password);
    const token = authService.generateToken(newUser.id);

    res.status(201).json({ success: true, token, data: newUser });
});

export const login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await authService.findUserByEmail(email);
    if (!user) {
        return next(new ApiError('Invalid email or password', 401));
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        return next(new ApiError('Invalid email or password', 401));
    }

    const token = authService.generateToken(user.id);

    res.json({ success: true, token, data: user });
});
