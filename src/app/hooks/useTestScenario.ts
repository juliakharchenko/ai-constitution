// import { useState, useCallback } from 'react';
// import { AIResponse } from '../types';
// import { aiPersonalities } from '../lib/aiPersonalities';
// import { testScenarios } from '../data/testScenarios';
// import { generateResponse, analyzeAlignment } from '../lib/responseGenerator';

// export function useTestScenario(constitution: string[]) {
//   const [testScenario, setTestScenario] = useState('');
//   const [responses, setResponses] = useState<AIResponse[]>([]);
//   const [isGenerating, setIsGenerating] = useState(false);

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
//     testScenario,
//     setTestScenario,
//     responses,
//     isGenerating,
//     testConstitution,
//     testScenarios
//   };
// }

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
      // Add delay between requests to avoid rate limiting
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      try {
        const personality = aiPersonalities[i];
        
        // Generate response using Gemini API
        const response = await generateResponse(personality, constitution, testScenario);
        
        // Analyze alignment using Gemini API
        const alignment = await analyzeAlignment(response, constitution);

        const newResponse: AIResponse = {
          personality,
          response,
          alignment
        };

        newResponses.push(newResponse);
        
        // Update state with each new response as it comes in
        setResponses([...newResponses]);
        
      } catch (error) {
        console.error(`Failed to generate response for ${aiPersonalities[i].name}:`, error);
        
        // Add a fallback response for this personality
        newResponses.push({
          personality: aiPersonalities[i],
          response: "Sorry, I couldn't generate a response due to an error.",
          alignment: {
            score: 0,
            supports: [],
            conflicts: ['Failed to generate response']
          }
        });
        
        setResponses([...newResponses]);
      }
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