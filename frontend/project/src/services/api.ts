import type { AnalysisResult, Product } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

export async function analyzeProduct(formData: FormData): Promise<{
  result: AnalysisResult;
  product: Product;
}> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10-second timeout

  try {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
      method: 'POST',
      body: formData,
      signal: controller.signal, // Handle timeout with AbortController
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Analysis failed');
    }

    // Validate JSON response
    const data = await response.json();
    if (!data.result || !data.product) {
      throw new Error('Invalid response format from server');
    }

    return data;
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again later.');
    } else if (error instanceof Error) {
      // Handle other errors that are of type `Error`
      throw error;
    } else {
      // Handle unknown error types
      console.error('Unknown error occurred:', error);
      throw new Error('An unknown error occurred. Please try again.');
    }
  }
}
