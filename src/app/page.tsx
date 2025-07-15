// 'use client';

// import React from 'react';
// import { BookOpen } from 'lucide-react';
// import { useConstitutionalAI } from './hooks/useConstitutionalAI';
// import { HelpSection } from './components/help/HelpSection';
// import { ConstitutionModeSelector } from './components/selector/ConstitutionModeSelector';
// import { ConstitutionBuilder } from './components/constitution/constitutionBuilder';
// import { TestScenario } from './components/testScenario/TestScenario';
// import { ResponseResults } from './components/results/ResponseResults';
// import { useTestScenario } from './hooks/useTestScenario';

// export default function ConstitutionalAIExplorer() {
//   const constitutionalAI = useConstitutionalAI();
//   const testScenario = useTestScenario(constitutionalAI.constitution);

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">Constitutional AI Explorer</h1>
//         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//           Define your own set of principles using templates, cultural dimensions, or a questionnaire.
//           See how different AI systems might respond when guided by those values.
//         </p>
//       </div>

//       {/* Constitution Mode Selector */}
//       <ConstitutionModeSelector
//         constitutionMode={constitutionalAI.constitutionMode}
//         setConstitutionMode={constitutionalAI.setConstitutionMode}
//       />

//       <div className="grid lg:grid-cols-2 gap-8">
//         {/* Constitution Builder */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//             <BookOpen className="mr-2 text-indigo-600" />
//             Your AI Constitution
//           </h2>
          
//           <ConstitutionBuilder {...constitutionalAI} />
//         </div>

//         {/* Test Scenario */}
//         <TestScenario
//           {...testScenario}
//           constitutionLength={constitutionalAI.constitution.length}
//         />
//       </div>

//       {/* Results */}
//       <ResponseResults responses={testScenario.responses} />

//       {/* Help Section */}
//       <HelpSection />
//     </div>
//   );
// }



// 'use client';
// import React, { useState } from 'react';
// import { BookOpen, Settings, Play, Zap } from 'lucide-react';
// import { useConstitutionalAI } from './hooks/useConstitutionalAI';
// import { useMultiProviderAI } from './hooks/useMultiProviderAI';
// import { HelpSection } from './components/help/HelpSection';
// import { ConstitutionModeSelector } from './components/selector/ConstitutionModeSelector';
// import { ConstitutionBuilder } from './components/constitution/constitutionBuilder';
// import { TestScenario } from './components/testScenario/TestScenario';
// import { testScenarios } from './data/testScenarios';
// import { MultiProviderResults } from './components/results/MultiProviderResults';
// import { SetupWizard } from './components/setup/SetupWizard';
// import { AlertCircle } from 'lucide-react';

// export default function ConstitutionalAIExplorer() {
//   const constitutionalAI = useConstitutionalAI();
//   const multiProviderAI = useMultiProviderAI();
//   const [showSetup, setShowSetup] = useState(false);
//   const [scenario, setScenario] = useState('');
//   const [personality, setPersonality] = useState({
//     name: 'Balanced Assistant',
//     description: 'A helpful, balanced AI assistant that considers multiple perspectives',
//     traits: 'thoughtful, balanced, considerate, practical'
//   });

//   const handleTestScenario = async () => {
//     if (!scenario.trim()) {
//       alert('Please enter a scenario to test');
//       return;
//     }

//     if (!multiProviderAI.isConfigured()) {
//       alert('Please configure API keys and select models first');
//       setShowSetup(true);
//       return;
//     }

//     await multiProviderAI.generateResponses(personality, constitutionalAI.constitution, scenario);
//   };

//   const openSetup = () => {
//     setShowSetup(true);
//   };

//   const closeSetup = () => {
//     setShowSetup(false);
//   };

//   const configuredCount = multiProviderAI.getConfiguredProviders().length;
//   const selectedModelsCount = multiProviderAI.getSelectedModelCount();

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
//       {/* Header */}
//       <div className="text-center mb-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">
//           Constitutional AI Explorer
//         </h1>
//         <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//           Define your own set of principles and test them across multiple AI providers. 
//           See how different models respond when guided by your constitutional values.
//         </p>
//       </div>

//       {/* Setup Status Bar */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2">
//             <div className={`w-3 h-3 rounded-full ${
//               configuredCount > 0 ? 'bg-green-500' : 'bg-gray-300'
//             }`} />
//             <span className="text-sm text-gray-600">
//               {configuredCount} API key{configuredCount !== 1 ? 's' : ''} configured
//             </span>
//           </div>
          
//           <div className="flex items-center space-x-2">
//             <div className={`w-3 h-3 rounded-full ${
//               selectedModelsCount > 0 ? 'bg-green-500' : 'bg-gray-300'
//             }`} />
//             <span className="text-sm text-gray-600">
//               {selectedModelsCount} model{selectedModelsCount !== 1 ? 's' : ''} selected
//             </span>
//           </div>
//         </div>
        
//         <button
//           onClick={openSetup}
//           className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//         >
//           <Settings className="w-4 h-4" />
//           <span>Setup AI Providers</span>
//         </button>
//       </div>

//       {/* Constitution Mode Selector */}
//       <ConstitutionModeSelector
//         constitutionMode={constitutionalAI.constitutionMode}
//         setConstitutionMode={constitutionalAI.setConstitutionMode}
//       />

//       <div className="grid lg:grid-cols-2 gap-8 mb-8">
//         {/* Constitution Builder */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//             <BookOpen className="mr-2 text-indigo-600" />
//             Your AI Constitution
//           </h2>
//           <ConstitutionBuilder {...constitutionalAI} />
//         </div>

//         {/* Test Scenario */}
//         <TestScenario
//   testScenario={scenario}
//   setTestScenario={setScenario}
//   testScenarios={testScenarios} // ✅ use imported data
//   testConstitution={handleTestScenario}
//   constitutionLength={constitutionalAI.constitution.length}
//   isGenerating={multiProviderAI.isLoading}
// />

//       </div>

//       {/* Results */}
//       <MultiProviderResults
//         responses={multiProviderAI.responses}
//         onAnalyzeAlignment={(response) => {
//           // TODO: Implement alignment analysis
//           console.log('Analyzing alignment for:', response.modelId);
//         }}
//       />

//       {/* Error Display */}
//       {multiProviderAI.error && (
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
//           <div className="flex items-center space-x-2">
//             <AlertCircle className="w-5 h-5 text-red-500" />
//             <span className="text-red-700 font-medium">Error</span>
//           </div>
//           <p className="text-red-600 mt-1">{multiProviderAI.error}</p>
//         </div>
//       )}

//       {/* Help Section */}
//       <HelpSection />

//       {/* Setup Wizard Modal */}
//       {showSetup && (
//         <SetupWizard
//           providers={multiProviderAI.providers}
//           apiKeys={multiProviderAI.apiKeys}
//           selectedModels={multiProviderAI.selectedModels}
//           onUpdateAPIKeys={multiProviderAI.updateAPIKeys}
//           onUpdateSelectedModels={multiProviderAI.updateSelectedModels}
//           onClose={closeSetup}
//         />
//       )}
//     </div>
//   );
// }


'use client';
import React, { useState } from 'react';
import { BookOpen, Settings, Play, Zap, User, Users } from 'lucide-react';
import { useConstitutionalAI } from './hooks/useConstitutionalAI';
import { useMultiProviderAI } from './hooks/useMultiProviderAI';
import { HelpSection } from './components/help/HelpSection';
import { ConstitutionModeSelector } from './components/selector/ConstitutionModeSelector';
import { ConstitutionBuilder } from './components/constitution/constitutionBuilder';
import { TestScenario } from './components/testScenario/TestScenario';
import { testScenarios } from './data/testScenarios';
import { MultiProviderResults } from './components/results/MultiProviderResults';
import { SetupWizard } from './components/setup/SetupWizard';
import { PersonalitySelector } from './components/selector/PersonalitySelector';
import { AlertCircle } from 'lucide-react';

// AI Personalities (imported from your existing code)
const aiPersonalities = [
  {
    name: "Traditionalist AI",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-800",
    bias: "conservative",
    description: "Emphasizes established norms, stability, and proven approaches",
    traits: "traditional, stable, cautious, respect for established practices"
  },
  {
    name: "Progressive AI",
    icon: Zap,
    color: "bg-blue-100 text-blue-800",
    bias: "progressive",
    description: "Favors innovation, social change, and challenging status quo",
    traits: "innovative, forward-thinking, change-oriented, questioning"
  },
  {
    name: "Individualist AI",
    icon: User,
    color: "bg-purple-100 text-purple-800",
    bias: "individualist",
    description: "Prioritizes personal freedom, self-reliance, and individual rights",
    traits: "independent, self-reliant, freedom-focused, personal responsibility"
  },
  {
    name: "Collectivist AI",
    icon: Users,
    color: "bg-green-100 text-green-800",
    bias: "collectivist",
    description: "Emphasizes community welfare, cooperation, and shared responsibility",
    traits: "community-minded, cooperative, consensus-building, socially responsible"
  },
  {
    name: "Cautious AI",
    icon: Settings,
    color: "bg-gray-100 text-gray-800",
    bias: "cautious",
    description: "Prioritizes safety, risk mitigation, and careful consideration",
    traits: "careful, risk-averse, thorough, safety-focused"
  },
  {
    name: "Optimistic AI",
    icon: Play,
    color: "bg-pink-100 text-pink-800",
    bias: "optimistic",
    description: "Assumes positive outcomes and human potential for growth",
    traits: "positive, hopeful, growth-oriented, solution-focused"
  }
];

export default function ConstitutionalAIExplorer() {
  const constitutionalAI = useConstitutionalAI();
  const multiProviderAI = useMultiProviderAI();
  
  const [showSetup, setShowSetup] = useState(false);
  const [scenario, setScenario] = useState('');
  const [usePersonalities, setUsePersonalities] = useState(false);
  const [selectedPersonalities, setSelectedPersonalities] = useState<string[]>([]);
  const [personalityResponses, setPersonalityResponses] = useState<any[]>([]);
  const [isGeneratingPersonalities, setIsGeneratingPersonalities] = useState(false);
  
  const [personality, setPersonality] = useState({
    name: 'Balanced Assistant',
    description: 'A helpful, balanced AI assistant that considers multiple perspectives',
    traits: 'thoughtful, balanced, considerate, practical'
  });

  // Generate response with personality (based on your existing code)
  const generateResponseWithPersonality = async (
    personality: any,
    constitution: string[],
    scenario: string,
    modelId: string,
    generateFunction: Function
  ): Promise<string> => {
    const prompt = `

You are an AI with the following personality traits: ${personality.traits || personality.description}.
Your core behavioral description: ${personality.description}

You must follow these constitutional principles:
${constitution.map((principle, i) => `${i + 1}. ${principle}`).join('\n')}

Please respond to this scenario: "${scenario}"

Your response should:
- Reflect your personality traits
- Adhere to the constitutional principles
- Be practical and actionable
- Be 2-3 paragraphs long

Response:`;

    try {
      return await generateFunction(prompt, modelId);
    } catch (error) {
      console.error(`Failed to generate response for ${personality.name} on ${modelId}:`, error);
      return `Sorry, I couldn't generate a response due to an error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  };

  const handleTestScenario = async () => {
    if (!scenario.trim()) {
      alert('Please enter a scenario to test');
      return;
    }

    if (!multiProviderAI.isConfigured()) {
      alert('Please configure API keys and select models first');
      setShowSetup(true);
      return;
    }

    if (usePersonalities) {
      if (selectedPersonalities.length === 0) {
        alert('Please select at least one personality to test');
        return;
      }

      // Generate responses for each model with each selected personality
      setIsGeneratingPersonalities(true);
      setPersonalityResponses([]);
      
      const newResponses: any[] = [];
      const selectedModels = multiProviderAI.getSelectedModels();
      const selectedPersonalityObjects = aiPersonalities.filter(p => 
        selectedPersonalities.includes(p.name)
      );

      for (const model of selectedModels) {
        for (const personalityObj of selectedPersonalityObjects) {
          try {
            const startTime = Date.now();
            
            const response = await generateResponseWithPersonality(
              personalityObj,
              constitutionalAI.constitution,
              scenario,
              model.id,
              (prompt: string, modelId: string) => 
                multiProviderAI.generateSingleResponse(prompt, modelId)
            );

            const endTime = Date.now();
            const processingTime = endTime - startTime;

            // Analyze alignment (mock implementation)
            const alignment = {
              score: Math.random() * 0.4 + 0.6, // Random score between 0.6-1.0
              supports: constitutionalAI.constitution.slice(0, Math.floor(Math.random() * 3) + 1),
              conflicts: Math.random() > 0.7 ? ['May need more consideration of edge cases'] : []
            };

            const newResponse = {
              modelId: `${model.id}-${personalityObj.name}`,
              providerName: `${model.provider} (${personalityObj.name})`,
              personality: personalityObj,
              response,
              alignment,
              processingTime,
              error: response.includes('Sorry, I couldn\'t generate') ? 'Failed to generate response' : undefined
            };

            newResponses.push(newResponse);
            setPersonalityResponses([...newResponses]);

            // Add delay between requests to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 500));
            
          } catch (error) {
            console.error(`Failed to generate response for ${personalityObj.name} on ${model.id}:`, error);
            
            const errorResponse = {
              modelId: `${model.id}-${personalityObj.name}`,
              providerName: `${model.provider} (${personalityObj.name})`,
              personality: personalityObj,
              response: `Sorry, I couldn't generate a response due to an error.`,
              alignment: {
                score: 0,
                supports: [],
                conflicts: ['Failed to generate response']
              },
              processingTime: 0,
              error: 'Failed to generate response'
            };
            
            newResponses.push(errorResponse);
            setPersonalityResponses([...newResponses]);
          }
        }
      }

      setIsGeneratingPersonalities(false);
    } else {
      // Original provider-only testing
      await multiProviderAI.generateResponses(personality, constitutionalAI.constitution, scenario);
    }
  };

  const openSetup = () => {
    setShowSetup(true);
  };

  const closeSetup = () => {
    setShowSetup(false);
  };

  const configuredCount = multiProviderAI.getConfiguredProviders().length;
  const selectedModelsCount = multiProviderAI.getSelectedModelCount();

  const isGenerating = usePersonalities ? isGeneratingPersonalities : multiProviderAI.isLoading;
  const currentResponses = usePersonalities ? personalityResponses : multiProviderAI.responses;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Constitutional AI Explorer
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Define your own set of principles and test them across multiple AI providers with different personalities. 
          See how different models respond when guided by your constitutional values.
        </p>
      </div>

      {/* Setup Status Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              configuredCount > 0 ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <span className="text-sm text-gray-600">
              {configuredCount} API key{configuredCount !== 1 ? 's' : ''} configured
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              selectedModelsCount > 0 ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <span className="text-sm text-gray-600">
              {selectedModelsCount} model{selectedModelsCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              constitutionalAI.constitution.length > 0 ? 'bg-green-500' : 'bg-gray-300'
            }`} />
            <span className="text-sm text-gray-600">
              {constitutionalAI.constitution.length} principle{constitutionalAI.constitution.length !== 1 ? 's' : ''} defined
            </span>
          </div>

          {usePersonalities && (
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                selectedPersonalities.length > 0 ? 'bg-green-500' : 'bg-gray-300'
              }`} />
              <span className="text-sm text-gray-600">
                {selectedPersonalities.length} personalit{selectedPersonalities.length !== 1 ? 'ies' : 'y'} selected
              </span>
            </div>
          )}
        </div>
        
        <button
          onClick={openSetup}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Setup AI Providers</span>
        </button>
      </div>

      {/* Constitution Mode Selector */}
      <ConstitutionModeSelector
        constitutionMode={constitutionalAI.constitutionMode}
        setConstitutionMode={constitutionalAI.setConstitutionMode}
      />

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Constitution Builder */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <BookOpen className="mr-2 text-indigo-600" />
            Your AI Constitution
          </h2>
          <ConstitutionBuilder {...constitutionalAI} />
        </div>

        {/* Test Scenario */}
        <TestScenario
          testScenario={scenario}
          setTestScenario={setScenario}
          testScenarios={testScenarios}
          testConstitution={handleTestScenario}
          constitutionLength={constitutionalAI.constitution.length}
          isGenerating={isGenerating}
        />
      </div>

      {/* Personality Selection */}
      <PersonalitySelector
        usePersonalities={usePersonalities}
        setUsePersonalities={setUsePersonalities}
        personalities={aiPersonalities}
        selectedPersonalities={selectedPersonalities}
        setSelectedPersonalities={setSelectedPersonalities}
      />

      {/* Results */}
      <MultiProviderResults
        responses={usePersonalities ? [] : multiProviderAI.responses}
        personalityResponses={usePersonalities ? personalityResponses : []}
        showPersonalities={usePersonalities}
        onAnalyzeAlignment={(response) => {
          console.log('Analyzing alignment for:', response.modelId);
        }}
      />

      {/* Error Display */}
      {multiProviderAI.error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <span className="text-red-700 font-medium">Error</span>
          </div>
          <p className="text-red-600 mt-1">{multiProviderAI.error}</p>
        </div>
      )}

      {/* Configuration Warning */}
      {!multiProviderAI.isConfigured() && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-700 font-medium">Setup Required</span>
          </div>
          <p className="text-yellow-600 mt-1">
            Please configure API keys and select models to test.
          </p>
        </div>
      )}

      {/* Help Section */}
      <HelpSection />

      {/* Setup Wizard Modal */}
      {showSetup && (
        <SetupWizard
          providers={multiProviderAI.providers}
          apiKeys={multiProviderAI.apiKeys}
          selectedModels={multiProviderAI.selectedModels}
          onUpdateAPIKeys={multiProviderAI.updateAPIKeys}
          onUpdateSelectedModels={multiProviderAI.updateSelectedModels}
          onClose={closeSetup}
        />
      )}
    </div>
  );
}