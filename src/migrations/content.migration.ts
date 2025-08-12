import pool from '../config/database';

export const createContentsTable = async () => {
    await pool.query(`CREATE TABLE IF NOT EXISTS contents(
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    body JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`);
};
