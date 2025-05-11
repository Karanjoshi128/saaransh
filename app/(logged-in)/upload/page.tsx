'use client';

import React, { useState } from "react";
import { Upload, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { UploadButton } from "@/utils/uploadthing";

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        toast.error("Please select a PDF file.");
        return;
      }

      setFile(selectedFile);
      toast.success("PDF selected successfully!");
    }
  };

const handleUpload = async () => {
    if (!file) {
        toast.error("Please select a file first.");
        return;
    }

    setUploading(true);
    setProgress(0);

    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/uploadthing/pdfUploader", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Upload failed");
        }

        const data = await response.json();
        console.log("Upload response:", data);

        setProgress(100);
        toast.success("Upload completed successfully!");
    } catch (error) {
        console.error("Upload error:", error);
        toast.error("Upload failed. Please try again.");
    } finally {
        setUploading(false);
    }
};

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      if (droppedFile.type !== "application/pdf") {
        toast.error("Please drop a PDF file.");
        return;
      }

      setFile(droppedFile);
      toast.success("PDF dropped successfully!");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Upload Your PDF</h1>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Upload your PDF documents and get instant AI-powered summaries. Our system will analyze and extract the key points from your document.
        </p>
        <UploadButton
                endpoint="pdfUploader"
                onClientUploadComplete={(res) => {
                  // Do something with the response
                  console.log("Files: ", res);
                  alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  alert(`ERROR! ${error.message}`);
                }}
              />

        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Upload PDF</CardTitle>
            <CardDescription>
              Drag and drop your PDF file or click to browse
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div
              className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-colors ${
                uploading ? "bg-muted border-muted" : "border-primary/50 hover:border-primary bg-muted/50"
              }`}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {file ? (
                <div className="flex flex-col items-center gap-4">
                  <FileText size={48} className="text-primary" />
                  <div className="text-center">
                    <p className="font-medium text-lg">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4">
                  <Upload size={48} className="text-primary" />
                  <div className="text-center">
                    <p className="font-medium mb-1">Drag & Drop your PDF here</p>
                    <p className="text-sm text-muted-foreground">or click to browse files</p>
                  </div>
                </div>
              )}

              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={uploading}
              />
            </div>

            {uploading && (
              <div className="w-full mt-6" aria-live="polite">
                <div className="flex justify-between mb-2 text-sm">
                  <span>Uploading...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              className="px-8"
              onClick={handleUpload}
              disabled={!file || uploading}
            >
              {uploading ? "Uploading..." : "Upload PDF"}
            </Button>
          </CardFooter>
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