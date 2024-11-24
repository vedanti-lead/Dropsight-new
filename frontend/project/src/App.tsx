import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';
import { AnalysisForm } from './components/AnalysisForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { analyzeProduct } from './services/api';
import type { AnalysisResult, Product } from './types';

function App() {
  // State management
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles the analysis form submission
   * @param formData - The form data containing file, columns, and product name
   */
  const handleAnalysis = async (formData: FormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { result, product } = await analyzeProduct(formData); // Backend API call
      setSelectedProduct(product);
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Analysis failed');
      console.error('Analysis failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart2 className="w-10 h-10 text-red-500" />
            <h1 className="text-4xl font-bold">DropSight</h1>
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Upload your product data and leverage advanced analytics to predict success probabilities
            and discover market insights.
          </p>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Analysis Form Section */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-6">Analysis Parameters</h2>
            <AnalysisForm onSubmit={handleAnalysis} isLoading={isLoading} />
            {error && (
              <div className="mt-4 p-4 bg-red-900/50 border border-red-500/50 rounded-lg text-red-200">
                {error}
              </div>
            )}
          </div>

          {/* Results Display Section */}
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-6">Analysis Results</h2>
            {result && selectedProduct ? (
              <ResultsDisplay
                probability={result.probability}
                similarProducts={result.similarProducts}
                selectedProduct={selectedProduct}
              />
            ) : (
              <div className="text-center text-gray-400 py-12">
                <BarChart2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Upload your data to see analysis results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
