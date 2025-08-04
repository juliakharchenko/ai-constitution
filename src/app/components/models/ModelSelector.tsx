'use client';
import React from 'react';
import { Bot, Cpu } from 'lucide-react';
import { AIProvider, APIKeyConfig, SelectedModel } from '../../types/ai';

interface ModelSelectorProps {
  providers: AIProvider[];
  apiKeys: APIKeyConfig;
  selectedModels: SelectedModel[] | { [providerId: string]: string };
  onUpdateSelectedModels: (models: SelectedModel[]) => void;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  providers,
  apiKeys,
  selectedModels,
  onUpdateSelectedModels,
}) => {
  // Convert selectedModels to array if it's a record
  const normalizedSelectedModels: SelectedModel[] = Array.isArray(selectedModels)
    ? selectedModels
    : Object.entries(selectedModels).map(([providerId, id]) => ({ providerId, id }));

  const availableProviders = providers.filter(
    (provider) => apiKeys[provider.id] && apiKeys[provider.id].trim() !== ''
  );

  const handleModelToggle = (providerId: string, modelId: string) => {
    const modelIndex = normalizedSelectedModels.findIndex(
      (m) => m.providerId === providerId && m.id === modelId
    );
    if (modelIndex >= 0) {
      // Deselect model
      const updatedModels = normalizedSelectedModels.filter((_, i) => i !== modelIndex);
      onUpdateSelectedModels(updatedModels);
    } else {
      // Select model
      onUpdateSelectedModels([...normalizedSelectedModels, { providerId, id: modelId }]);
    }
  };

  const selectedCount = normalizedSelectedModels.length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <Bot className="mr-2 text-indigo-600" />
        Model Selection
        {selectedCount > 0 && (
          <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
            {selectedCount} selected
          </span>
        )}
      </h2>

      {availableProviders.length === 0 ? (
        <div className="text-center py-8">
          <Cpu className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">
            No API keys configured. Please add API keys to select models.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {availableProviders.map((provider) => (
            <div key={provider.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium text-gray-800 flex items-center">
                  <Cpu className="w-5 h-5 mr-2 text-gray-600" />
                  {provider.name}
                </h3>
                <span className="text-sm text-gray-500">
                  {provider.models.length} models available
                </span>
              </div>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {provider.models.map((model) => (
                  <label key={model.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={normalizedSelectedModels.some(
                        (m) => m.providerId === provider.id && m.id === model.id
                      )}
                      onChange={() => handleModelToggle(provider.id, model.id)}
                      className="form-checkbox h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">
                      <div className="font-medium">{model.name}</div>
                      <div className="text-xs text-gray-500">
                        Max tokens: {model.maxTokens.toLocaleString()} | System prompts:{' '}
                        {model.supportsSystemPrompts ? 'Yes' : 'No'}
                      </div>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCount > 0 && (
        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            <strong>
              {selectedCount} model{selectedCount > 1 ? 's' : ''} selected
            </strong>{' '}
            — responses will be generated from all selected models for comparison.
          </p>
        </div>
      )}
    </div>
  );
};