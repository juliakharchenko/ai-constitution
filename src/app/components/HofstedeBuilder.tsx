'use client';

import React from 'react';
import { HofstedeDimensions } from '../types';
import { dimensionLabels } from '../lib/hofstedeHelpers';

interface HofstedeBuilderProps {
  hofstedeDimensions: HofstedeDimensions;
  updateHofstedeDimension: (dimension: keyof HofstedeDimensions, value: number) => void;
}

export function HofstedeBuilder({
  hofstedeDimensions,
  updateHofstedeDimension,
}: HofstedeBuilderProps) {
  return (
    <div className="mb-6">
      <p className="text-sm text-gray-600 mb-4">
        Adjust the sliders to reflect your cultural values. The constitution will be automatically generated based on your settings.
      </p>
      {Object.entries(dimensionLabels).map(([key, label]) => (
        <div key={key} className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-700">
              {label.name}
            </label>
            <span className="text-sm text-gray-500">
              {hofstedeDimensions[key as keyof HofstedeDimensions]}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500">{label.low}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={hofstedeDimensions[key as keyof HofstedeDimensions]}
              onChange={(e) =>
                updateHofstedeDimension(
                  key as keyof HofstedeDimensions,
                  parseInt(e.target.value)
                )
              }
              className="flex-1"
            />
            <span className="text-xs text-gray-500">{label.high}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
