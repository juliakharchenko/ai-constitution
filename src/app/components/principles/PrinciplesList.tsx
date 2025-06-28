import React from 'react';
import { Trash2 } from 'lucide-react';

interface PrinciplesListProps {
  principles: string[];
  canRemove: boolean;
  onRemove?: (index: number) => void;
}

export function PrinciplesList({ principles, canRemove, onRemove }: PrinciplesListProps) {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-medium text-gray-700 mb-3">Current Principles ({principles.length})</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {principles.map((principle, index) => (
          <div key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
            <span className="flex-1 text-sm text-gray-800">{principle}</span>
            {canRemove && onRemove && (
              <button
                onClick={() => onRemove(index)}
                className="ml-2 text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}