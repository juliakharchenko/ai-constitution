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
  
  export interface Personality {
    name: string;
    description: string;
    traits?: string;
  }
  
  export interface AlignmentAnalysis {
    score: number;
    supports: string[];
    conflicts: string[];
  }