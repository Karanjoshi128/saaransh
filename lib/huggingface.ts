// import { pipeline } from '@xenova/transformers';

// export async function generateSummaryFromHuggingFace(pdfText: string) {
//   const summarizer = await pipeline('summarization', 'Xenova/bart-large-cnn');
  
//   const summary = await summarizer(pdfText, { max_length: 512, min_length: 50 });
  
//   return summary || "No summary generated.";
// }

import { pipeline } from '@xenova/transformers';

export async function generateSummaryFromHuggingFace(pdfText: string) {
  const summarizer = await pipeline('summarization', 'Xenova/long-t5-tglobal-base');
  const summary = await summarizer(pdfText, { max_length: 512, min_length: 50 });
  return summary[0]?.summary_text || "No summary generated.";
}