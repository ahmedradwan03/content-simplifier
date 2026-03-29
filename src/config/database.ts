import { Pool } from 'pg';
import { env } from './constants';
import { runMigrations } from '../migrations/runMigrations';

const pool = new Pool({
    user: env.DB_USER,
    host: env.DB_HOST,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
    port: env.DB_PORT,
});


export const dbConnection = async () => { 
    try {
        await pool.connect();
        console.log('✅ Connected to PostgreSQL database');
        runMigrations()
    } catch (err) {
        console.error('❌ Database connection failed', err);
        process.exit(1);
    }
};
export default pool;
