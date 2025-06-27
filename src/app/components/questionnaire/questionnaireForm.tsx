'use client';

import React from 'react';
import { QuestionnaireQuestion } from '@/app/types';

type Props = {
  questions: QuestionnaireQuestion[];
  answers: Record<string, number>;
  onAnswer: (id: string, value: number) => void;
};

export default function QuestionnaireForm({ questions, answers, onAnswer }: Props) {
  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {questions.map((question) => (
        <div key={question.id} className="border border-gray-200 rounded-lg p-4">
          <p className="text-sm font-medium text-gray-800 mb-3">{question.text}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Strongly Disagree</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  key={val}
                  onClick={() => onAnswer(question.id, val)}
                  className={`w-8 h-8 rounded-full border-2 text-sm ${answers[question.id] === val ? 'border-indigo-500 bg-indigo-500 text-white' : 'border-gray-300 hover:border-indigo-300'}`}
                >
                  {val}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-500">Strongly Agree</span>
          </div>
        </div>
      ))}
    </div>
  );
}
