'use client';

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { UploadDropzone } from "@/utils/uploadthing";
import { generatePdfSummary, storePdfSummaryAction } from "@/actions/upload-actions";


const UploadPage = () => {
  const [summary, setSummary] = useState<string>("");

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Upload Your PDF</h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Upload your PDF documents and get instant AI-powered summaries. Our system will analyze and extract the key points from your document.
        </p>

        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Upload PDF</CardTitle>
            <CardDescription>
              Drag and drop your PDF file or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UploadDropzone
              endpoint="pdfUploader"
              onClientUploadComplete={async (res) => {
                toast.success("Uploaded successfully!", {
                  description: "Your file has been uploaded successfully.",
                });
                console.log(res);
                const formattedRes = res.map((file: any) => ({
                  serverData: {
                    userID: file.uploadedBy || "unknown",
                    file: {
                      url: file.ufsUrl,
                      name: file.name,
                    },
                    title : file.name,
                  },
                }));
                try {
                  // Use your server action to generate the summary
                  const summary = await generatePdfSummary([formattedRes[0]]);
                  setSummary(summary.data); // Store summary in state
                  console.log(summary);

                  // Store summary in the database
                  await storePdfSummaryAction({
                    user_id: formattedRes[0].serverData.userID,
                    original_file_url: formattedRes[0].serverData.file.url,
                    summary_text: summary.data,
                    file_name: formattedRes[0].serverData.file.name,
                  });
                  toast.success("Summary saved to database!");
                } catch (err) {
                  toast.error("Summary generation failed", {
                    description: "There was an error generating the summary.",
                  });
                }
              }}
              onUploadError={(error: Error) => {
                toast.error("Upload failed", {
                  description: error.message,
                });
              }}
              className="ut-upload-dropzone w-full h-64"
            />
            {/* Display summary in a textarea if available */}
            {summary && (
              <div className="mt-8">
                <label htmlFor="summary" className="block mb-2 font-medium text-foreground">
                  Generated Summary
                </label>
                <textarea
                  id="summary"
                  className="w-full min-h-[150px] p-3 rounded-md border border-border bg-card text-foreground resize-y"
                  value={summary}
                  readOnly
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-center">Why use our PDF Summarizer?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-card rounded-lg shadow-sm text-center">
              <h3 className="font-medium mb-2">Save Time</h3>
              <p className="text-sm text-muted-foreground">Extract key information without reading the entire document.</p>
            </div>
            <div className="p-4 bg-card rounded-lg shadow-sm text-center">
              <h3 className="font-medium mb-2">AI Powered</h3>
              <p className="text-sm text-muted-foreground">Our advanced AI ensures high-quality accurate summaries.</p>
            </div>
            <div className="p-4 bg-card rounded-lg shadow-sm text-center">
              <h3 className="font-medium mb-2">Easy Sharing</h3>
              <p className="text-sm text-muted-foreground">Export and share summaries in various formats.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;