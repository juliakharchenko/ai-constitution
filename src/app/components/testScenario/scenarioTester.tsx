'use client';

import React from 'react';
import { Play } from 'lucide-react';

type Props = {
  testScenario: string;
  scenarios: string[];
  isGenerating: boolean;
  onChange: (val: string) => void;
  onTest: () => void;
};

export default function ScenarioTester({ testScenario, scenarios, isGenerating, onChange, onTest }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Choose a scenario or write your own:
      </label>
      <select
        value={scenarios.includes(testScenario) ? testScenario : ''}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg mb-3"
      >
        <option value="">Select a scenario...</option>
        {scenarios.map((s, i) => (
          <option key={i} value={s}>{s}</option>
        ))}
      </select>
      <textarea
        value={testScenario}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or describe your own ethical dilemma..."
        className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none mb-4"
      />
      <button
        onClick={onTest}
        disabled={!testScenario.trim() || isGenerating}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400"
      >
        {isGenerating ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Generating Responses...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <Play className="mr-2" size={20} />
            Test Constitution
          </div>
        )}
      </button>
    </div>
  );
}
