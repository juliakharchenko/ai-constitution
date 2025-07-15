import React, { useState } from 'react';
import { Settings, ArrowRight, ArrowLeft } from 'lucide-react';
import { APIKeyManager } from '../apiKeys/APIKeyManager';
import { ModelSelector } from '../models/ModelSelector';
import { AIProvider, APIKeyConfig, SelectedModels } from '../../types/ai';

interface SetupWizardProps {
  providers: AIProvider[];
  apiKeys: APIKeyConfig;
  selectedModels: SelectedModels;
  onUpdateAPIKeys: (apiKeys: APIKeyConfig) => void;
  onUpdateSelectedModels: (models: SelectedModels) => void;
  onClose: () => void;
}

export const SetupWizard: React.FC<SetupWizardProps> = ({
  providers,
  apiKeys,
  selectedModels,
  onUpdateAPIKeys,
  onUpdateSelectedModels,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps = [
    {
      title: 'Configure API Keys',
      description: 'Add your API keys for the AI providers you want to use',
      component: (
        <APIKeyManager
          providers={providers}
          apiKeys={apiKeys}
          onUpdateAPIKeys={onUpdateAPIKeys}
        />
      )
    },
    {
      title: 'Select Models',
      description: 'Choose which models to test with your constitutional AI setup',
      component: (
        <ModelSelector
          providers={providers}
          apiKeys={apiKeys}
          selectedModels={selectedModels}
          onUpdateSelectedModels={onUpdateSelectedModels}
        />
      )
    }
  ];

  const canProceed = () => {
    if (currentStep === 0) {
      // Can proceed from API keys step if at least one valid key is configured
      return Object.values(apiKeys).some(key => key && key.trim() !== '');
    }
    if (currentStep === 1) {
      // Can proceed from model selection if at least one model is selected
      return Object.keys(selectedModels).length > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Settings className="w-6 h-6 text-indigo-600 mr-2" />
              <h2 className="text-2xl font-bold text-gray-800">AI Setup Wizard</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ×
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Step {currentStep + 1} of {steps.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {steps[currentStep].title}
            </h3>
            <p className="text-gray-600">
              {steps[currentStep].description}
            </p>
          </div>

          {steps[currentStep].component}
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-md ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center px-4 py-2 rounded-md ${
              !canProceed()
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};