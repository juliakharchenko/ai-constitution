// import { useState, useEffect } from 'react';
// import { aiService } from '../services/aiService';
// import { AIProvider, APIKeyConfig, SelectedModels, AIResponse } from '../types/ai';

// export const useMultiProviderAI = () => {
//   const [providers] = useState<AIProvider[]>(aiService.getAvailableProviders());
//   const [apiKeys, setApiKeys] = useState<APIKeyConfig>({});
//   const [selectedModels, setSelectedModels] = useState<SelectedModels>({});
//   const [responses, setResponses] = useState<AIResponse[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   // Update the service when configuration changes
//   useEffect(() => {
//     aiService.setAPIKeys(apiKeys);
//     aiService.setSelectedModels(selectedModels);
//   }, [apiKeys, selectedModels]);

//   const updateAPIKeys = (newApiKeys: APIKeyConfig) => {
//     setApiKeys(newApiKeys);
//   };

//   const updateSelectedModels = (newSelectedModels: SelectedModels) => {
//     setSelectedModels(newSelectedModels);
//   };

//   const generateResponses = async (
//     personality: any,
//     constitution: string[],
//     scenario: string
//   ) => {
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const results = await aiService.generateResponse(personality, constitution, scenario);
//       setResponses(results);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'An error occurred');
//       setResponses([]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const getConfiguredProviders = () => {
//     return providers.filter(provider => 
//       apiKeys[provider.id] && apiKeys[provider.id].trim() !== ''
//     );
//   };

//   const getSelectedModelCount = () => {
//     return Object.keys(selectedModels).length;
//   };

//   const isConfigured = () => {
//     return getConfiguredProviders().length > 0 && getSelectedModelCount() > 0;
//   };

//   return {
//     providers,
//     apiKeys,
//     selectedModels,
//     responses,
//     isLoading,
//     error,
//     updateAPIKeys,
//     updateSelectedModels,
//     generateResponses,
//     getConfiguredProviders,
//     getSelectedModelCount,
//     isConfigured,
//   };
// };
import { useState, useCallback, useRef } from 'react';
// import { aiService } from '../services/MultiProviderAIService';
import { aiService } from '../services/aiService';
import type { 
  AIProvider, 
  AIModel, 
  APIKeyConfig, 
  SelectedModels, 
  AIResponse,
  Personality 
} from '../types/ai';

export function useMultiProviderAI() {
  const [providers] = useState<AIProvider[]>(aiService.getAvailableProviders());
  const [apiKeys, setApiKeys] = useState<APIKeyConfig>({});
  const [selectedModels, setSelectedModels] = useState<SelectedModels>({});
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const updateAPIKeys = useCallback((newApiKeys: APIKeyConfig) => {
    setApiKeys(newApiKeys);
    aiService.setAPIKeys(newApiKeys);
  }, []);

  const updateSelectedModels = useCallback((newSelectedModels: SelectedModels) => {
    setSelectedModels(newSelectedModels);
    aiService.setSelectedModels(newSelectedModels);
  }, []);

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
            alignment
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
    const selectedModelEntries = Object.entries(selectedModels);
    let targetProvider: AIProvider | undefined;
    let targetModel: AIModel | undefined;

    for (const [providerId, selectedModelId] of selectedModelEntries) {
      if (selectedModelId === modelId) {
        targetProvider = providers.find(p => p.id === providerId);
        targetModel = targetProvider?.models.find(m => m.id === modelId);
        break;
      }
    }

    if (!targetProvider || !targetModel) {
      throw new Error(`Model ${modelId} not found or not selected`);
    }

    const apiKey = apiKeys[targetProvider.id];
    if (!apiKey) {
      throw new Error(`No API key configured for ${targetProvider.name}`);
    }

    // Call the appropriate provider method directly
    switch (targetProvider.id) {
      case 'openai':
        return callOpenAI(apiKey, modelId, prompt);
      case 'anthropic':
        return callAnthropic(apiKey, modelId, prompt);
      case 'google':
        return callGemini(apiKey, modelId, prompt);
      case 'huggingface':
        return callHuggingFace(apiKey, modelId, prompt, targetModel.supportsSystemPrompts);
      default:
        throw new Error(`Unsupported provider: ${targetProvider.id}`);
    }
  }, [apiKeys, selectedModels, providers]);

  const getSelectedModels = useCallback(() => {
    const results: { provider: AIProvider; model: AIModel; id: string }[] = [];
    
    Object.entries(selectedModels).forEach(([providerId, modelId]) => {
      const provider = providers.find(p => p.id === providerId);
      const model = provider?.models.find(m => m.id === modelId);
      
      if (provider && model && apiKeys[providerId]) {
        results.push({ provider, model, id: modelId });
      }
    });
    
    return results;
  }, [selectedModels, providers, apiKeys]);

  const getConfiguredProviders = useCallback(() => {
    return providers.filter(provider => 
      apiKeys[provider.id] && apiKeys[provider.id].trim() !== ''
    );
  }, [providers, apiKeys]);

  const getSelectedModelCount = useCallback(() => {
    return Object.keys(selectedModels).length;
  }, [selectedModels]);

  const isConfigured = useCallback(() => {
    return getConfiguredProviders().length > 0 && getSelectedModelCount() > 0;
  }, [getConfiguredProviders, getSelectedModelCount]);

  return {
    providers,
    apiKeys,
    selectedModels,
    responses,
    isLoading,
    error,
    updateAPIKeys,
    updateSelectedModels,
    generateResponses,
    generateSingleResponse,
    getSelectedModels,
    getConfiguredProviders,
    getSelectedModelCount,
    isConfigured
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
  // Note: You'll need to import GoogleGenerativeAI if using this
  // For now, using fetch approach
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
  return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
}

async function callHuggingFace(
  apiKey: string, 
  modelId: string, 
  prompt: string,
  supportsSystemPrompts?: boolean
): Promise<string> {
  const response = await fetch(`https://api-inference.huggingface.co/models/${modelId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: prompt,
      parameters: {
        max_new_tokens: 512,
        temperature: 0.7,
        top_p: 0.9,
        do_sample: true,
      },
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Hugging Face API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
  }

  const data = await response.json();
  
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text;
  }
  
  throw new Error('Unexpected response format from Hugging Face');
}