// import React from 'react';
// import { Plus, Trash2, BookOpen } from 'lucide-react';
// import { constitutionTemplates } from '../lib/constitutionTemplates';

// interface ConstitutionBuilderProps {
//   constitution: string[];
//   setConstitution: (principles: string[]) => void;
//   newPrinciple: string;
//   setNewPrinciple: (principle: string) => void;
//   selectedTemplate: string;
//   setSelectedTemplate: (template: string) => void;
// }

// export const ConstitutionBuilder: React.FC<ConstitutionBuilderProps> = ({
//   constitution,
//   setConstitution,
//   newPrinciple,
//   setNewPrinciple,
//   selectedTemplate,
//   setSelectedTemplate
// }) => {
//   const addPrinciple = () => {
//     if (newPrinciple.trim()) {
//       setConstitution([...constitution, newPrinciple.trim()]);
//       setNewPrinciple('');
//     }
//   };

//   const removePrinciple = (index: number) => {
//     setConstitution(constitution.filter((_, i) => i !== index));
//   };

//   const loadTemplate = (templateKey: string) => {
//     setSelectedTemplate(templateKey);
//     if (templateKey !== 'custom') {
//       setConstitution([...constitutionTemplates[templateKey].principles]);
//     }
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
//         <BookOpen className="mr-2 text-indigo-600" />
//         Your AI Constitution
//       </h2>

//       {/* Template Selector */}
//       <div className="mb-6">
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           Start from a template:
//         </label>
//         <select 
//           value={selectedTemplate}
//           onChange={(e) => loadTemplate(e.target.value)}
//           className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//         >
//           {Object.entries(constitutionTemplates).map(([key, template]) => (
//             <option key={key} value={key}>{template.name}</option>
//           ))}
//         </select>
//       </div>

//       {/* Current Principles */}
//       <div className="mb-4">
//         <h3 className="text-lg font-medium text-gray-700 mb-3">
//           Current Principles ({constitution.length})
//         </h3>
//         <div className="space-y-2 max-h-64 overflow-y-auto">
//           {constitution.map((principle, index) => (
//             <div key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
//               <span className="flex-1 text-sm text-gray-800">{principle}</span>
//               <button
//                 onClick={() => removePrinciple(index)}
//                 className="ml-2 text-red-500 hover:text-red-700 transition-colors"
//                 aria-label="Remove principle"
//               >
//                 <Trash2 size={16} />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Add New Principle */}
//       <div className="flex gap-2">
//         <input
//           type="text"
//           value={newPrinciple}
//           onChange={(e) => setNewPrinciple(e.target.value)}
//           placeholder="Add a new principle..."
//           className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//           onKeyPress={(e) => e.key === 'Enter' && addPrinciple()}
//         />
//         <button
//           onClick={addPrinciple}
//           className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
//           aria-label="Add principle"
//         >
//           <Plus size={20} />
//         </button>
//       </div>
//     </div>
//   );
// };
import React from 'react';
import { BookOpen } from 'lucide-react';
import { TemplateBuilder } from './TemplateBuilder';
import { HofstedeBuilder } from './HofstedeBuilder';
import { QuestionnaireBuilder } from './QuestionnaireBuilder';
import { PrinciplesList } from './PrinciplesList';
import { CulturalProfileSummary } from './CulturalProfileSummary';
import { HofstedeDimensions, QuestionnaireCategory } from '../types';

interface ConstitutionBuilderProps {
  constitution: string[];
  constitutionMode: 'template' | 'hofstede' | 'questionnaire' | 'freewrite';
  // Template mode props
  selectedTemplate?: string;
  newPrinciple?: string;
  setNewPrinciple?: (value: string) => void;
  addPrinciple?: () => void;
  removePrinciple?: (index: number) => void;
  loadTemplate?: (key: string) => void;
  // Hofstede mode props
  hofstedeDimensions?: HofstedeDimensions;
  updateHofstedeDimension?: (dimension: keyof HofstedeDimensions, value: number) => void;
  // Questionnaire mode props
  showCategorySelection?: boolean;
  selectedCategory?: QuestionnaireCategory | null;
  questionnaireAnswers?: Record<string, number>;
  showQuestionnaire?: boolean;
  setShowCategorySelection?: (show: boolean) => void;
  setSelectedCategory?: (category: QuestionnaireCategory | null) => void;
  setQuestionnaireAnswers?: (answers: Record<string, number>) => void;
  setShowQuestionnaire?: (show: boolean) => void;
  calculateQuestionnaireResults?: () => void;
}

export function ConstitutionBuilder({ 
  constitution, 
  constitutionMode,
  ...props 
}: ConstitutionBuilderProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <BookOpen className="mr-2 text-indigo-600" />
        Your AI Constitution
      </h2>

      {constitutionMode === 'template' && <TemplateBuilder {...props} />}
      {constitutionMode === 'hofstede' && <HofstedeBuilder {...props} />}
      {constitutionMode === 'questionnaire' && <QuestionnaireBuilder {...props} />}

      <PrinciplesList 
        principles={constitution} 
        canRemove={constitutionMode === 'template'}
        onRemove={props.removePrinciple}
      />

      {(constitutionMode === 'hofstede' || constitutionMode === 'questionnaire') && (
        <CulturalProfileSummary dimensions={props.hofstedeDimensions} />
      )}
    </div>
  );
}