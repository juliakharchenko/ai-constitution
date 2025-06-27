import React from 'react';
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

interface AlignmentBadgeProps {
  score: number;
  supports: string[];
  conflicts: string[];
}

export const AlignmentBadge: React.FC<AlignmentBadgeProps> = ({ score, supports, conflicts }) => {
  const getIcon = () => {
    if (score > 0.7) return <CheckCircle className="text-green-500 mr-1" size={16} />;
    if (score > 0.3) return <AlertCircle className="text-yellow-500 mr-1" size={16} />;
    return <XCircle className="text-red-500 mr-1" size={16} />;
  };

  return (
    <div className="mb-4">
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium text-gray-700 mr-2">Constitutional Alignment:</span>
        <div className="flex items-center">
          {getIcon()}
          <span className="text-sm font-medium">
            {(score * 100).toFixed(0)}%
          </span>
        </div>
      </div>

      {supports.length > 0 && (
        <div className="text-xs text-green-600 mb-1">
          ✓ Supports: {supports.join(', ')}
        </div>
      )}

      {conflicts.length > 0 && (
        <div className="text-xs text-red-600">
          ⚠ {conflicts.join(', ')}
        </div>
      )}
    </div>
  );
};