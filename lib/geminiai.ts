import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateSummaryFromGemini(pdfText: string) {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-002",
    });

    const prompt = [
      { text: SUMMARY_SYSTEM_PROMPT },
      {
        text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting:\n\n${pdfText}`,
      },
    ];

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: prompt,
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });

    // For @google/generative-ai v0.7.0+ use result.response.text()
    // For older versions, use result.response.text
    const text = typeof result.response === "function"
      ? await result.response().then((r: any) => r.text())
      : result.response.text;

    if (!text) {
      throw new Error("No response text from GEMINI");
    }
    return text;
  } catch (error: any) {
    if (error?.status === 429) {
      throw new Error("RATE_LIMIT_EXCEEDED");
    }
    throw error;
  }
}