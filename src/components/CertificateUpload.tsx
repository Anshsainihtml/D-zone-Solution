"use client";

import { useState } from "react";
import { UploadCloud, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

interface CertificateUploadProps {
  certificateId: string;
  onUploadComplete?: () => void;
}

export default function CertificateUpload({
  certificateId,
  onUploadComplete,
}: CertificateUploadProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSavingToDb, setIsSavingToDb] = useState(false);

  const handleFileUpload = async (file: File) => {
    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    if (file.size > 16 * 1024 * 1024) {
      setError("File size must be less than 16MB");
      return;
    }

    setIsUploading(true);
    setError(null);
    setSuccess(false);
    setFileName(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Upload to uploadthing via our API route
      const uploadResponse = await fetch("/api/uploadthing", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = await uploadResponse.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Upload failed with status ${uploadResponse.status}`
        );
      }

      const uploadData = await uploadResponse.json();
      const fileUrl = uploadData.files?.[0]?.url || uploadData.url;

      if (!fileUrl) {
        throw new Error("No URL returned from upload service");
      }

      // Save to database
      setIsSavingToDb(true);
      const dbResponse = await fetch(
        `/api/admin/certificates/upload/${certificateId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ certificateUrl: fileUrl }),
        }
      );

      if (!dbResponse.ok) {
        throw new Error("Failed to save certificate URL to database");
      }

      setSuccess(true);
      setFileName(file.name);
      onUploadComplete?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      setIsSavingToDb(false);
    }
  };

  const isLoading = isUploading || isSavingToDb;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <label className="relative cursor-pointer">
        <div
          className={`flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-8 transition ${
            !isLoading
              ? "hover:border-blue-400 hover:bg-blue-100 cursor-pointer"
              : "opacity-60 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          ) : (
            <UploadCloud className="h-8 w-8 text-blue-600" />
          )}
          <div className="text-center">
            <p className="font-semibold text-gray-900">
              {isLoading
                ? "Processing..."
                : "Click to upload PDF certificate"}
            </p>
            <p className="text-sm text-gray-600">
              {isUploading
                ? "Uploading to Uploadthing..."
                : isSavingToDb
                  ? "Saving to database..."
                  : "Max file size: 16MB"}
            </p>
          </div>
        </div>
        <input
          type="file"
          accept=".pdf"
          onChange={handleChange}
          disabled={isLoading}
          className="hidden"
        />
      </label>

      {error && (
        <div className="flex items-center gap-3 rounded-lg bg-red-50 p-4 text-red-700">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4 text-green-700">
          <CheckCircle className="h-5 w-5 flex-shrink-0" />
          <span>{fileName} uploaded successfully!</span>
        </div>
      )}
    </div>
  );
}
