import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { User } from './users.interface';
import * as userService from './users.service';
import ApiError from '../../utils/apiError';

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
    const users: User[] = await userService.getAllUsers();
    res.json({ success: true, data: users });
});

export const getUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user: User | null = await userService.getUserById(id);

    if (!user) return next(new ApiError('User not Found', 404));

    res.json({ success: true, data: user });
});

export const addUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email) {
        return next(new ApiError('Name and email are required', 400));
    }

    const newUser: User = await userService.createUser(name, email, password);
    res.status(201).json({ success: true, data: newUser });
});
