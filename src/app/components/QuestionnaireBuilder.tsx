import React from 'react';
import { QuestionnaireCategory } from '../types';
import { QuestionnaireStart } from './questionnaire/QuestionnaireStart';
import { CategorySelection } from './questionnaire/CategorySelection';
import { QuestionnaireForm } from './questionnaire/QuestionnaireForm';

interface QuestionnaireBuilderProps {
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

export function QuestionnaireBuilder({
  showCategorySelection,
  selectedCategory,
  questionnaireAnswers,
  showQuestionnaire,
  setShowCategorySelection,
  setSelectedCategory,
  setQuestionnaireAnswers,
  setShowQuestionnaire,
  calculateQuestionnaireResults
}: QuestionnaireBuilderProps) {
  return (
    <div className="mb-6">
      {!showQuestionnaire && !showCategorySelection ? (
        <QuestionnaireStart onStart={() => setShowCategorySelection?.(true)} />
      ) : showCategorySelection && !showQuestionnaire ? (
        <CategorySelection
          onSelectCategory={(category) => {
            setSelectedCategory?.(category);
            setShowQuestionnaire?.(true);
            setShowCategorySelection?.(false);
          }}
          onCancel={() => setShowCategorySelection?.(false)}
        />
      ) : showQuestionnaire ? (
        <QuestionnaireForm
          selectedCategory={selectedCategory}
          questionnaireAnswers={questionnaireAnswers}
          setQuestionnaireAnswers={setQuestionnaireAnswers}
          onBack={() => {
            setShowQuestionnaire?.(false);
            setSelectedCategory?.(null);
            setShowCategorySelection?.(true);
          }}
          onSubmit={calculateQuestionnaireResults}
        />
      ) : null}
    </div>
  );
}