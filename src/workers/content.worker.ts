import { Worker } from 'bullmq';
import { redisConnection } from '../config/redis';
import { scrapeArticleContent } from '../services/articleScraper.service';
import pool from '../config/database';
import { generateSummaryFromArticle } from '../config/openAI';

const contentWorker = new Worker(
    'content-queue',
    async (job) => {
        console.log('Job Received:', job.data);

        const articleContent: string = await scrapeArticleContent(job.data.url);

        const summary: string = await generateSummaryFromArticle(articleContent);

        const threads: string[] = summary
            .split(/\n\s*(?:\d+\/|-|\*)\s*/)
            .map((t) => t.trim())
            .filter((t) => t.length > 0);

        // const title = threads[0];
        const title:string = job.data.url;

        await pool.query(`INSERT INTO contents (user_id, title, body) VALUES ($1, $2, $3)`, [job.data.userId, title, JSON.stringify(threads)]);

        console.log('Article processed & saved');

        return { title, summary };
    },
    { connection: redisConnection }
);

contentWorker.on('failed', (job, err) => {
    console.error(`Job ${job?.id} failed:`, err.message);
});

console.log('🚀 Content Worker is running...');
