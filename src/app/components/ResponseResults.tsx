import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { AIResponse } from '../types';

interface ResponseResultsProps {
  responses: AIResponse[];
}

export function ResponseResults({ responses }: ResponseResultsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        AI Responses Under Your Constitution
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {responses.map((result, index) => {
          const Icon = result.personality.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-lg ${result.personality.color} mr-3`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{result.personality.name}</h3>
                  <p className="text-sm text-gray-600">{result.personality.description}</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 mr-2">Constitutional Alignment:</span>
                  <div className="flex items-center">
                    {result.alignment.score > 0.7 ? (
                      <CheckCircle className="text-green-500 mr-1" size={16} />
                    ) : result.alignment.score > 0.3 ? (
                      <AlertCircle className="text-yellow-500 mr-1" size={16} />
                    ) : (
                      <XCircle className="text-red-500 mr-1" size={16} />
                    )}
                    <span className="text-sm font-medium">
                      {(result.alignment.score * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {result.alignment.supports.length > 0 && (
                  <div className="text-xs text-green-600 mb-1">
                    ✓ Supports: {result.alignment.supports.join(', ')}
                  </div>
                )}

                {result.alignment.conflicts.length > 0 && (
                  <div className="text-xs text-red-600">
                    ⚠ {result.alignment.conflicts.join(', ')}
                  </div>
                )}
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-800 leading-relaxed">{result.response}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}