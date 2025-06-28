import React from 'react';
import { HofstedeDimensions } from '@/app/types';

type DimensionLabel = {
  name: string;
  low: string;
  high: string;
};

type Props = {
  hofstedeDimensions: HofstedeDimensions;
  dimensionLabels: Record<string, DimensionLabel>;
};

export function CulturalProfileSummary({ hofstedeDimensions, dimensionLabels }: Props) {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-gray-700 mb-2">Your Cultural Profile</h4>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {Object.entries(dimensionLabels).map(([key, label]) => {
          const value = hofstedeDimensions[key as keyof HofstedeDimensions];
          const isHigh = value > 60;
          const isLow = value < 40;
          return (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600">{label.name}:</span>
              <span className={`font-medium ${isHigh ? 'text-blue-600' : isLow ? 'text-green-600' : 'text-gray-700'}`}>
                {isHigh ? label.high : isLow ? label.low : 'Balanced'} ({value})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

