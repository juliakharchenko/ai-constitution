import React from 'react';
import { Plus } from 'lucide-react';
import { constitutionTemplates } from '../lib/constitutionTemplates';

interface TemplateBuilderProps {
  selectedTemplate?: string;
  newPrinciple?: string;
  setNewPrinciple?: (value: string) => void;
  addPrinciple?: () => void;
  loadTemplate?: (key: string) => void;
}

export function TemplateBuilder({
  selectedTemplate,
  newPrinciple,
  setNewPrinciple,
  addPrinciple,
  loadTemplate
}: TemplateBuilderProps) {
  return (
    <>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Start from a template:
        </label>
        <select
          value={selectedTemplate}
          onChange={(e) => loadTemplate?.(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {Object.entries(constitutionTemplates).map(([key, template]) => (
            <option key={key} value={key}>{template.name}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newPrinciple}
          onChange={(e) => setNewPrinciple?.(e.target.value)}
          placeholder="Add a new principle..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          onKeyPress={(e) => e.key === 'Enter' && addPrinciple?.()}
        />
        <button
          onClick={addPrinciple}
          className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>
    </>
  );
}