'use client';
import { useState, useCallback } from 'react';
import { aiService } from '../services/aiService';
import type { AIProvider, AIModel, APIKeyConfig, SelectedModel, AIResponse, Personality, AnalysisReport } from '../types/ai';
import { InferenceClient } from "@huggingface/inference";

interface MultiProviderAI {
  providers: AIProvider[];
  apiKeys: APIKeyConfig;
  selectedModels: SelectedModel[];
  responses: AIResponse[];
  isLoading: boolean;
  error: string | null;
  updateAPIKeys: (apiKeys: APIKeyConfig) => void;
  updateSelectedModels: (models: SelectedModel[]) => void;
  addCustomModel: (providerId: string, modelId: string) => Promise<boolean>;
  generateResponses: (personality: Personality, constitution: string[], scenario: string) => Promise<void>;
  generateResponse: (personality: Personality, constitution: string[], scenario: string) => Promise<AIResponse[]>;
  generateSingleResponse: (prompt: string, modelId: string, providerId: string) => Promise<string>;
  analyzeAlignment: (
    response: string,
    constitution: string[],
    principles: { value: string; weight: number }[],
    frameworks: { framework: string; weight: number }[]
  ) => Promise<AnalysisReport>;
  getSelectedModels: () => { provider: AIProvider; model: AIModel; id: string }[];
  getConfiguredProviders: () => AIProvider[];
  getSelectedModelCount: () => number;
  isConfigured: () => boolean;
  getProviderName: (providerId: string) => string;
}

export function useMultiProviderAI(): MultiProviderAI {
  const [providers, setProviders] = useState<AIProvider[]>(aiService.getAvailableProviders());
  const [apiKeys, setApiKeys] = useState<APIKeyConfig>({});
  const [selectedModels, setSelectedModels] = useState<SelectedModel[]>([]);
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateAPIKeys = useCallback((newApiKeys: APIKeyConfig) => {
    setApiKeys(newApiKeys);
    aiService.setAPIKeys(newApiKeys);
  }, []);

  const updateSelectedModels = useCallback((newSelectedModels: SelectedModel[]) => {
    setSelectedModels(newSelectedModels);
    aiService.setSelectedModels(newSelectedModels);
  }, []);

  const addCustomModel = useCallback(async (providerId: string, modelId: string): Promise<boolean> => {
    if (providerId !== 'huggingface') {
      setError('Custom models are only supported for Hugging Face');
      return false;
    }

    const isValid = modelId.includes('/');
    if (!isValid) {
      setError('Invalid model ID format');
      return false;
    }

    const provider = providers.find((p) => p.id === providerId);
    if (provider?.models.some((m) => m.id === modelId)) {
      setError('Model already exists');
      return false;
    }

    try {
      setProviders((prev) =>
        prev.map((provider) =>
          provider.id === providerId
            ? {
                ...provider,
                models: [
                  ...provider.models,
                  {
                    id: modelId,
                    name: modelId.split('/')[1],
                    provider: providerId,
                    maxTokens: 2048,
                    supportsSystemPrompts: true,
                  },
                ],
              }
            : provider
        )
      );
      return true;
    } catch {
      setError('Failed to add custom model');
      return false;
    }
  }, [providers]);

  const generateResponses = useCallback(async (
    personality: Personality,
    constitution: string[],
    scenario: string
  ) => {
    setIsLoading(true);
    setError(null);
    setResponses([]);

    try {
      const results = await aiService.generateResponse(personality, constitution, scenario);
      setResponses(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateResponse = useCallback(async (
    personality: Personality,
    constitution: string[],
    scenario: string
  ): Promise<AIResponse[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await aiService.generateResponse(personality, constitution, scenario);
      setResponses(results);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateSingleResponse = useCallback(async (
    prompt: string,
    modelId: string,
    providerId: string
  ): Promise<string> => {
    const selectedModel = selectedModels.find(model => model.id === modelId && model.providerId === providerId);
    if (!selectedModel) {
      throw new Error(`Model ${modelId} not found in selected models`);
    }

    const targetProvider = providers.find(p => p.id === providerId);
    const targetModel = targetProvider?.models.find(m => m.id === modelId);

    if (!targetProvider || !targetModel) {
      throw new Error(`Model ${modelId} not found or not selected`);
    }

    const apiKey = apiKeys[providerId];
    if (!apiKey) {
      throw new Error(`No API key configured for ${targetProvider.name}`);
    }

    switch (providerId) {
      case 'openai':
        return callOpenAI(apiKey, modelId, prompt);
      case 'anthropic':
        return callAnthropic(apiKey, modelId, prompt);
      case 'google':
        return callGemini(apiKey, modelId, prompt);
      case 'huggingface':
        return callHuggingFace(apiKey, modelId, prompt);
      default:
        throw new Error(`Unsupported provider: ${providerId}`);
    }
  }, [apiKeys, selectedModels, providers]);

  const analyzeAlignment = useCallback(async (
    response: string,
    constitution: string[],
    principles: { value: string; weight: number }[],
    frameworks: { framework: string; weight: number }[]
  ): Promise<AnalysisReport> => {
    try {
      return await aiService.analyzeAlignment(response, constitution, principles, frameworks);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      return {
        summary: 'Error occurred during analysis',
        adherenceAnalysis: [],
        nonAdherenceAnalysis: [{ item: 'General', description: 'Error occurred during analysis' }],
        alignmentScore: 0,
        recommendations: [],
      };
    }
  }, []);

  const getSelectedModels = useCallback(() => {
    const results: { provider: AIProvider; model: AIModel; id: string }[] = [];

    selectedModels.forEach(({ providerId, id: modelId }) => {
      const provider = providers.find((p) => p.id === providerId);
      const model = provider?.models.find((m) => m.id === modelId);

      if (provider && model && apiKeys[providerId]) {
        results.push({ provider, model, id: modelId });
      }
    });

    return results;
  }, [selectedModels, providers, apiKeys]);

  const getConfiguredProviders = useCallback(() => {
    return providers.filter((provider) =>
      apiKeys[provider.id] && apiKeys[provider.id].trim() !== ''
    );
  }, [providers, apiKeys]);

  const getSelectedModelCount = useCallback(() => {
    return selectedModels.length;
  }, [selectedModels]);

  const isConfigured = useCallback(() => {
    return getConfiguredProviders().length > 0 && getSelectedModelCount() > 0;
  }, [getConfiguredProviders, getSelectedModelCount]);

  const getProviderName = useCallback((providerId: string) => {
    const provider = providers.find((p) => p.id === providerId);
    return provider ? provider.name : 'Unknown Provider';
  }, [providers]);

  return {
    providers,
    apiKeys,
    selectedModels,
    responses,
    isLoading,
    error,
    updateAPIKeys,
    updateSelectedModels,
    addCustomModel,
    generateResponses,
    generateResponse,
    generateSingleResponse,
    analyzeAlignment,
    getSelectedModels,
    getConfiguredProviders,
    getSelectedModelCount,
    isConfigured,
    getProviderName,
  };
}

async function callOpenAI(apiKey: string, modelId: string, prompt: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: modelId,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.choices[0]?.message?.content || 'No response generated';
}

async function callAnthropic(apiKey: string, modelId: string, prompt: string): Promise<string> {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: modelId,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Anthropic API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.content[0]?.text || 'No response generated';
}

async function callGemini(apiKey: string, modelId: string, prompt: string): Promise<string> {
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
}

async function callHuggingFace(apiKey: string, modelId: string, prompt: string): Promise<string> {
  const client = new InferenceClient(apiKey);
  const chatCompletion = await client.chatCompletion({
    model: modelId,
    messages: [{ role: 'user', content: prompt }],
    parameters: {
      max_new_tokens: 256,
      temperature: 0.7,
      top_p: 0.95,
      do_sample: true,
    },
  });

  if (!chatCompletion.choices?.[0]?.message?.content) {
    throw new Error('Unexpected response format from Hugging Face chatCompletion.');
  }

  return chatCompletion.choices[0].message.content;
}