// import React from 'react';
// import { BookOpen, Sliders, HelpCircle } from 'lucide-react';
// import { ConstitutionMode } from '../../types';

// interface ConstitutionModeSelectorProps {
//   constitutionMode: ConstitutionMode;
//   setConstitutionMode: (mode: ConstitutionMode) => void;
// }

// export const ConstitutionModeSelector: React.FC<ConstitutionModeSelectorProps> = ({
//   constitutionMode,
//   setConstitutionMode
// }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Your Constitution Building Method</h2>
//       <div className="grid md:grid-cols-3 gap-4">
//         <button
//           onClick={() => setConstitutionMode('template')}
//           className={`p-4 rounded-lg border-2 transition-all ${
//             constitutionMode === 'template'
//               ? 'border-indigo-500 bg-indigo-50'
//               : 'border-gray-200 hover:border-gray-300'
//           }`}
//         >
//           <BookOpen className="mx-auto mb-2 text-indigo-600" size={24} />
//           <h3 className="font-medium">Templates & Custom</h3>
//           <p className="text-sm text-gray-600 mt-1">Start from ethical frameworks or build your own</p>
//         </button>

//         <button
//           onClick={() => setConstitutionMode('hofstede')}
//           className={`p-4 rounded-lg border-2 transition-all ${
//             constitutionMode === 'hofstede'
//               ? 'border-indigo-500 bg-indigo-50'
//               : 'border-gray-200 hover:border-gray-300'
//           }`}
//         >
//           <Sliders className="mx-auto mb-2 text-indigo-600" size={24} />
//           <h3 className="font-medium">Cultural Dimensions</h3>
//           <p className="text-sm text-gray-600 mt-1">Use sliders based on Hofstede's research</p>
//         </button>

//         <button
//           onClick={() => setConstitutionMode('questionnaire')}
//           className={`p-4 rounded-lg border-2 transition-all ${
//             constitutionMode === 'questionnaire'
//               ? 'border-indigo-500 bg-indigo-50'
//               : 'border-gray-200 hover:border-gray-300'
//           }`}
//         >
//           <HelpCircle className="mx-auto mb-2 text-indigo-600" size={24} />
//           <h3 className="font-medium">Questionnaire</h3>
//           <p className="text-sm text-gray-600 mt-1">Answer questions to auto-generate values</p>
//         </button>
//       </div>
//     </div>
//   );
// };
import React from 'react';
import { BookOpen, Sliders, HelpCircle } from 'lucide-react';

interface ConstitutionModeSelectorProps {
  constitutionMode: 'template' | 'hofstede' | 'questionnaire' | 'freewrite';
  setConstitutionMode: (mode: 'template' | 'hofstede' | 'questionnaire' | 'freewrite') => void;
}

export function ConstitutionModeSelector({ constitutionMode, setConstitutionMode }: ConstitutionModeSelectorProps) {
  const modes = [
    {
      id: 'template' as const,
      icon: BookOpen,
      title: 'Templates & Custom',
      description: 'Start from ethical frameworks or build your own'
    },
    {
      id: 'hofstede' as const,
      icon: Sliders,
      title: 'Cultural Dimensions',
      description: 'Use sliders based on Hofstede\'s research'
    },
    {
      id: 'questionnaire' as const,
      icon: HelpCircle,
      title: 'Questionnaire',
      description: 'Answer questions to auto-generate values'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Your Constitution Building Method</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setConstitutionMode(mode.id)}
              className={`p-4 rounded-lg border-2 transition-all ${
                constitutionMode === mode.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className="mx-auto mb-2 text-indigo-600" size={24} />
              <h3 className="font-medium">{mode.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{mode.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}