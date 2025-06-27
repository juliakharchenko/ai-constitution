import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { AIResponse as AIResponseType } from '../types';
import { getIconComponent } from '../lib/utils';

interface AIResponseProps {
  response: AIResponseType;
}

export const AIResponse: React.FC<AIResponseProps> = ({ response }) => {
  const Icon = getIconComponent(response.personality.icon);
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-lg ${response.personality.color} mr-3`}>
          <Icon size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {response.personality.name}
          </h3>
          <p className="text-sm text-gray-600">
            {response.personality.description}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-gray-700 mr-2">
            Constitutional Alignment:
          </span>
          <div className="flex items-center">
            {response.alignment.score > 0.7 ? (
              <CheckCircle className="text-green-500 mr-1" size={16} />
            ) : response.alignment.score > 0.3 ? (
              <AlertCircle className="text-yellow-500 mr-1" size={16} />
            ) : (
              <XCircle className="text-red-500 mr-1" size={16} />
            )}
            <span className="text-sm font-medium">
              {(response.alignment.score * 100).toFixed(0)}%
            </span>
          </div>
        </div>
        
        {response.alignment.supports.length > 0 && (
          <div className="text-xs text-green-600 mb-1">
            ✓ Supports: {response.alignment.supports.join(', ')}
          </div>
        )}
        
        {response.alignment.conflicts.length > 0 && (
          <div className="text-xs text-red-600">
            ⚠ {response.alignment.conflicts.join(', ')}
          </div>
        )}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <p className="text-sm text-gray-800 leading-relaxed">
          {response.response}
        </p>
      </div>
    </div>
  );
};