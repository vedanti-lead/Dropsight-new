import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export function FileUpload({ onFileSelect }: FileUploadProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div
      className="border-2 border-dashed border-red-500/50 rounded-lg p-8 text-center cursor-pointer hover:border-red-500 transition-colors"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => document.getElementById('fileInput')?.click()}
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept=".xlsx,.xls"
        onChange={handleFileInput}
      />
      <Upload className="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p className="text-gray-300 text-lg">
        Drag and drop your Excel file here or click to browse
      </p>
      <p className="text-gray-500 text-sm mt-2">
        Supported formats: .xlsx, .xls
      </p>
    </div>
  );
}