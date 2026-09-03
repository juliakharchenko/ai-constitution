import { AIProvider } from "../types/ai";

export const AI_PROVIDERS: AIProvider[] = [
    {
      id: 'openai',
      name: 'OpenAI',
      requiresApiKey: true,
      apiKeyPlaceholder: 'sk-...',
      setupInstructions: 'Get your API key from https://platform.openai.com/api-keys',
      models: [
        {
          id: 'gpt-4',
          name: 'GPT-4',
          provider: 'openai',
          maxTokens: 8192,
          supportsSystemPrompts: true
        },
        {
          id: 'gpt-4-turbo',
          name: 'GPT-4 Turbo',
          provider: 'openai',
          maxTokens: 4096,
          supportsSystemPrompts: true
        },
        {
          id: 'gpt-3.5-turbo',
          name: 'GPT-3.5 Turbo',
          provider: 'openai',
          maxTokens: 4096,
          supportsSystemPrompts: true
        }
      ]
    },
    {
      id: 'anthropic',
      name: 'Anthropic',
      requiresApiKey: true,
      apiKeyPlaceholder: 'sk-ant-...',
      setupInstructions: 'Get your API key from https://console.anthropic.com/',
      models: [
        {
          id: 'claude-3-sonnet-20240229',
          name: 'Claude 3 Sonnet',
          provider: 'anthropic',
          maxTokens: 4096,
          supportsSystemPrompts: true
        },
        {
          id: 'claude-3-haiku-20240307',
          name: 'Claude 3 Haiku',
          provider: 'anthropic',
          maxTokens: 4096,
          supportsSystemPrompts: true
        }
      ]
    },
    {
      id: 'google',
      name: 'Google',
      models: [
        { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', provider: 'google', maxTokens: 8192, supportsSystemPrompts: true },
        { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', provider: 'google', maxTokens: 8192, supportsSystemPrompts: true },
        { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash', provider: 'google', maxTokens: 8192, supportsSystemPrompts: true },
        { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash', provider: 'google', maxTokens: 8192, supportsSystemPrompts: true },
        { id: 'gemini-3.7-flash', name: 'Gemini 3.7 Flash', provider: 'google', maxTokens: 8192, supportsSystemPrompts: true },
        { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', provider: 'google', maxTokens: 8192, supportsSystemPrompts: true },
      ],
    },
    {
      id: 'huggingface',
      name: 'Hugging Face',
      requiresApiKey: true,
      apiKeyPlaceholder: 'hf_...',
      setupInstructions: 'Get your API key from https://huggingface.co/settings/tokens',
      models: [
        {
          id: 'microsoft/Phi-3-mini-4k-instruct',
          name: 'Phi-3 Mini Instruct',
          provider: 'huggingface',
          maxTokens: 2048,
          supportsSystemPrompts: true
        },
        {
          id: 'HuggingFaceH4/zephyr-7b-beta',
          name: 'Zephyr 7B Beta',
          provider: 'huggingface',
          maxTokens: 2048,
          supportsSystemPrompts: true
        },
        {
          id: 'mistralai/Mistral-7B-Instruct-v0.2',
          name: 'Mistral 7B Instruct',
          provider: 'huggingface',
          maxTokens: 2048,
          supportsSystemPrompts: true
        }
      ]
    }
  ];