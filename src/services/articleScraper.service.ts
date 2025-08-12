import axios from 'axios';
import * as cheerio from 'cheerio';
import ApiError from '../utils/apiError';

async function scrapeWithAxios(url: string): Promise<string> {
    try {
        const { data } = await axios.get(url, {
            headers: { 'User-Agent': 'Mozilla/5.0' },
        });
        const $ = cheerio.load(data);
        const paragraphs = $('p')
            .map((_, el) => $(el).text())
            .get()
            .join('\n');
        if (!paragraphs.trim()) throw new ApiError('Empty content', 404);
        return paragraphs.trim();
    } catch (err) {
        throw new Error('Axios scrape failed');
    }
}

// async function scrapeWithPuppeteer(url: string): Promise<string> {
//     const browser = await puppeteer.launch({ headless: true });
//     const page = await browser.newPage();
//     await page.goto(url, { waitUntil: 'networkidle2' });

//     const content = await page.evaluate(() =>
//         Array.from(document.querySelectorAll('p'))
//             .map((el) => el.textContent)
//             .join('\n')
//     );
//     await browser.close();
//     if (!content.trim()) throw new ApiError('Empty Puppeteer content', 404);
//     return content.trim();
// }

export async function scrapeArticleContent(url: string): Promise<string> {
    // try {
    return await scrapeWithAxios(url);
    // } catch {
    //     console.log('Puppeteer...');
    //     // return await scrapeWithPuppeteer(url);
    // }
}
