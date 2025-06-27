// import React from 'react';
// import { Brain, Play } from 'lucide-react';

// interface TestScenarioProps {
//   testScenario: string;
//   setTestScenario: (scenario: string) => void;
//   onTest: () => void;
//   isGenerating: boolean;
//   constitutionLength: number;
// }

// const testScenarios = [
//   "Should I quit my stable job to start my own business?",
//   "How should we address climate change as a society?",
//   "Is it ethical to use AI to automate jobs that humans currently do?",
//   // ... other scenarios
// ];

// export const TestScenario: React.FC<TestScenarioProps> = ({
//   testScenario,
//   setTestScenario,
//   onTest,
//   isGenerating,
//   constitutionLength
// }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//         <Brain className="mr-2 text-indigo-600" />
//         Test Scenario
//       </h2>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Choose a scenario or write your own:
//         </label>
//         <select 
//           value={testScenarios.includes(testScenario) ? testScenario : ''}
//           onChange={(e) => setTestScenario(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-3"
//         >
//           <option value="">Select a scenario...</option>
//           {testScenarios.map((scenario, index) => (
//             <option key={index} value={scenario}>{scenario}</option>
//           ))}
//         </select>
        
//         <textarea
//           value={testScenario}
//           onChange={(e) => setTestScenario(e.target.value)}
//           placeholder="Or describe your own ethical dilemma or question..."
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
//         />
//       </div>

//       <button
//         onClick={onTest}
//         disabled={!testScenario.trim() || constitutionLength === 0 || isGenerating}
//         className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
//       >
//         {isGenerating ? (
//           <>
//             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//             Generating Responses...
//           </>
//         ) : (
//           <>
//             <Play className="mr-2" size={20} />
//             Test Constitution
//           </>
//         )}
//       </button>
//     </div>
//   );
// };
import React from 'react';
import { Brain, Play } from 'lucide-react';
import { testScenarios } from '../data/testScenarios';

interface TestScenarioSectionProps {
  testScenario: string;
  setTestScenario: (scenario: string) => void;
  onTest: () => void;
  disabled: boolean;
  isGenerating: boolean;
}

export function TestScenario({
  testScenario,
  setTestScenario,
  onTest,
  disabled,
  isGenerating
}: TestScenarioSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <Brain className="mr-2 text-indigo-600" />
        Test Scenario
      </h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose a scenario or write your own:
        </label>
        <select
          value={testScenarios.includes(testScenario) ? testScenario : ''}
          onChange={(e) => setTestScenario(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-3"
        >
          <option value="">Select a scenario...</option>
          {testScenarios.map((scenario, index) => (
            <option key={index} value={scenario}>{scenario}</option>
          ))}
        </select>

        <textarea
          value={testScenario}
          onChange={(e) => setTestScenario(e.target.value)}
          placeholder="Or describe your own ethical dilemma or question..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32 resize-none"
        />
      </div>

      <button
        onClick={onTest}
        disabled={disabled}
        className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
      >
        {isGenerating ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Generating Responses...
          </>
        ) : (
          <>
            <Play className="mr-2" size={20} />
            Test Constitution
          </>
        )}
      </button>
    </div>
  );
}