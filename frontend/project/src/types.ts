export interface Product {
  key: string;
  reviews: number;
  price: number;
  sales: number;
  probability?: number;
  similarity?: number;
}

export interface AnalysisResult {
  probability: number;
  similarProducts: Product[];
}
