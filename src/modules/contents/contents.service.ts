import pool from '../../config/database';
import { contantQueue } from '../../queues/content.queue';
import { Content } from './contents.interface';

export const addContentJob = async (url: string, userId: string) => {
    return await contantQueue.add('process-article', { url, userId });
};

export const getAllContent = async (userId: string): Promise<Content[]> => {
    const content = await pool.query('SELECT * FROM contents WHERE user_id = $1', [userId]);
    return content.rows;
};

export const getContentById = async (id: string, userId: string): Promise<Content | null> => {
    const content = await pool.query('SELECT * FROM contents WHERE id = $1 AND user_id = $2', [id, userId]);
    return content.rows[0] || null;
};
