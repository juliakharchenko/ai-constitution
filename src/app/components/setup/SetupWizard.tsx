// 'use client';
// import React, { useState } from 'react';
// import { Settings, ArrowRight, ArrowLeft, AlertCircle, X } from 'lucide-react';
// import { APIKeyManager } from '../apiKeys/APIKeyManager';
// import { AIProvider, APIKeyConfig, SelectedModel } from '../../types/ai';

// interface SetupWizardProps {
//   providers: AIProvider[];
//   apiKeys: APIKeyConfig;
//   selectedModels: SelectedModel[] | { [providerId: string]: string }; // Support both types temporarily
//   onUpdateAPIKeys: (apiKeys: APIKeyConfig) => void;
//   onUpdateSelectedModels: (models: SelectedModel[]) => void;
//   onAddCustomModel: (providerId: string, modelId: string) => Promise<boolean>;
//   onClose: () => void;
// }

// export const SetupWizard: React.FC<SetupWizardProps> = ({
//   providers,
//   apiKeys,
//   selectedModels,
//   onUpdateAPIKeys,
//   onUpdateSelectedModels,
//   onAddCustomModel,
//   onClose,
// }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [modelSearch, setModelSearch] = useState<string>('');
//   const [searchError, setSearchError] = useState<string | null>(null);
//   const [isSearching, setIsSearching] = useState<boolean>(false);

//   // Convert selectedModels to array if it's a record
//   const normalizedSelectedModels: SelectedModel[] = Array.isArray(selectedModels)
//     ? selectedModels
//     : Object.entries(selectedModels).map(([providerId, id]) => ({ providerId, id }));

//   const validateHuggingFaceUrl = (url: string): string | null => {
//     const regex = /^https:\/\/huggingface\.co\/([\w-]+\/[\w-]+)/;
//     const match = url.match(regex);
//     return match ? match[1] : null;
//   };

//   const handleSearchModel = async () => {
//     if (!modelSearch.trim()) {
//       setSearchError('Please enter a model URL');
//       return;
//     }

//     const modelId = validateHuggingFaceUrl(modelSearch);
//     if (!modelId) {
//       setSearchError('Invalid Hugging Face model URL. Use format: https://huggingface.co/<user>/<model>');
//       return;
//     }

//     setIsSearching(true);
//     setSearchError(null);

//     try {
//       const success = await onAddCustomModel('huggingface', modelId);
//       if (success) {
//         setModelSearch('');
//       } else {
//         setSearchError('Failed to add model. Please check the URL or API key.');
//       }
//     } catch (error) {
//       setSearchError('Error adding model. Please try again.');
//       console.error('Error adding custom model:', error);
//     } finally {
//       setIsSearching(false);
//     }
//   };

//   const handleModelToggle = (providerId: string, modelId: string) => {
//     const modelIndex = normalizedSelectedModels.findIndex(
//       (m) => m.providerId === providerId && m.id === modelId
//     );
//     if (modelIndex >= 0) {
//       // Deselect model
//       const updatedModels = normalizedSelectedModels.filter((_, i) => i !== modelIndex);
//       onUpdateSelectedModels(updatedModels);
//     } else {
//       // Select model
//       onUpdateSelectedModels([...normalizedSelectedModels, { providerId, id: modelId }]);
//     }
//   };

//   const steps = [
//     {
//       title: 'Configure API Keys',
//       description: 'Add your API keys for the AI providers you want to use',
//       component: (
//         <APIKeyManager
//           providers={providers}
//           apiKeys={apiKeys}
//           onUpdateAPIKeys={onUpdateAPIKeys}
//         />
//       ),
//     },
//     {
//       title: 'Select Models',
//       description: 'Choose which models to test with your constitutional AI setup (e.g., Flan, Llama)',
//       component: (
//         <div>
//           <div className="space-y-6">
//             {providers.map((provider) => (
//               <div key={provider.id} className="border rounded-lg p-4">
//                 <h3 className="text-lg font-medium text-gray-800 mb-2">{provider.name}</h3>
//                 {provider.models.length > 0 ? (
//                   <div className="space-y-2 max-h-40 overflow-y-auto">
//                     {provider.models.map((model) => (
//                       <label key={model.id} className="flex items-center space-x-2">
//                         <input
//                           type="checkbox"
//                           checked={normalizedSelectedModels.some(
//                             (m) => m.providerId === provider.id && m.id === model.id
//                           )}
//                           onChange={() => handleModelToggle(provider.id, model.id)}
//                           disabled={!apiKeys[provider.id]}
//                           className="form-checkbox h-5 w-5 text-indigo-600 disabled:opacity-50"
//                         />
//                         <span className="text-sm text-gray-700">{model.name}</span>
//                       </label>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-500">
//                     No models available. {provider.id === 'huggingface' ? 'Add a model using the URL below.' : 'Configure an API key to load models.'}
//                   </p>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="mt-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Add Hugging Face Model by URL
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={modelSearch}
//                 onChange={(e) => setModelSearch(e.target.value)}
//                 placeholder="e.g., https://huggingface.co/google/flan-t5-base or https://huggingface.co/meta-llama/Llama-3-8b"
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
//               />
//               <button
//                 onClick={handleSearchModel}
//                 disabled={isSearching || !modelSearch.trim()}
//                 className={`px-4 py-2 rounded-md ${
//                   isSearching || !modelSearch.trim()
//                     ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                     : 'bg-indigo-600 text-white hover:bg-indigo-700'
//                 }`}
//               >
//                 {isSearching ? 'Searching...' : 'Add Model'}
//               </button>
//             </div>
//             {searchError && (
//               <div className="mt-2 flex items-center text-red-600 text-sm">
//                 <AlertCircle className="w-4 h-4 mr-2" />
//                 {searchError}
//               </div>
//             )}
//           </div>
//         </div>
//       ),
//     },
//   ];

//   const canProceed = () => {
//     if (currentStep === 0) {
//       // Can proceed from API keys step if at least one valid key is configured
//       return Object.values(apiKeys).some((key) => key && key.trim() !== '');
//     }
//     if (currentStep === 1) {
//       // Can proceed from model selection if at least one model is selected
//       return normalizedSelectedModels.length > 0;
//     }
//     return true;
//   };

//   const handleNext = () => {
//     if (currentStep < steps.length - 1) {
//       setCurrentStep(currentStep + 1);
//     } else {
//       onClose();
//     }
//   };

//   const handlePrevious = () => {
//     if (currentStep > 0) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6 border-b border-gray-200">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center">
//               <Settings className="w-6 h-6 text-indigo-600 mr-2" />
//               <h2 className="text-2xl font-bold text-gray-800">AI Setup Wizard</h2>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           {/* Progress indicator */}
//           <div className="mt-4">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm text-gray-600">
//                 Step {currentStep + 1} of {steps.length}
//               </span>
//               <span className="text-sm text-gray-600">
//                 {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
//               </span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="p-6">
//           <div className="mb-6">
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">
//               {steps[currentStep].title}
//             </h3>
//             <p className="text-gray-600">
//               {steps[currentStep].description}
//             </p>
//           </div>

//           {steps[currentStep].component}
//         </div>

//         <div className="p-6 border-t border-gray-200 flex justify-between">
//           <button
//             onClick={handlePrevious}
//             disabled={currentStep === 0}
//             className={`flex items-center px-4 py-2 rounded-md ${
//               currentStep === 0
//                 ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             <ArrowLeft className="w-4 h-4 mr-2" />
//             Previous
//           </button>

//           <button
//             onClick={handleNext}
//             disabled={!canProceed()}
//             className={`flex items-center px-4 py-2 rounded-md ${
//               !canProceed()
//                 ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
//                 : 'bg-indigo-600 text-white hover:bg-indigo-700'
//             }`}
//           >
//             {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
//             <ArrowRight className="w-4 h-4 ml-2" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };




'use client';
import React, { useState } from 'react';
import { Settings, ArrowRight, ArrowLeft, AlertCircle, X } from 'lucide-react';
import { APIKeyManager } from '../apiKeys/APIKeyManager';
import { ModelSelector } from '../models/ModelSelector';
import { AIProvider, APIKeyConfig, SelectedModel } from '../../types/ai';

interface SetupWizardProps {
  providers: AIProvider[];
  apiKeys: APIKeyConfig;
  selectedModels: SelectedModel[] | { [providerId: string]: string };
  onUpdateAPIKeys: (apiKeys: APIKeyConfig) => void;
  onUpdateSelectedModels: (models: SelectedModel[]) => void;
  onAddCustomModel?: (providerId: string, modelId: string) => Promise<boolean>;
  onClose: () => void;
}

export const SetupWizard: React.FC<SetupWizardProps> = ({
  providers,
  apiKeys,
  selectedModels,
  onUpdateAPIKeys,
  onUpdateSelectedModels,
  onAddCustomModel,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [modelSearch, setModelSearch] = useState<string>('');
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Convert selectedModels to array if it's a record
  const normalizedSelectedModels: SelectedModel[] = Array.isArray(selectedModels)
    ? selectedModels
    : Object.entries(selectedModels).map(([providerId, id]) => ({ providerId, id }));

  const validateHuggingFaceUrl = (url: string): string | null => {
    const regex = /^https:\/\/huggingface\.co\/([\w-]+\/[\w-]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSearchModel = async () => {
    if (!onAddCustomModel) {
      setSearchError('Custom model addition is not supported.');
      return;
    }

    if (!modelSearch.trim()) {
      setSearchError('Please enter a model URL');
      return;
    }

    const modelId = validateHuggingFaceUrl(modelSearch);
    if (!modelId) {
      setSearchError('Invalid Hugging Face model URL. Use format: https://huggingface.co/<user>/<model>');
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const success = await onAddCustomModel('huggingface', modelId);
      if (success) {
        setModelSearch('');
      } else {
        setSearchError('Failed to add model. Please check the URL or API key.');
      }
    } catch (error) {
      setSearchError('Error adding model. Please try again.');
      console.error('Error adding custom model:', error);
    } finally {
      setIsSearching(false);
    }
  };

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
      ),
    },
    {
      title: 'Select Models',
      description: 'Choose which models to test with your constitutional AI setup (e.g., Flan, Llama)',
      component: (
        <div>
          <ModelSelector
            providers={providers}
            apiKeys={apiKeys}
            selectedModels={normalizedSelectedModels}
            onUpdateSelectedModels={onUpdateSelectedModels}
          />
          {onAddCustomModel && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Add Hugging Face Model by URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  placeholder="e.g., https://huggingface.co/google/flan-t5-base or https://huggingface.co/meta-llama/Llama-3-8b"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  disabled={isSearching}
                />
                <button
                  onClick={handleSearchModel}
                  disabled={isSearching || !modelSearch.trim()}
                  className={`px-4 py-2 rounded-md ${
                    isSearching || !modelSearch.trim()
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {isSearching ? 'Searching...' : 'Add Model'}
                </button>
              </div>
              {searchError && (
                <div className="mt-2 flex items-center text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {searchError}
                </div>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  const canProceed = () => {
    if (currentStep === 0) {
      return Object.values(apiKeys).some((key) => key && key.trim() !== '');
    }
    if (currentStep === 1) {
      return normalizedSelectedModels.length > 0;
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
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
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
