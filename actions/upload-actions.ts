"use server";
// import { Client } from "pg";
// import { generateSummaryFromGemini } from "@/lib/geminiai";
// import { generateSummaryFromHuggingFace } from "@/lib/huggingface";
import { generateSummaryFromNvidiaLLM } from "@/lib/nvidiaLLM";
// import { generateSummaryFromOpenAI } from "@/lib/openai";

interface StorePdfSummaryParams {
  user_id: string;
  original_file_url: string;
  summary_text: string;
  title?: string;
  file_name?: string;
  status?: string;
}
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
    // Fetch the PDF file as a Blob
    const pdfResponse = await fetch(pdfUrl);
    if (!pdfResponse.ok) {
      throw new Error("Failed to fetch PDF file");
    }
    const pdfBlob = await pdfResponse.blob();
    try {
      // Directly send the PDF file to the NVIDIA LLM summarizer
      const summary = await generateSummaryFromNvidiaLLM(pdfBlob);
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
        message: "Error generating summary from NVIDIA LLM",
        data: null,
      };
    }
  } catch {
    return {
      success: false,
      message: "Error fetching PDF file",
      data: null,
    };
  }
}

// export async function storePdfSummaryAction({
//   user_id,
//   original_file_url,
//   summary_text,
//   title,
//   file_name,
//   status = "completed",
// }: StorePdfSummaryParams) {
//   const client = new Client({
//     connectionString: process.env.DATABASE_URL,
//     ssl: { rejectUnauthorized: false },
//   });

//   await client.connect();

//   const query = `
//     INSERT INTO pdf_summaries (
//       user_id,
//       original_file_url,
//       summary_text,
//       status,
//       title,
//       file_name
//     ) VALUES ($1, $2, $3, $4, $5, $6)
//     RETURNING *;
//   `;

//   const values = [
//     user_id,
//     original_file_url,
//     summary_text,
//     status,
//     title || null,
//     file_name || null,
//   ];

//   try {
//     const res = await client.query(query, values);
//     return res.rows[0];
//   } finally {
//     await client.end();
//   }
// }

export async function storePdfSummaryAction({
  user_id,
  original_file_url,
  summary_text,
  title,
  file_name,
  status = "completed",
}: StorePdfSummaryParams) {
  console.log("Saving into NeonDb On hold");
}