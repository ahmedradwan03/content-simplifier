import { Application } from 'express';
import usersRoutes from '../modules/users/users.routes';
import authRoutes from '../modules/auth/auth.routes';
import contentsRoutes from '../modules/contents/contents.routes';

export const mountRouters = (app: Application) => {
    app.use('/api/v1/users', usersRoutes);
    app.use('/api/v1/auth', authRoutes);
    app.use('/api/v1/content', contentsRoutes);
};
