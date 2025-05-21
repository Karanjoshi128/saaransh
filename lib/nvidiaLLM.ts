// import Stream from "stream";
import axios from "axios";

/**
 * Calls the local NVIDIA LLM Flask server to summarize a PDF file.
 * @param {File | Blob} file - The PDF file to summarize.
 * @param {string} [prompt] - Optional custom prompt for summarization.
 * @returns {Promise<string>} - The generated summary.
 */
export async function generateSummaryFromNvidiaLLM(
  file: File | Blob,
  prompt?: string
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  if (prompt) {
    formData.append("prompt", prompt);
  }

  try {
    const response = await axios.post(
      "https://nvidiallm-summarizer.onrender.com/summarize",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 60000, // 60 seconds timeout
      }
    );
    if (response.data && response.data.summary) {
      return response.data.summary;
    } else {
      throw new Error("No summary returned from NVIDIA LLM server");
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.error ||
        error.message ||
        "Error calling NVIDIA LLM server"
    );
  }
}
