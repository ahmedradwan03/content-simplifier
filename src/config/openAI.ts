import { Groq } from 'groq-sdk';
import { env } from './constants';
import ApiError from '../utils/apiError';

const groq = new Groq({
    apiKey: env.GROQ_API_KEY,
});

export const generateSummaryFromArticle = async (content: string) => {
    const chatCompletion = await groq.chat.completions.create({
        model: 'llama3-70b-8192',
        messages: [
            {
                role: 'system',
                content:
                    'You are a helpful study assistant. Your job is to read an article and produce a clear, concise summary that helps someone understand or review the key points. ' +
                    'Highlight important facts, concepts, and takeaways. Format the output in bullet points or short sections so it is easy to study.',
            },
            {
                role: 'user',
                content: `Summarize the following article for study purposes:\n\n${content}`,
            },
        ],
        max_tokens: 1000,
    });

    const summary = chatCompletion.choices[0]?.message?.content?.trim();

    if (!summary) {
        throw new ApiError('No summary generated from article content', 500);
    }

    return summary;
}

// import OpenAI from 'openai';
// import { env } from './constants';

// const openai = new OpenAI({
//     apiKey: env.OPENAI_API_KEY,
//     baseURL: 'https://openrouter.ai/api/v1',
// });

// export async function generateThreadFromArticle(content: string) {
//     const chatCompletion = await openai.chat.completions.create({
//         model: 'openrouter/auto',
//         messages: [
//             { role: 'system', content: 'You are a Twitter thread generator.' },
//             { role: 'user', content: `Convert the following article into a Twitter thread:\n\n${content}` },
//         ],
//         max_tokens: 1000,
//     });

//     return chatCompletion.choices[0].message.content;
// }