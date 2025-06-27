'use client';

import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { AIResponse } from '@/app/types';

type Props = {
  result: AIResponse;
};

export default function AIResponseCard({ result }: Props) {
  const Icon = result.personality.icon;
  const { score, supports, conflicts } = result.alignment;

  const getScoreIcon = () => {
    if (score > 0.7) return <CheckCircle className="text-green-500 mr-1" size={16} />;
    if (score > 0.3) return <AlertCircle className="text-yellow-500 mr-1" size={16} />;
    return <XCircle className="text-red-500 mr-1" size={16} />;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
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
            {getScoreIcon()}
            <span className="text-sm font-medium">{(score * 100).toFixed(0)}%</span>
          </div>
        </div>
        {!!supports.length && <div className="text-xs text-green-600 mb-1">✓ Supports: {supports.join(', ')}</div>}
        {!!conflicts.length && <div className="text-xs text-red-600">⚠ {conflicts.join(', ')}</div>}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-800 leading-relaxed">{result.response}</p>
      </div>
    </div>
  );
}
