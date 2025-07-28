import { ConstitutionMode } from ".";
import { HofstedeDimensions } from ".";
import { QuestionnaireQuestion } from ".";

export interface AIProvider {
    id: string;
    name: string;
    models: AIModel[];
    requiresApiKey: boolean;
    apiKeyPlaceholder: string;
    setupInstructions: string;
  }
  
  export interface AIModel {
    id: string;
    name: string;
    provider: string;
    maxTokens: number;
    supportsSystemPrompts: boolean;
  }
  
  export interface APIKeyConfig {
    [providerId: string]: string;
  }
  
  export interface SelectedModel {
    providerId: string;
    id: string;
  }
  
  export interface AIResponse {
    modelId: string;
    providerName: string;
    response: string;
    error?: string;
    processingTime: number;
  }

  // export interface PersonalityResponse {
  //   personality: Personality;
  //   alignment?: AlignmentAnalysis;
  //   safety?: {
  //     overallScore: number;
  //     dimensions: Record<string, { score: number; passes: string[]; concerns: string[] }>;
  //   } | null; // Allow null
  //   trust?: {
  //     score: number;
  //     weights: { alignment: number; safety: number };
  //     criteria?: { name: string; passed: boolean; details: string[]; explanation: string };
  //   } | null; // Allow null
  //   providerName: string;
  //   processingTime: number;
  //   response: string;
  // }

  export interface PredefinedValue {
    name: string;
    principles: string[];
  }

  export interface ConstitutionalAI {
    constitution: string[];
    constitutionMode: ConstitutionMode;
    selectedTemplate: string;
    hofstedeDimensions: HofstedeDimensions;
    predefinedValues: PredefinedValue[];
    setConstitution: (constitution: string[]) => void;
    setConstitutionMode: (mode: ConstitutionMode) => void;
    setSelectedTemplate: (template: string) => void;
    setHofstedeDimensions: (dimensions: HofstedeDimensions) => void;
    updateHofstedeDimension: (dimension: keyof HofstedeDimensions, value: number) => void;
    removePrinciple: (index: number) => void;
  }
  
  // export interface MultiProviderAI {
  //   providers: AIProvider[];
  //   apiKeys: APIKeyConfig;
  //   selectedModels: SelectedModel[];
  //   error?: string;
  //   isConfigured: () => boolean;
  //   getConfiguredProviders: () => AIProvider[];
  //   getSelectedModelCount: () => number;
  //   getSelectedModels: () => SelectedModel[];
  //   getProviderName: (providerId: string) => string;
  //   generateSingleResponse: (prompt: string, modelId: string, providerId: string) => Promise<string>;
  //   updateAPIKeys: (keys: APIKeyConfig) => void;
  //   updateSelectedModels: (models: SelectedModel[]) => void;
  //   addCustomModel: (model: AIModel) => void;
  // }

  export interface MultiProviderAI {
    providers: AIProvider[];
    apiKeys: APIKeyConfig;
    selectedModels: SelectedModel[];
    error?: string;
    isConfigured: () => boolean;
    getConfiguredProviders: () => AIProvider[];
    getSelectedModelCount: () => number;
    getSelectedModels: () => SelectedModel[];
    getProviderName: (providerId: string) => string;
    generateSingleResponse: (prompt: string, modelId: string, providerId: string) => Promise<string>;
    updateAPIKeys: (keys: APIKeyConfig) => void;
    updateSelectedModels: (models: SelectedModel[]) => void;
    addCustomModel: (providerId: string, modelId: string) => Promise<boolean>; // Update signature
  }

  export interface TrustTemplate {
    name: string;
    description: string;
    criteria: { name: string; minAlignment?: number; minSafety?: number; requiredDimensions?: string[] }[];
  }
  
  // export interface Personality {
  //   name: string;
  //   description: string;
  //   traits?: string;
  // }
  
  export interface AlignmentAnalysis {
    score: number;
    supports: string[];
    conflicts: string[];
  }

  export interface Personality {
    name: string;
    icon: React.ComponentType<any>;
    color: string;
    bias: string;
    description: string;
    traits?: string;
  }
  
  export interface PersonalityResponse {
    modelId: string;
    personality: Personality;
    alignment?: AlignmentAnalysis;
    safety?: {
      overallScore: number;
      dimensions: Record<string, { score: number; passes: string[]; concerns: string[] }>;
    } | null;
    trust?: {
      score: number;
      weights: { alignment: number; safety: number };
      criteria?: { name: string; passed: boolean; details: string[]; explanation: string };
    } | null;
    providerName: string;
    processingTime: number;
    response: string;
    error?: string
  }

  export interface QuestionnaireCategory {
    id: string;
    title: string;
    description: string;
    icon: string;
    questions: QuestionnaireQuestion[];
  }