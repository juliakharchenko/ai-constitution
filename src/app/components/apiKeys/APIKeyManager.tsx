import React, { useState } from 'react';
import { Key, Eye, EyeOff, Check, X, Info } from 'lucide-react';
import { AIProvider, APIKeyConfig } from '../../types/ai';

interface APIKeyManagerProps {
  providers: AIProvider[];
  apiKeys: APIKeyConfig;
  onUpdateAPIKeys: (apiKeys: APIKeyConfig) => void;
}

export const APIKeyManager: React.FC<APIKeyManagerProps> = ({
  providers,
  apiKeys,
  onUpdateAPIKeys,
}) => {
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
  const [tempKeys, setTempKeys] = useState<APIKeyConfig>(apiKeys);

  const toggleShowKey = (providerId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [providerId]: !prev[providerId]
    }));
  };

  const handleKeyChange = (providerId: string, value: string) => {
    setTempKeys(prev => ({
      ...prev,
      [providerId]: value
    }));
  };

  const handleSave = () => {
    onUpdateAPIKeys(tempKeys);
  };

  const isKeyValid = (providerId: string, key: string): boolean => {
    if (!key || key.trim() === '') return false;
    
    // Basic validation based on provider
    switch (providerId) {
      case 'openai':
        return key.startsWith('sk-');
      case 'anthropic':
        return key.startsWith('sk-ant-');
      case 'google':
        return key.startsWith('AIza');
      case 'huggingface':
        return key.startsWith('hf_');
      default:
        return key.length > 10;
    }
  };

  const hasChanges = JSON.stringify(tempKeys) !== JSON.stringify(apiKeys);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <Key className="mr-2 text-indigo-600" />
        API Key Configuration
      </h2>
      
      <div className="space-y-4">
        {providers.map((provider) => (
          <div key={provider.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                {provider.name}
              </label>
              <div className="flex items-center space-x-2">
                {tempKeys[provider.id] && isKeyValid(provider.id, tempKeys[provider.id]) ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : tempKeys[provider.id] && tempKeys[provider.id].trim() !== '' ? (
                  <X className="w-4 h-4 text-red-500" />
                ) : null}
              </div>
            </div>
            
            <div className="relative">
              <input
                type={showKeys[provider.id] ? 'text' : 'password'}
                value={tempKeys[provider.id] || ''}
                onChange={(e) => handleKeyChange(provider.id, e.target.value)}
                placeholder={provider.apiKeyPlaceholder}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => toggleShowKey(provider.id)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showKeys[provider.id] ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            
            <div className="mt-2 flex items-start space-x-2">
              <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">
                {provider.setupInstructions}
              </p>
            </div>
          </div>
        ))}
      </div>

      {hasChanges && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save API Keys
          </button>
        </div>
      )}
    </div>
  );
};