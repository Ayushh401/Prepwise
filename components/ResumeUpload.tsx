"use client";

import { useState, useRef } from "react";
import { Upload, FileText, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { apiClient } from "@/lib/api-client";



interface ResumeUploadProps {
  userId: string;
  currentResumeName?: string;
}

const ResumeUpload = ({ userId, currentResumeName }: ResumeUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState(currentResumeName || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    setIsUploading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await apiClient.resume.scan(formData);


      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        setFileName(currentResumeName || "");
      }
    } catch (error) {
      toast.error("An unexpected error occurred during upload.");
      setFileName(currentResumeName || "");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div 
        onClick={() => !isUploading && fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-3xl p-8 transition-all cursor-pointer
          flex flex-col items-center justify-center gap-4 text-center
          ${isUploading ? 'border-primary-200/50 bg-primary-200/5' : 'border-border hover:border-primary-200/50 hover:bg-primary-200/5'}
        `}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".pdf" 
          className="hidden" 
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-primary-200 animate-spin" />
            <div>
                <p className="font-bold">Scanning Resume...</p>
                <p className="text-xs text-light-400">Our AI is reading your experience</p>
            </div>
          </div>
        ) : fileName ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-success-100/10 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-success-100" />
            </div>
            <div>
                <p className="font-bold text-white uppercase text-xs tracking-widest mb-1">Current Resume</p>
                <p className="text-primary-100 font-medium">{fileName}</p>
                <p className="text-xs text-light-400 mt-2 hover:text-primary-200">Click to update</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary-200/10 flex items-center justify-center">
                <Upload className="w-6 h-6 text-primary-200" />
            </div>
            <div>
                <p className="font-bold">Upload Your Resume</p>
                <p className="text-xs text-light-400">PDF files only (Max 5MB)</p>
            </div>
            <p className="text-xs text-primary-200 mt-2 font-medium">Click to select file</p>
          </div>
        )}
      </div>

      {fileName && !isUploading && (
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-200/50 border border-border/50">
            <AlertCircle className="w-4 h-4 text-primary-200" />
            <p className="text-xs text-light-100">Interviews will now be tailored to your resume content.</p>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
