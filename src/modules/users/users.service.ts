import pool from '../../config/database';
import { User } from './users.interface';

export const getAllUsers = async (): Promise<User[]> => {
    const users = await pool.query('SELECT * FROM users');
    return users.rows;
};

export const getUserById = async (id: string): Promise<User | null> => {
    const user = await pool.query<User>('SELECT * FROM users WHERE id=$1', [id]);
    return user.rows[0];
};

export const createUser = async (name: string, email: string, password: string): Promise<User> => {
    const newUser = await pool.query<User>('INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *', [name, email, password]);
    return newUser.rows[0];
};
