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
      name: 'Google Gemini',
      requiresApiKey: true,
      apiKeyPlaceholder: 'AIza...',
      setupInstructions: 'Get your API key from https://makersuite.google.com/app/apikey',
      models: [
        {
          id: 'gemini-1.5-flash',
          name: 'Gemini 1.5 Flash',
          provider: 'google',
          maxTokens: 1024,
          supportsSystemPrompts: true
        },
        {
          id: 'gemini-1.5-pro',
          name: 'Gemini 1.5 Pro',
          provider: 'google',
          maxTokens: 2048,
          supportsSystemPrompts: true
        }
      ]
    },
    {
      id: 'huggingface',
      name: 'Hugging Face',
      requiresApiKey: true,
      apiKeyPlaceholder: 'hf_...',
      setupInstructions: 'Get your API key from https://huggingface.co/settings/tokens',
      models: [
        {
          id: 'microsoft/DialoGPT-large',
          name: 'DialoGPT Large',
          provider: 'huggingface',
          maxTokens: 1024,
          supportsSystemPrompts: false
        },
        {
          id: 'google/flan-t5-large',
          name: 'Flan-T5 Large',
          provider: 'huggingface',
          maxTokens: 512,
          supportsSystemPrompts: false
        },
        {
          id: 'meta-llama/Llama-2-7b-chat-hf',
          name: 'Llama 2 7B Chat',
          provider: 'huggingface',
          maxTokens: 2048,
          supportsSystemPrompts: true
        }
      ]
    }
  ];