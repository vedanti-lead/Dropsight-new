import React from 'react';
import { BarChart, TrendingUp, IndianRupee, Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';

interface ResultsDisplayProps {
  probability: number;
  similarProducts: Product[];
  selectedProduct: Product;
}

export function ResultsDisplay({ probability, similarProducts, selectedProduct }: ResultsDisplayProps) {
  return (
    <div className="space-y-8">
      {/* Probability Display */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-red-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-200">Success Probability</h3>
          <TrendingUp className="text-red-500 w-6 h-6" />
        </div>
        <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="absolute h-full bg-red-500 transition-all duration-1000 ease-out"
            style={{ width: `${probability * 100}%` }}
          />
        </div>
        <p className="mt-2 text-2xl font-bold text-red-500">
          {(probability * 100).toFixed(1)}%
        </p>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <IndianRupee className="text-red-500 w-5 h-5" />
            <h4 className="text-gray-300">Price</h4>
          </div>
          <p className="text-xl font-semibold text-white">₹{selectedProduct.price.toFixed(2)}</p>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-red-500 w-5 h-5" />
            <h4 className="text-gray-300">Reviews</h4>
          </div>
          <p className="text-xl font-semibold text-white">{selectedProduct.reviews}</p>
        </div>
        <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingCart className="text-red-500 w-5 h-5" />
            <h4 className="text-gray-300">Sales</h4>
          </div>
          <p className="text-xl font-semibold text-white">{selectedProduct.sales}</p>
        </div>
      </div>

      {/* Similar Products */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-red-500/20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-200">Similar Products</h3>
          <BarChart className="text-red-500 w-6 h-6" />
        </div>
        <div className="space-y-4">
          {similarProducts.map((product, index) => (
            <div
              key={product.key}
              className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
            >
              <div>
                <h4 className="text-gray-200 font-medium">{product.key}</h4>
                <p className="text-sm text-gray-400">
                  ₹{product.price.toFixed(2)} • {product.reviews} reviews
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-red-500">
                  {(product.similarity! * 100).toFixed(1)}% match
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}