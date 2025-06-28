import { useState, useCallback } from 'react';
import { AIResponse } from '../types';
import { aiPersonalities } from '../lib/aiPersonalities';
import { testScenarios } from '../data/testScenarios';
import { generateResponse, analyzeAlignment } from '../lib/responseGenerator';

export function useTestScenario(constitution: string[]) {
  const [testScenario, setTestScenario] = useState('');
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const testConstitution = useCallback(async () => {
    if (!testScenario.trim() || constitution.length === 0) return;

    setIsGenerating(true);
    setResponses([]);

    const newResponses: AIResponse[] = [];

    for (let i = 0; i < aiPersonalities.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));

      const personality = aiPersonalities[i];
      const response = generateResponse(personality, constitution, testScenario);
      const alignment = analyzeAlignment(response, constitution);

      newResponses.push({
        personality,
        response,
        alignment
      });

      setResponses([...newResponses]);
    }

    setIsGenerating(false);
  }, [testScenario, constitution]);

  return {
    testScenario,
    setTestScenario,
    responses,
    isGenerating,
    testConstitution,
    testScenarios
  };
}