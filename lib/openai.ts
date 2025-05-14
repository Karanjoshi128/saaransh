/* eslint-disable no-undef */

import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export async function generateSummaryFromOpenAI(pdfText: string) {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant.',
                },
                {
                    role: 'user',
                    content: `Transform this document into an engaging, easy-to-read summary with contextuality relevant emojis and proper markdown formatting:\n\n${pdfText}`,
                },
            ],
            store : true,
            temperature: 0.7,
            max_tokens: 1500,
        });
        return response.choices[0].message.content;
    } catch (error : any) {
        if(error?.status === 429) {
            throw new Error('RATE_LIMIT_EXCEEDED');
        }
        throw error;
    }
}