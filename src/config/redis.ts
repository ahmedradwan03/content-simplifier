import Redis, { RedisOptions } from 'ioredis';
import { env } from './constants';

export const redisConnection: RedisOptions = {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
};

export const redisClient = new Redis(redisConnection);
