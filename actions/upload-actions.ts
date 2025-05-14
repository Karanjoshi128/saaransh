"use server";

// import { generateSummaryFromGemini } from "@/lib/geminiai";
import { fetchAndExtractPdfText } from "@/lib/langchain";
import { generateSummaryFromHuggingFace } from "@/lib/huggingface";
import { generateSummaryFromOpenAI } from "@/lib/openai";

export async function generatePdfSummary(
  uploadResponse: [
    {
      serverData: {
        userID: string;
        file: {
          url: string;
          name: string;
        };
      };
    }
  ]
) {
  if (!uploadResponse) {
    return {
      success: false,
      message: "No file uploaded",
      data: null,
    };
  }

  const {
    serverData: {
      userID,
      file: { url: pdfUrl, name: fileName },
    },
  } = uploadResponse[0];

  if (!pdfUrl || !fileName) {
    return {
      success: false,
      message: "No file uploaded",
      data: null,
    };
  }

  try {
    const pdfText = await fetchAndExtractPdfText(pdfUrl);
    console.log("PDF Text: ", pdfText);
    try {
        const summary = await generateSummaryFromHuggingFace(pdfText);
      // const summary = await generateSummaryFromGemini(pdfText);
      //   const summary = await generateSummaryFromOpenAI(pdfText);
      if (summary) {
        console.log("Summary: ", summary);
      }
      return {
        success: true,
        message: "Summary generated successfully",
        data: summary,
      };
    } catch (error) {
      console.log(error);

      return {
        success: false,
        message: "Error generating summary from hugging face",
        data: null,
      };
    }
  } catch (err) {
    return {
      success: false,
      message: "Error generating summary",
      data: null,
    };
  }
}


export async function storePdfSummaryaction () {

}