'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import { useConstitutionalAI } from './hooks/useConstitutionalAI';
import { HelpSection } from './components/help/HelpSection';
import { ConstitutionModeSelector } from './components/selector/ConstitutionModeSelector';
import { ConstitutionBuilder } from './components/constitution/ConstitutionBuilder';
import { TestScenario } from './components/testScenario/TestScenario';
import { ResponseResults } from './components/results/ResponseResults';
import { useTestScenario } from './hooks/useTestScenario';

export default function ConstitutionalAIExplorer() {
  const constitutionalAI = useConstitutionalAI();
  const testScenario = useTestScenario(constitutionalAI.constitution);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Constitutional AI Explorer</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Define your own set of principles using templates, cultural dimensions, or a questionnaire.
          See how different AI systems might respond when guided by those values.
        </p>
      </div>

      {/* Constitution Mode Selector */}
      <ConstitutionModeSelector
        constitutionMode={constitutionalAI.constitutionMode}
        setConstitutionMode={constitutionalAI.setConstitutionMode}
      />

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Constitution Builder */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <BookOpen className="mr-2 text-indigo-600" />
            Your AI Constitution
          </h2>
          
          <ConstitutionBuilder {...constitutionalAI} />
        </div>

        {/* Test Scenario */}
        <TestScenario
          {...testScenario}
          constitutionLength={constitutionalAI.constitution.length}
        />
      </div>

      {/* Results */}
      <ResponseResults responses={testScenario.responses} />

      {/* Help Section */}
      <HelpSection />
    </div>
  );
}