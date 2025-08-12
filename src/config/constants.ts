import dotenv from 'dotenv';

dotenv.config({ quiet: true });

type nodeEnvType = 'development' | 'production';

interface EnvVars {
    PORT: number;
    NODE_ENV: nodeEnvType;
    DB_USER: string;
    DB_HOST: string;
    DB_NAME: string;
    DB_PASSWORD: string;
    DB_PORT: number;
    REDIS_HOST: string;
    REDIS_PORT: number;
    JWT_SECRET_KEY: string;
    OPENAI_API_KEY: string;
    GROQ_API_KEY: string;
}

export const env: EnvVars = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV === 'production' ? 'production' : 'development',

    DB_USER: process.env.DB_USER || 'postgres',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'content-simplifier',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_PORT: Number(process.env.DB_PORT) || 5432,

    REDIS_HOST: process.env.REDIS_HOST || '127.0.0.1',
    REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,

    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || '',

    OPENAI_API_KEY: process.env.OPENAI_API_KEY || '',

    GROQ_API_KEY: process.env.GROQ_API_KEY || '',
};
