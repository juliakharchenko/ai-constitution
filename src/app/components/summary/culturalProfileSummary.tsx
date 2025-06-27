'use client';

import React from 'react';
import { HofstedeDimensions } from '@/app/types';

type Props = {
  dimensions: HofstedeDimensions;
};

const labels = {
  powerDistance: ['Power Distance', 'Egalitarian', 'Hierarchical'],
  individualismCollectivism: ['Individualism vs Collectivism', 'Collectivist', 'Individualist'],
  masculinityFemininity: ['Masculinity vs Femininity', 'Feminine', 'Masculine'],
  uncertaintyAvoidance: ['Uncertainty Avoidance', 'Risk-tolerant', 'Risk-averse'],
  longTermOrientation: ['Long-term Orientation', 'Traditional', 'Pragmatic'],
  indulgenceRestraint: ['Indulgence vs Restraint', 'Restrained', 'Indulgent']
};

export default function CulturalProfileSummary({ dimensions }: Props) {
  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium text-gray-700 mb-2">Your Cultural Profile</h4>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {Object.entries(dimensions).map(([key, value]) => {
          const [name, low, high] = labels[key as keyof HofstedeDimensions];
          const label = value > 60 ? high : value < 40 ? low : 'Balanced';
          const color = value > 60 ? 'text-blue-600' : value < 40 ? 'text-green-600' : 'text-gray-700';
          return (
            <div key={key} className="flex justify-between">
              <span className="text-gray-600">{name}:</span>
              <span className={`font-medium ${color}`}>{label} ({value})</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
