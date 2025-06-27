'use client';

import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

type Props = {
  constitution: string[];
  newPrinciple: string;
  onNewPrincipleChange: (val: string) => void;
  addPrinciple: () => void;
  removePrinciple: (index: number) => void;
};

export default function ConstitutionBuilder({ constitution, newPrinciple, onNewPrincipleChange, addPrinciple, removePrinciple }: Props) {
  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newPrinciple}
          onChange={(e) => onNewPrincipleChange(e.target.value)}
          placeholder="Add a new principle..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          onKeyPress={(e) => e.key === 'Enter' && addPrinciple()}
        />
        <button
          onClick={addPrinciple}
          className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {constitution.map((principle, index) => (
          <div key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
            <span className="flex-1 text-sm text-gray-800">{principle}</span>
            <button
              onClick={() => removePrinciple(index)}
              className="ml-2 text-red-500 hover:text-red-700"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
