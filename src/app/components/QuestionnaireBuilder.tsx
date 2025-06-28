import React, { useState } from 'react';
import { HofstedeDimensions, QuestionnaireQuestion, QuestionnaireCategory } from '../types';
import { hofstedeQuestions } from '../data/questions/hofstedeQuestions';
import { questionnaireCategories } from '../data/questionCategories';
import { hofstedeToPrinciples } from '../lib/hofstedeHelpers';

interface QuestionnaireBuilderProps {
  setConstitution: (constitution: string[]) => void;
  setHofstedeDimensions: (dimensions: HofstedeDimensions) => void;
}

export function QuestionnaireBuilder({
  setConstitution,
  setHofstedeDimensions
}: QuestionnaireBuilderProps) {
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, number>>({});
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QuestionnaireCategory | null>(null);

  const getCurrentQuestions = (): QuestionnaireQuestion[] => {
    if (!selectedCategory) return hofstedeQuestions;
    const category = questionnaireCategories.find(cat => cat.id === selectedCategory);
    return category?.questions || hofstedeQuestions;
  };

  const calculateQuestionnaireResults = () => {
    const currentQuestions = getCurrentQuestions();

    const dimensionScores: HofstedeDimensions = {
      powerDistance: 50,
      individualismCollectivism: 50,
      masculinityFemininity: 50,
      uncertaintyAvoidance: 50,
      longTermOrientation: 50,
      indulgenceRestraint: 50
    };

    const dimensionCounts: Record<keyof HofstedeDimensions, number> = {
      powerDistance: 0,
      individualismCollectivism: 0,
      masculinityFemininity: 0,
      uncertaintyAvoidance: 0,
      longTermOrientation: 0,
      indulgenceRestraint: 0
    };

    currentQuestions.forEach(question => {
      const answer = questionnaireAnswers[question.id];
      if (answer !== undefined) {
        const contribution = (answer - 3) * question.weight * 10;
        dimensionScores[question.dimension] += contribution;
        dimensionCounts[question.dimension]++;
      }
    });

    // Normalize scores and ensure they're within 0-100 range
    Object.keys(dimensionScores).forEach(key => {
      const dimension = key as keyof HofstedeDimensions;
      if (dimensionCounts[dimension] > 0) {
        dimensionScores[dimension] = Math.max(0, Math.min(100,
          50 + dimensionScores[dimension] / dimensionCounts[dimension]
        ));
      }
    });

    setHofstedeDimensions(dimensionScores);
    setConstitution(hofstedeToPrinciples(dimensionScores));
    setShowQuestionnaire(false);
    setSelectedCategory(null);
    setShowCategorySelection(false);
  };

  if (!showQuestionnaire && !showCategorySelection) {
    return (
      <div className="mb-6">
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Take a short questionnaire to automatically generate your cultural values and constitution.
          </p>
          <button
            onClick={() => setShowCategorySelection(true)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Questionnaire
          </button>
        </div>
      </div>
    );
  }

  if (showCategorySelection && !showQuestionnaire) {
    return (
      <div className="mb-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Choose a Context</h3>
          <p className="text-gray-600 mb-4">
            Select the life area you'd like to focus on for your cultural assessment:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {questionnaireCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setShowQuestionnaire(true);
                setShowCategorySelection(false);
              }}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left group"
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl">{category.icon}</span>
                <div>
                  <h4 className="font-medium text-gray-900 group-hover:text-indigo-700">
                    {category.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {category.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowCategorySelection(false)}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h3 className="font-medium">Cultural Values Questionnaire</h3>
            {selectedCategory && (
              <p className="text-sm text-gray-600">
                Context: {questionnaireCategories.find(cat => cat.id === selectedCategory)?.title}
              </p>
            )}
          </div>
          <span className="text-sm text-gray-500">
            {Object.keys(questionnaireAnswers).length} / {getCurrentQuestions().length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{ width: `${(Object.keys(questionnaireAnswers).length / getCurrentQuestions().length) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {getCurrentQuestions().map((question) => (
          <div key={question.id} className="border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">{question.text}</p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Strongly Disagree</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    onClick={() => setQuestionnaireAnswers(prev => ({ ...prev, [question.id]: value }))}
                    className={`w-8 h-8 rounded-full border-2 text-sm ${
                      questionnaireAnswers[question.id] === value
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : 'border-gray-300 hover:border-indigo-300'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <span className="text-xs text-gray-500">Strongly Agree</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => {
            setShowQuestionnaire(false);
            setSelectedCategory(null);
            setShowCategorySelection(true);
          }}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Back to Categories
        </button>
        <button
          onClick={calculateQuestionnaireResults}
          disabled={Object.keys(questionnaireAnswers).length < getCurrentQuestions().length}
          className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Generate Constitution
        </button>
      </div>
    </div>
  );
}