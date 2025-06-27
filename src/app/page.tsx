'use client';

import React, { useState, useCallback } from 'react';
import { Plus, Trash2, Play, BookOpen, Users, Heart, Shield, Zap, Brain, AlertCircle, CheckCircle, XCircle, Sliders, HelpCircle } from 'lucide-react';
import { AIPersonality, AIResponse, HofstedeDimensions, QuestionnaireQuestion, CategoryInfo, QuestionnaireCategory } from './types';
import { constitutionTemplates } from './lib/constitutionTemplates';
import { hofstedeQuestions } from './data/questions/hofstedeQuestions';
import { questionnaireCategories } from './data/questionCategories';
import { aiPersonalities } from './lib/aiPersonalities';
import { testScenarios } from './data/testScenarios';
import { hofstedeToPrinciples } from './lib/hofstedeHelpers';
import { generateResponse } from './lib/responseGenerator';
import { analyzeAlignment } from './lib/responseGenerator';

export default function ConstitutionalAIExplorer() {
  const [constitution, setConstitution] = useState<string[]>([
    "Be helpful and honest in all responses",
    "Respect human autonomy and dignity",
    "Avoid causing harm through advice or information"
  ]);
  const [newPrinciple, setNewPrinciple] = useState('');
  const [testScenario, setTestScenario] = useState('');
  const [responses, setResponses] = useState<AIResponse[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('custom');
  const [constitutionMode, setConstitutionMode] = useState<'template' | 'hofstede' | 'questionnaire' | 'freewrite'>('template');
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<QuestionnaireCategory | null>(null);

  // Hofstede dimensions state
  const [hofstedeDimensions, setHofstedeDimensions] = useState<HofstedeDimensions>({
    powerDistance: 50,
    individualismCollectivism: 50,
    masculinityFemininity: 50,
    uncertaintyAvoidance: 50,
    longTermOrientation: 50,
    indulgenceRestraint: 50
  });

  // Questionnaire state
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState<Record<string, number>>({});
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  const getCurrentQuestions = (): QuestionnaireQuestion[] => {
    if (!selectedCategory) return hofstedeQuestions;
    const category = questionnaireCategories.find(cat => cat.id === selectedCategory);
    return category?.questions || hofstedeQuestions;
  };

  const addPrinciple = () => {
    if (newPrinciple.trim()) {
      setConstitution([...constitution, newPrinciple.trim()]);
      setNewPrinciple('');
    }
  };

  const removePrinciple = (index: number) => {
    setConstitution(constitution.filter((_, i) => i !== index));
  };

  const loadTemplate = (templateKey: string) => {
    setSelectedTemplate(templateKey);
    if (templateKey !== 'custom') {
      setConstitution([...constitutionTemplates[templateKey as keyof typeof constitutionTemplates].principles]);
    }
  };

  const updateHofstedeDimension = (dimension: keyof HofstedeDimensions, value: number) => {
    const newDimensions = { ...hofstedeDimensions, [dimension]: value };
    setHofstedeDimensions(newDimensions);
    if (constitutionMode === 'hofstede') {
      setConstitution(hofstedeToPrinciples(newDimensions));
    }
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

  const testConstitution = useCallback(async () => {
    if (!testScenario.trim() || constitution.length === 0) return;

    setIsGenerating(true);
    setResponses([]);

    const newResponses: AIResponse[] = [];

    for (let i = 0; i < aiPersonalities.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));

      const personality = aiPersonalities[i];
      const response = generateResponse(personality, constitution, testScenario);
      const alignment = analyzeAlignment(response, constitution);

      newResponses.push({
        personality,
        response,
        alignment
      });

      setResponses([...newResponses]);
    }

    setIsGenerating(false);
  }, [testScenario, constitution]);

  const dimensionLabels = {
    powerDistance: { name: "Power Distance", low: "Egalitarian", high: "Hierarchical" },
    individualismCollectivism: { name: "Individualism vs Collectivism", low: "Collectivist", high: "Individualist" },
    masculinityFemininity: { name: "Masculinity vs Femininity", low: "Feminine", high: "Masculine" },
    uncertaintyAvoidance: { name: "Uncertainty Avoidance", low: "Risk-tolerant", high: "Risk-averse" },
    longTermOrientation: { name: "Long-term Orientation", low: "Traditional", high: "Pragmatic" },
    indulgenceRestraint: { name: "Indulgence vs Restraint", low: "Restrained", high: "Indulgent" }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Constitutional AI Explorer</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Define your own set of principles using templates, cultural dimensions, or a questionnaire.
          See how different AI systems might respond when guided by those values.
        </p>
      </div>

      {/* Constitution Mode Selector */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose Your Constitution Building Method</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setConstitutionMode('template')}
            className={`p-4 rounded-lg border-2 transition-all ${constitutionMode === 'template'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <BookOpen className="mx-auto mb-2 text-indigo-600" size={24} />
            <h3 className="font-medium">Templates & Custom</h3>
            <p className="text-sm text-gray-600 mt-1">Start from ethical frameworks or build your own</p>
          </button>

          <button
            onClick={() => setConstitutionMode('hofstede')}
            className={`p-4 rounded-lg border-2 transition-all ${constitutionMode === 'hofstede'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <Sliders className="mx-auto mb-2 text-indigo-600" size={24} />
            <h3 className="font-medium">Cultural Dimensions</h3>
            <p className="text-sm text-gray-600 mt-1">Use sliders based on Hofstede's research</p>
          </button>

          <button
            onClick={() => setConstitutionMode('questionnaire')}
            className={`p-4 rounded-lg border-2 transition-all ${constitutionMode === 'questionnaire'
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-gray-300'
              }`}
          >
            <HelpCircle className="mx-auto mb-2 text-indigo-600" size={24} />
            <h3 className="font-medium">Questionnaire</h3>
            <p className="text-sm text-gray-600 mt-1">Answer questions to auto-generate values</p>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Constitution Builder */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <BookOpen className="mr-2 text-indigo-600" />
            Your AI Constitution
          </h2>

          {constitutionMode === 'template' && (
            <>
              {/* Template Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start from a template:
                </label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => loadTemplate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {Object.entries(constitutionTemplates).map(([key, template]) => (
                    <option key={key} value={key}>{template.name}</option>
                  ))}
                </select>
              </div>

              {/* Add New Principle */}
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newPrinciple}
                  onChange={(e) => setNewPrinciple(e.target.value)}
                  placeholder="Add a new principle..."
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  onKeyPress={(e) => e.key === 'Enter' && addPrinciple()}
                />
                <button
                  onClick={addPrinciple}
                  className="px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </>
          )}

          {constitutionMode === 'hofstede' && (
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Adjust the sliders to reflect your cultural values. The constitution will be automatically generated based on your settings.
              </p>
              {Object.entries(dimensionLabels).map(([key, label]) => (
                <div key={key} className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-700">{label.name}</label>
                    <span className="text-sm text-gray-500">{hofstedeDimensions[key as keyof HofstedeDimensions]}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{label.low}</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={hofstedeDimensions[key as keyof HofstedeDimensions]}
                      onChange={(e) => updateHofstedeDimension(key as keyof HofstedeDimensions, parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-xs text-gray-500">{label.high}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {constitutionMode === 'questionnaire' && (
            <div className="mb-6">
              {!showQuestionnaire && !showCategorySelection ? (
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
              ) : showCategorySelection && !showQuestionnaire ? (
                <div>
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
              ) : showQuestionnaire ? (
                <div>
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
                                className={`w-8 h-8 rounded-full border-2 text-sm ${questionnaireAnswers[question.id] === value
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
              ) : null}
            </div>
          )}

          {/* Current Principles */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700 mb-3">Current Principles ({constitution.length})</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {constitution.map((principle, index) => (
                <div key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
                  <span className="flex-1 text-sm text-gray-800">{principle}</span>
                  {constitutionMode === 'template' && (
                    <button
                      onClick={() => removePrinciple(index)}
                      className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Dimensions Summary (for Hofstede and Questionnaire modes) */}
          {(constitutionMode === 'hofstede' || constitutionMode === 'questionnaire') && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-700 mb-2">Your Cultural Profile</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(dimensionLabels).map(([key, label]) => {
                  const value = hofstedeDimensions[key as keyof HofstedeDimensions];
                  const isHigh = value > 60;
                  const isLow = value < 40;
                  return (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{label.name}:</span>
                      <span className={`font-medium ${isHigh ? 'text-blue-600' : isLow ? 'text-green-600' : 'text-gray-700'}`}>
                        {isHigh ? label.high : isLow ? label.low : 'Balanced'} ({value})
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Test Scenario */}
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
            onClick={testConstitution}
            disabled={!testScenario.trim() || constitution.length === 0 || isGenerating}
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
      </div>

      {/* Results */}
      {responses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            AI Responses Under Your Constitution
          </h2>

          <div className="grid lg:grid-cols-2 gap-6">
            {responses.map((result, index) => {
              const Icon = result.personality.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-2 rounded-lg ${result.personality.color} mr-3`}>
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{result.personality.name}</h3>
                      <p className="text-sm text-gray-600">{result.personality.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-gray-700 mr-2">Constitutional Alignment:</span>
                      <div className="flex items-center">
                        {result.alignment.score > 0.7 ? (
                          <CheckCircle className="text-green-500 mr-1" size={16} />
                        ) : result.alignment.score > 0.3 ? (
                          <AlertCircle className="text-yellow-500 mr-1" size={16} />
                        ) : (
                          <XCircle className="text-red-500 mr-1" size={16} />
                        )}
                        <span className="text-sm font-medium">
                          {(result.alignment.score * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>

                    {result.alignment.supports.length > 0 && (
                      <div className="text-xs text-green-600 mb-1">
                        ✓ Supports: {result.alignment.supports.join(', ')}
                      </div>
                    )}

                    {result.alignment.conflicts.length > 0 && (
                      <div className="text-xs text-red-600">
                        ⚠ {result.alignment.conflicts.join(', ')}
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-800 leading-relaxed">{result.response}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Hofstede's Cultural Dimensions
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-sm">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="p-5 border rounded-lg hover:shadow-md transition duration-300">
              <h4 className="font-semibold text-lg text-blue-700 mb-1">🌐 Power Distance</h4>
              <p>How much inequality in power is accepted in society. <strong>High</strong>: respect for hierarchy. <strong>Low</strong>: equality and accessibility.</p>
            </div>
            <div className="p-5 border rounded-lg hover:shadow-md transition duration-300">
              <h4 className="font-semibold text-lg text-green-700 mb-1">👤 Individualism vs Collectivism</h4>
              <p>Do people prioritize individual goals or group harmony? <strong>High</strong>: personal achievement. <strong>Low</strong>: collective well-being.</p>
            </div>
            <div className="p-5 border rounded-lg hover:shadow-md transition duration-300">
              <h4 className="font-semibold text-lg text-pink-700 mb-1">⚖️ Masculinity vs Femininity</h4>
              <p>Does society value achievement or care? <strong>High</strong>: assertiveness. <strong>Low</strong>: empathy and quality of life.</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="p-5 border rounded-lg hover:shadow-md transition duration-300">
              <h4 className="font-semibold text-lg text-yellow-700 mb-1">🌀 Uncertainty Avoidance</h4>
              <p>How comfortable are people with ambiguity? <strong>High</strong>: rules and structure. <strong>Low</strong>: flexibility and spontaneity.</p>
            </div>
            <div className="p-5 border rounded-lg hover:shadow-md transition duration-300">
              <h4 className="font-semibold text-lg text-purple-700 mb-1">📆 Long-term Orientation</h4>
              <p>Focus on future or tradition? <strong>High</strong>: planning and pragmatism. <strong>Low</strong>: respect for heritage and present focus.</p>
            </div>
            <div className="p-5 border rounded-lg hover:shadow-md transition duration-300">
              <h4 className="font-semibold text-lg text-red-700 mb-1">🎉 Indulgence vs Restraint</h4>
              <p>Attitudes toward pleasure and control. <strong>High</strong>: free expression. <strong>Low</strong>: discipline and restraint.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

