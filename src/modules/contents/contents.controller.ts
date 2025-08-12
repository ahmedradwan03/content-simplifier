import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import ApiError from '../../utils/apiError';
import * as contentService from './contents.service';
import { redisClient } from '../../config/redis';

export const createContentJob = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req.body;
    const userId = req.user?.id;

    if (!url || !userId) {
        return next(new ApiError('Missing URL or user authentication', 400));
    }

    const job = await contentService.addContentJob(url, userId);

    const cacheKey = `contents:user:${userId}`;
    await redisClient.del(cacheKey);

    res.status(202).json({
        message: 'Article has been queued for processing',
        jobId: job.id,
    });
});

export const getContentResult = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) {
        return next(new ApiError('User ID is required', 400));
    }

    const cacheKey = `contents:user:${userId}`;
    const cached = await redisClient.get(cacheKey);

    let source: 'cache' | 'db';
    let content;

    if (cached) {
        content = JSON.parse(cached);
        source = 'cache';
    } else {
        content = await contentService.getAllContent(userId);
        await redisClient.setex(cacheKey, 600, JSON.stringify(content));
        source = 'db';
    }

    res.status(200).json({
        status: 'success',
        results: content.length,
        data: content,
        source,
    });
});

export const getContentById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
        return next(new ApiError('Unauthorized', 401));
    }

    const cacheKey = `content:user:${userId}:id:${id}`;
    const cached = await redisClient.get(cacheKey);

    let source: 'cache' | 'db';
    let content;

    if (cached) {
        content = JSON.parse(cached);
        source = 'cache';
    } else {
        content = await contentService.getContentById(id, userId);

        if (!content) {
            return next(new ApiError('Content not found', 404));
        }

        await redisClient.setex(cacheKey, 600, JSON.stringify(content));
        source = 'db';
    }

    res.status(200).json({
        status: 'success',
        data: content,
        source,
    });
});
