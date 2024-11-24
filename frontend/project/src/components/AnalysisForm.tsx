import React, { useState } from 'react';
import { FileUpload } from './FileUpload';

interface AnalysisFormProps {
  onSubmit: (data: FormData) => void;
  isLoading: boolean;
  errorMessage?: string; // Optional error message to display
}

export function AnalysisForm({ onSubmit, isLoading, errorMessage }: AnalysisFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [columns, setColumns] = useState('');
  const [productKey, setProductKey] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!file) {
      setValidationError('Please upload a file.');
      return;
    }
    if (!columns.match(/^(\d+,)*\d+$/)) {
      setValidationError('Columns must be a comma-separated list of numbers.');
      return;
    }
    if (!productKey.trim()) {
      setValidationError('Product key cannot be empty.');
      return;
    }

    setValidationError(null); // Clear previous validation errors

    // Prepare form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('columns', columns);
    // formData.append('productKey', productKey);
    formData.append("productName", productKey);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Excel File</label>
        <FileUpload onFileSelect={(file) => setFile(file)} />
        {file && <p className="text-sm text-gray-400">Selected file: {file.name}</p>}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Columns to Extract</label>
        <input
          type="text"
          value={columns}
          onChange={(e) => setColumns(e.target.value)}
          placeholder="e.g., 1,2,3"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">Product Name</label>
        <input
          type="text"
          value={productKey}
          onChange={(e) => setProductKey(e.target.value)}
          placeholder="Enter product key"
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        />
      </div>

      {validationError && <p className="text-sm text-red-500">{validationError}</p>}
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}

      <button
        type="submit"
        disabled={!file || !columns || !productKey || isLoading}
        className="w-full py-3 px-4 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Product'}
      </button>
    </form>
  );
}
