import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/constants';
import pool from '../../config/database';
import { User } from '../users/users.interface';
import ApiError from '../../utils/apiError';

export const createUser = async (name: string, email: string, password: string): Promise<User> => {
    const normalizedEmail: string = email.trim().toLowerCase();

    const existingUser = await findUserByEmail(normalizedEmail);
    if (existingUser) {
        throw new ApiError('Email already in use', 409);
    }

    const saltRounds: number = 12;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);

    const result = await pool.query<User>(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`, [name.trim(), normalizedEmail, hashedPassword]);

    return result.rows[0];
};

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const normalizedEmail: string = email.trim().toLowerCase();
    const result = await pool.query<User>(`SELECT * FROM users WHERE email = $1`, [normalizedEmail]);
    return result.rows[0] || null;
};

export const generateToken = (userId: string): string => {
    if (!env.JWT_SECRET_KEY) {
        throw new ApiError('JWT secret key is not defined in environment variables', 500);
    }
    return jwt.sign({ id: userId }, env.JWT_SECRET_KEY, { expiresIn: '7d' });
};
