'use client';
import React from 'react';
import { Scale } from 'lucide-react';

interface TrustCalculatorProps {
  alignmentScore: number;
  safetyScore: number;
  weights: { alignment: number; safety: number };
  onWeightChange: (dimension: 'alignment' | 'safety', value: number) => void;
  trustTemplate: string;
  setTrustTemplate: (template: string) => void;
  useTrustTemplate: boolean;
  setUseTrustTemplate: (use: boolean) => void;
  safetyDimensions: Record<string, { score: number; passes: string[]; concerns: string[] }>;
  customCriteria: { name: string; minAlignment?: number; minSafety?: number; requiredDimensions?: string[] }[];
  setCustomCriteria: React.Dispatch<React.SetStateAction<{ name: string; minAlignment?: number; minSafety?: number; requiredDimensions?: string[] }[]>>;
}

const TrustCalculator: React.FC<TrustCalculatorProps> = ({
  alignmentScore,
  safetyScore,
  weights,
  onWeightChange,
}) => {
  const trustScore = (alignmentScore * weights.alignment + safetyScore * weights.safety) / 100;

  const getTrustLevel = (score: number) => {
    if (score >= 0.8) return { level: 'High', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 0.6) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Low', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const trustLevel = getTrustLevel(trustScore);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Scale className="mr-2 text-indigo-600" />
        Trust Assessment
      </h3>
      
      <div className="space-y-4">
        {/* Weight Controls */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alignment Weight: {weights.alignment}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={weights.alignment}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onWeightChange('alignment', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Safety Weight: {weights.safety}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={weights.safety}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onWeightChange('safety', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        {/* Trust Score Display */}
        <div className={`p-4 rounded-lg ${trustLevel.bg}`}>
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Trust Score</span>
            <span className={`text-2xl font-bold ${trustLevel.color}`}>
              {(trustScore * 100).toFixed(1)}%
            </span>
          </div>
          <div className="mt-2">
            <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${trustLevel.bg} ${trustLevel.color}`}>
              {trustLevel.level} Trust
            </span>
          </div>
        </div>

        {/* Component Breakdown */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span>Alignment Score:</span>
            <span className="font-medium">{(alignmentScore * 100).toFixed(1)}%</span>
          </div>
          <div className="flex justify-between">
            <span>Safety Score:</span>
            <span className="font-medium">{(safetyScore * 100).toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TrustCalculator };