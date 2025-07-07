'use client';

import React from 'react';

const dimensions = [
  {
    title: '🌐 Power Distance',
    description:
      'How much inequality in power is accepted in society. High: respect for hierarchy. Low: equality and accessibility.',
    color: 'text-blue-700',
  },
  {
    title: '👤 Individualism vs Collectivism',
    description:
      'Do people prioritize individual goals or group harmony? High: personal achievement. Low: collective well-being.',
    color: 'text-green-700',
  },
  {
    title: '⚖️ Motivation towards Achievement and Success',
    description:
      'Does society value achievement or care? High: assertiveness. Low: empathy and quality of life.',
    color: 'text-pink-700',
  },
  {
    title: '🌀 Uncertainty Avoidance',
    description:
      'How comfortable are people with ambiguity? High: rules and structure. Low: flexibility and spontaneity.',
    color: 'text-yellow-700',
  },
  {
    title: '📆 Long-term Orientation',
    description:
      'Focus on future or tradition? High: planning and pragmatism. Low: respect for heritage and present focus.',
    color: 'text-purple-700',
  },
  {
    title: '🎉 Indulgence vs Restraint',
    description:
      'Attitudes toward pleasure and control. High: free expression. Low: discipline and restraint.',
    color: 'text-red-700',
  },
];

export function HelpSection() {
  return (
    <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        {"Hofstede's Cultural Dimensions"}
      </h3>
      <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-sm">
        {/* Split into two columns */}
        {Array.from({ length: 2 }).map((_, colIndex) => (
          <div key={colIndex} className="space-y-6">
            {dimensions
              .filter((_, i) => i % 2 === colIndex)
              .map((dim, idx) => (
                <div
                  key={idx}
                  className="p-5 border rounded-lg hover:shadow-md transition duration-300"
                >
                  <h4 className={`font-semibold text-lg ${dim.color} mb-1`}>{dim.title}</h4>
                  <p>{dim.description}</p>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
