'use client';

import React from 'react';
import { BookOpen, Sliders, HelpCircle } from 'lucide-react';

type Props = {
  mode: string;
  setMode: (mode: 'template' | 'hofstede' | 'questionnaire' | 'freewrite') => void;
};

export default function ConstitutionModeSelector({ mode, setMode }: Props) {
  const modes = [
    {
      key: 'template',
      icon: BookOpen,
      title: 'Templates & Custom',
      desc: 'Start from ethical frameworks or build your own'
    },
    {
      key: 'hofstede',
      icon: Sliders,
      title: 'Cultural Dimensions',
      desc: "Use sliders based on Hofstede's research"
    },
    {
      key: 'questionnaire',
      icon: HelpCircle,
      title: 'Questionnaire',
      desc: 'Answer questions to auto-generate values'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {modes.map(({ key, icon: Icon, title, desc }) => (
        <button
          key={key}
          onClick={() => setMode(key as any)}
          className={`p-4 rounded-lg border-2 transition-all ${mode === key ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
        >
          <Icon className="mx-auto mb-2 text-indigo-600" size={24} />
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{desc}</p>
        </button>
      ))}
    </div>
  );
}
