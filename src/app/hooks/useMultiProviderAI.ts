'use client';
import { useState, useCallback } from 'react';
import { aiService } from '../services/aiService';
import type { AIProvider, AIModel, APIKeyConfig, SelectedModel, AIResponse, Personality } from '../types/ai';
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
  generateSingleResponse: (prompt: string, modelId: string, providerId: string) => Promise<string>;
  getSelectedModels: () => { provider: AIProvider; model: AIModel; id: string }[];
  getConfiguredProviders: () => AIProvider[];
  getSelectedModelCount: () => number;
  isConfigured: () => boolean;
  getProviderName: (providerId: string, modelId: string) => string;
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
    // Update aiService to handle array-based selectedModels
    aiService.setSelectedModels(newSelectedModels);
  }, []);

  const addCustomModel = useCallback(async (providerId: string, modelId: string): Promise<boolean> => {
    if (providerId !== 'huggingface') {
      setError('Custom models are only supported for Hugging Face');
      return false;
    }

    // Validate model ID format (user/model)
    const isValid = modelId.includes('/');
    if (!isValid) {
      setError('Invalid model ID format');
      return false;
    }

    // Check if model already exists
    const provider = providers.find((p) => p.id === providerId);
    if (provider?.models.some((m) => m.id === modelId)) {
      setError('Model already exists');
      return false;
    }

    try {
      // Update providers with new model
      setProviders((prev) =>
        prev.map((provider) =>
          provider.id === providerId
            ? {
                ...provider,
                models: [
                  ...provider.models,
                  {
                    id: modelId,
                    name: modelId.split('/')[1], // Simplified name extraction
                    provider: providerId,
                    maxTokens: 2048, // Default value
                    supportsSystemPrompts: true, // Default value
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

      // Analyze alignment for each response
      const responsesWithAlignment = await Promise.all(
        results.map(async (result) => {
          const alignment = await aiService.analyzeAlignment(result.response, constitution);
          return {
            ...result,
            alignment,
          };
        })
      );

      setResponses(responsesWithAlignment);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const generateSingleResponse = useCallback(async (
    prompt: string,
    modelId: string
  ): Promise<string> => {
    // Find the provider and model for this modelId
    console.log("generating response");
    const selectedModel = selectedModels.find(model => model.id === modelId);
    if (!selectedModel) {
      throw new Error(`Model ${modelId} not found in selected models`);
    }
  
    const targetProvider = providers.find(p => p.id === selectedModel.providerId);
    const targetModel = targetProvider?.models.find(m => m.id === modelId);

    console.log(`target model = ${targetModel}, target provider = ${targetProvider}`);
  
    if (!targetProvider || !targetModel) {
      throw new Error(`Model ${modelId} not found or not selected, target provider: ${targetProvider?.id || 'none'}`);
    }
  
    const apiKey = apiKeys[targetProvider.id];
    if (!apiKey) {
      throw new Error(`No API key configured for ${targetProvider.name}`);
    }

    console.log("we are here");
    console.log(`target provider: ${targetProvider}`)
  
    // Call the appropriate provider method directly
    switch (targetProvider.id) {
      case 'openai':
        return callOpenAI(apiKey, modelId, prompt);
      case 'anthropic':
        return callAnthropic(apiKey, modelId, prompt);
      case 'google':
        return callGemini(apiKey, modelId, prompt);
      case 'huggingface':
        return callHuggingFace(apiKey, modelId, prompt);
      default:
        throw new Error(`Unsupported provider: ${targetProvider.id}`);
    }
  }, [apiKeys, selectedModels, providers]);


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
    generateSingleResponse,
    getSelectedModels,
    getConfiguredProviders,
    getSelectedModelCount,
    isConfigured,
    getProviderName,
  };
}

// Helper functions for direct API calls
async function callOpenAI(apiKey: string, modelId: string, prompt: string): Promise<string> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        { role: 'user', content: prompt }
      ],
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
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: modelId,
      max_tokens: 1024,
      messages: [
        { role: 'user', content: prompt }
      ],
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
  console.log("at gemini we test");
  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 1024,
      }
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Gemini API error: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  console.log(`data text: ${data.candidates[0].content.parts[0].text}`);
  return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
}

// async function callHuggingFace(
//   apiKey: string,
//   modelId: string,
//   prompt: string,
// ): Promise<string> {
//   const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
//     method: 'POST',
//     headers: {
//       'Authorization': `Bearer ${apiKey}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       inputs: prompt,
//       parameters: {
//         max_new_tokens: 512,
//         temperature: 0.7,
//         top_p: 0.9,
//         do_sample: true,
//       },
//     }),
//   });

//   if (!response.ok) {
//     const errorData = await response.json().catch(() => ({}));
//     throw new Error(`Hugging Face API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
//   }

//   const data = await response.json();

//   if (Array.isArray(data) && data[0]?.generated_text) {
//     return data[0].generated_text;
//   }

//   throw new Error('Unexpected response format from Hugging Face');
// }


// async function callHuggingFace( apiKey: string,
//    modelId: string,
//    prompt: string): Promise<string> {
//   console.log(`model id: ${modelId}`)
//   const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ inputs: prompt }),
//   });

//   if (!response.ok) {
//     throw new Error(`Hugging Face API error: ${response.statusText}`);
//   }

//   const data = await response.json();
//   return data[0]?.generated_text || 'No response generated.';
// }

export async function callHuggingFace(
  apiKey: string,
  modelId: string,
  prompt: string,
  maxTokens: number = 256 // Added maxTokens as an optional parameter
): Promise<string> {
  try {
    // Validate inputs
    if (!modelId || !prompt) {
      throw new Error('Model ID and prompt are required.');
    }

    if (!apiKey) {
      throw new Error('Hugging Face API key is not configured.');
    }

    // Initialize the InferenceClient with the provided API key
    const client = new InferenceClient(apiKey);

    // Prepare messages array for chatCompletion, assuming the prompt is a user message
    const messages = [
      {
        role: "user",
        content: prompt,
      },
    ];

    // Call the chatCompletion method using the InferenceClient
    const chatCompletion = await client.chatCompletion({
      model: modelId,
      messages: messages,
      parameters: {
        max_new_tokens: maxTokens,
        temperature: 0.7,
        top_p: 0.95,
        do_sample: true,
      },
    });

    // Extract the generated text from the response
    // The chatCompletion response structure is chatCompletion.choices[0].message.content
    if (!chatCompletion || !chatCompletion.choices || chatCompletion.choices.length === 0 || !chatCompletion.choices[0].message || !chatCompletion.choices[0].message.content) {
      throw new Error('Unexpected response format from Hugging Face chatCompletion.');
    }

    const generatedText = chatCompletion.choices[0].message.content;

    // The chatCompletion typically returns only the generated response,
    // so we don't need to slice the prompt length off.
    return generatedText;

  } catch (error: any) {
    console.error('Error generating with Hugging Face:', error);
    // Provide a more user-friendly error message
    return `Error: Failed to generate text using Hugging Face. Details: ${error.message || error}`;
  }
}