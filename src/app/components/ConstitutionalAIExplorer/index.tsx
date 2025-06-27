'use client';

import React, { useState, useCallback } from 'react';
import { AIResponse } from '../../types';
import { ConstitutionModeSelector } from './ConstitutionModeSelector';
import { ConstitutionBuilder } from '../ConstitutionBuilder';
import { TestScenario } from '../TestScenario';
import { ResponseResults } from './ResponseResults';
import { HelpSection } from './HelpSection';
import { useConstitutionalAI } from '@/app/hooks/useConstitutionalAI';
import { useQuestionnaire } from '../../hooks/useQuestionnaire';
import { useResponseGeneration } from '../../hooks/useResponseGeneration';

export default function ConstitutionalAIExplorer() {
  const [testScenario, setTestScenario] = useState('');
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const constitutionHook = useConstitutionalAI();
  const questionnaireHook = useQuestionnaire();
  const { generateResponses } = useResponseGeneration();

  const testConstitution = useCallback(async () => {
    if (!testScenario.trim() || constitutionHook.constitution.length === 0) return;

    setIsGenerating(true);
    setResponses([]);

    const newResponses = await generateResponses(
      testScenario,
      constitutionHook.constitution,
      setResponses
    );

    setIsGenerating(false);
  }, [testScenario, constitutionHook.constitution, generateResponses]);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Constitutional AI Explorer</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Define your own set of principles using templates, cultural dimensions, or a questionnaire.
          See how different AI systems might respond when guided by those values.
        </p>
      </div>

      <ConstitutionModeSelector
        constitutionMode={constitutionHook.constitutionMode}
        setConstitutionMode={constitutionHook.setConstitutionMode}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <ConstitutionBuilder
          constitutionHook={constitutionHook}
          questionnaireHook={questionnaireHook}
        />

        <TestScenario
          testScenario={testScenario}
          setTestScenario={setTestScenario}
          onTest={testConstitution}
          isGenerating={isGenerating}
          constitutionLength={constitutionHook.constitution.length}
        />
      </div>

      {responses.length > 0 && <ResponseResults responses={responses} />}

      <HelpSection />
    </div>
  );
}