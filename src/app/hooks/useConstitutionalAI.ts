// import { useState, useCallback } from 'react';
// import { AIResponse } from '../types';
// import { aiPersonalities } from '../lib/aiPersonalities';
// import { generateResponse, analyzeAlignment } from '../lib/responseGenerator';

// export const useConstitutionalAI = () => {
//   const [constitution, setConstitution] = useState<string[]>([
//     "Be helpful and honest in all responses",
//     "Respect human autonomy and dignity",
//     "Avoid causing harm through advice or information"
//   ]);
//   const [newPrinciple, setNewPrinciple] = useState('');
//   const [testScenario, setTestScenario] = useState('');
//   const [responses, setResponses] = useState<AIResponse[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [selectedTemplate, setSelectedTemplate] = useState('custom');

//   const testConstitution = useCallback(async () => {
//     if (!testScenario.trim() || constitution.length === 0) return;
    
//     setIsGenerating(true);
//     setResponses([]);

//     const newResponses: AIResponse[] = [];
    
//     for (let i = 0; i < aiPersonalities.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       const personality = aiPersonalities[i];
//       const response = generateResponse(personality, constitution, testScenario);
//       const alignment = analyzeAlignment(response, constitution);
      
//       newResponses.push({
//         personality,
//         response,
//         alignment
//       });
      
//       setResponses([...newResponses]);
//     }
    
//     setIsGenerating(false);
//   }, [testScenario, constitution]);

//   return {
//     constitution,
//     setConstitution,
//     newPrinciple,
//     setNewPrinciple,
//     testScenario,
//     setTestScenario,
//     responses,
//     isGenerating,
//     selectedTemplate,
//     setSelectedTemplate,
//     testConstitution
//   };
// };
import { useState } from 'react';
import { HofstedeDimensions, ConstitutionMode } from '../types';
import { hofstedeToPrinciples } from '../lib/hofstedeHelpers';

export const useConstitutionalAI = () => {
  const [constitution, setConstitution] = useState<string[]>([
    "Be helpful and honest in all responses",
    "Respect human autonomy and dignity",
    "Avoid causing harm through advice or information"
  ]);
  
  const [constitutionMode, setConstitutionMode] = useState<ConstitutionMode>('template');
  const [selectedTemplate, setSelectedTemplate] = useState('custom');
  
  const [hofstedeDimensions, setHofstedeDimensions] = useState<HofstedeDimensions>({
    powerDistance: 50,
    individualismCollectivism: 50,
    masculinityFemininity: 50,
    uncertaintyAvoidance: 50,
    longTermOrientation: 50,
    indulgenceRestraint: 50
  });

  const updateHofstedeDimension = (dimension: keyof HofstedeDimensions, value: number) => {
    const newDimensions = { ...hofstedeDimensions, [dimension]: value };
    setHofstedeDimensions(newDimensions);
    if (constitutionMode === 'hofstede') {
      setConstitution(hofstedeToPrinciples(newDimensions));
    }
  };

  const addPrinciple = (principle: string) => {
    if (principle.trim()) {
      setConstitution([...constitution, principle.trim()]);
    }
  };

  const removePrinciple = (index: number) => {
    setConstitution(constitution.filter((_, i) => i !== index));
  };

  return {
    constitution,
    setConstitution,
    constitutionMode,
    setConstitutionMode,
    selectedTemplate,
    setSelectedTemplate,
    hofstedeDimensions,
    setHofstedeDimensions,
    updateHofstedeDimension,
    addPrinciple,
    removePrinciple
  };
};