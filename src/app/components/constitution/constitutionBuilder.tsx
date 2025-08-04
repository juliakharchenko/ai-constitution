'use client';

import React, { useState } from 'react';
import { constitutionTemplates } from '@/app/lib/constitutionTemplates';
import { TemplateBuilder } from '../template/TemplateBuilder';
import { HofstedeBuilder } from '../hofstede/HofstedeBuilder';
import { QuestionnaireBuilder } from '../questionnaire/QuestionnaireBuilder';
import { PrinciplesList } from '../principles/PrinciplesList';
import { CulturalProfileSummary } from '../summary/culturalProfileSummary';
import { HofstedeDimensions, ConstitutionMode } from '@/app/types';
import { PredefinedValue } from '@/app/types/ai';

interface ConstitutionBuilderProps {
  constitution: string[];
  constitutionMode: ConstitutionMode;
  setConstitution: (constitution: string[]) => void;
  setConstitutionMode: (mode: ConstitutionMode) => void; // Add this
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  hofstedeDimensions: HofstedeDimensions;
  setHofstedeDimensions: (dimensions: HofstedeDimensions) => void;
  updateHofstedeDimension: (dimension: keyof HofstedeDimensions, value: number) => void;
  predefinedValues: PredefinedValue[];
  removePrinciple: (index: number) => void;
}

export function ConstitutionBuilder({
  constitution,
  setConstitution,
  constitutionMode,
  selectedTemplate,
  setSelectedTemplate,
  hofstedeDimensions,
  setHofstedeDimensions,
  updateHofstedeDimension,
  removePrinciple
}: ConstitutionBuilderProps) {
  const [newPrinciple, setNewPrinciple] = useState('');

  const addPrinciple = () => {
    if (newPrinciple.trim()) {
      setConstitution([...constitution, newPrinciple.trim()]);
      setNewPrinciple('');
    }
  };

  const loadTemplate = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    if (templateKey !== 'custom') {
      setConstitution([
        ...constitutionTemplates[templateKey as keyof typeof constitutionTemplates].principles
      ]);
    }
  };

  const dimensionLabels = {
    powerDistance: { name: 'Power Distance', low: 'Egalitarian', high: 'Hierarchical' },
    individualismCollectivism: { name: 'Individualism vs Collectivism', low: 'Collectivist', high: 'Individualist' },
    masculinityFemininity: { name: 'Motivation towards Achievement and Success (MAS)', low: 'Low MAS', high: 'High MAS' },
    uncertaintyAvoidance: { name: 'Uncertainty Avoidance', low: 'Risk-tolerant', high: 'Risk-averse' },
    longTermOrientation: { name: 'Long-term Orientation', low: 'Traditional', high: 'Pragmatic' },
    indulgenceRestraint: { name: 'Indulgence vs Restraint', low: 'Restrained', high: 'Indulgent' }
  };

  return (
    <>
      {/* Template Builder */}
      {constitutionMode === 'template' && (
        <TemplateBuilder
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          constitutionTemplates={constitutionTemplates}
          loadTemplate={loadTemplate}
          newPrinciple={newPrinciple}
          setNewPrinciple={setNewPrinciple}
          addPrinciple={addPrinciple}
        />
      )}

      {/* Freewrite Builder */}
      {constitutionMode === 'freewrite' && (
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Write your principles freely:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newPrinciple}
                onChange={(e) => setNewPrinciple(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addPrinciple()}
                placeholder="Enter a principle for your AI constitution..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                onClick={addPrinciple}
                disabled={!newPrinciple.trim()}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hofstede Builder */}
      {constitutionMode === 'hofstede' && (
        <HofstedeBuilder
          hofstedeDimensions={hofstedeDimensions}
          updateHofstedeDimension={updateHofstedeDimension}
        />
      )}

      {/* Questionnaire Builder */}
      {constitutionMode === 'questionnaire' && (
        <QuestionnaireBuilder
          setConstitution={setConstitution}
          setHofstedeDimensions={setHofstedeDimensions}
        />
      )}

      {/* Current Principles */}
      <PrinciplesList
        principles={constitution}
        canRemove={constitutionMode === 'template' || constitutionMode === 'freewrite'}
        onRemove={removePrinciple}
      />

      {/* Cultural Dimensions Summary */}
      {(constitutionMode === 'hofstede' || constitutionMode === 'questionnaire') && (
        <CulturalProfileSummary
          hofstedeDimensions={hofstedeDimensions}
          dimensionLabels={dimensionLabels}
        />
      )}
    </>
  );
}
