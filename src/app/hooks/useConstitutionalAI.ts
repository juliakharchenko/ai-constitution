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
    removePrinciple
  };
};