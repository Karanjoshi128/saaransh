export async function generateSummaryFromHuggingFace(pdfText: string) {
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) throw new Error("Hugging Face API key not set");
  
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: pdfText }),
      }
    );
  
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Hugging Face API error:", errorText); // <-- Add this line
      if (response.status === 429) throw new Error("RATE_LIMIT_EXCEEDED");
      throw new Error("Hugging Face API error");
    }
  
    const data = await response.json();
    return data[0]?.summary_text || "No summary generated.";
  }