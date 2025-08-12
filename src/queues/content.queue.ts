import { Queue } from 'bullmq';
import { redisConnection } from '../config/redis';

export const contantQueue = new Queue('content-queue', {
    connection: redisConnection,
});
