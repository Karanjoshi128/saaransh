"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { generateSummaryFromNvidiaLLM } from "@/lib/nvidiaLLM";
// import { log } from "console";
// import { storePdfSummaryAction } from "@/actions/upload-actions";

const UploadPage = () => {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    setSummary("");
    if (file) {
      toast.success("File selected!", { description: file.name });
    }
  };

  const handleSummarize = async () => {
    if (!selectedFile) return;
    setLoading(true);
    try {
      const creditsResponse = await fetch("/api/credits");
      const creditsData = await creditsResponse.json();
      let canSummarize = false;
      if(creditsData.credits === 0){
        toast.error("You have no credits left to summarize.");
        return;
      }
      if (creditsData.credits > 0) {
        const decrementResponse = await fetch("/api/credits", {
          method: "POST",
        });
        const decrementData = await decrementResponse.json();
        if (!decrementResponse.ok || decrementData.error) {
          throw new Error(decrementData.error || "Failed to decrement credits");
        }
        canSummarize = true;
      }
      if (canSummarize) {
        const summary = await generateSummaryFromNvidiaLLM(selectedFile);
        setSummary(summary);
        // console.log("Generated Summary:", summary);
        
        toast.success("Summary generated!");
        // Optionally store in DB
        // await storePdfSummaryAction({ ... });
      }
    } catch (err: any) {
      toast.error("Summary generation failed", {
        description:
          err.message || "There was an error generating the summary.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to copy summary to clipboard
  const handleCopySummary = async () => {
    if (summary) {
      try {
        await navigator.clipboard.writeText(summary);
        toast.success("Summary copied to clipboard!");
      } catch {
        toast.error("Failed to copy summary.");
      }
    }
  };

  // Function to download summary as a text file
  const handleDownloadSummary = () => {
    if (summary) {
      const blob = new Blob([summary], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        (selectedFile?.name?.replace(/\.pdf$/i, "") || "summary") +
        "-summary.txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Upload Your PDF
        </h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Upload your PDF documents and get instant AI-powered summaries. Our
          system will analyze and extract the key points from your document.
        </p>

        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Upload PDF</CardTitle>
            <CardDescription>
              Select your PDF file and click Summarize to generate a summary
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center w-full">
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                style={{ display: "none" }}
                disabled={loading}
              />
              <label htmlFor="file-upload">
                <span className="px-4 py-2 bg-secondary text-primary border border-primary rounded cursor-pointer hover:bg-secondary/80 disabled:opacity-60 inline-block shadow-sm transition-all font-bold">
                  {selectedFile ? "Change PDF" : "Upload PDF"}
                </span>
              </label>
              {selectedFile && (
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
                  <span className="text-sm text-foreground text-center">
                    {selectedFile.name}
                  </span>
                  <button
                    className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90 disabled:opacity-60 mt-2 sm:mt-0"
                    onClick={handleSummarize}
                    disabled={loading}
                  >
                    {loading ? "Summarizing..." : "Summarize"}
                  </button>
                </div>
              )}
              {loading && !selectedFile && (
                <div className="mt-4 text-center text-primary">
                  Generating summary...
                </div>
              )}
              {/* Display summary in a textarea if available */}
              {summary && !loading && (
                <div className="mt-8 w-full flex flex-col items-center">
                  <label
                    htmlFor="summary"
                    className="block mb-2 font-medium text-foreground text-center"
                  >
                    Generated Summary
                  </label>
                  <textarea
                    id="summary"
                    className="w-full min-h-[150px] p-3 rounded-md border border-border bg-card text-foreground resize-y"
                    value={summary}
                    readOnly
                  />
                  <div className="flex gap-4 mt-4">
                    <button
                      className="px-4 py-2 bg-secondary text-primary rounded hover:bg-secondary/80 border border-primary transition"
                      onClick={handleCopySummary}
                    >
                      Copy Summary
                    </button>
                    <button
                      className="px-4 py-2 bg-secondary text-primary rounded hover:bg-secondary/80 border border-primary transition"
                      onClick={handleDownloadSummary}
                    >
                      Download Summary
                    </button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-center">
            Why use our PDF Summarizer?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 bg-card rounded-lg shadow-sm text-center">
              <h3 className="font-medium mb-2">Save Time</h3>
              <p className="text-sm text-muted-foreground">
                Extract key information without reading the entire document.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg shadow-sm text-center">
              <h3 className="font-medium mb-2">AI Powered</h3>
              <p className="text-sm text-muted-foreground">
                Our advanced AI ensures high-quality accurate summaries.
              </p>
            </div>
            <div className="p-4 bg-card rounded-lg shadow-sm text-center">
              <h3 className="font-medium mb-2">Easy Sharing</h3>
              <p className="text-sm text-muted-foreground">
                Export and share summaries in various formats.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
