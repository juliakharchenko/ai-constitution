import React, { useState } from 'react';
import { Bot, Clock, AlertCircle, CheckCircle, BarChart3, Eye, User, Server } from 'lucide-react';
import { AIResponse, AlignmentAnalysis } from '../../types/ai';
import type { LucideIcon } from 'lucide-react';

// AIPersonality type definition
interface AIPersonality {
  name: string;
  icon: LucideIcon;
  color: string;
  bias: string;
  description: string;
}

interface MultiProviderResultsProps {
  responses: AIResponse[];
  alignmentAnalyses?: { [modelId: string]: AlignmentAnalysis };
  onAnalyzeAlignment?: (response: AIResponse) => void;
  personalityResponses: PersonalityResponse[];
  showPersonalities?: boolean;
  onToggleMode?: (showPersonalities: boolean) => void;
}

interface PersonalityResponse {
  personality: AIPersonality;
  response: string;
  alignment?: AlignmentAnalysis;
  processingTime?: number;
  error?: string;
  modelId: string;
}

export const MultiProviderResults: React.FC<MultiProviderResultsProps> = ({
  responses,
  alignmentAnalyses,
  onAnalyzeAlignment,
  personalityResponses = [],
  showPersonalities = true,
  onToggleMode,
}) => {
  const [expandedResponse, setExpandedResponse] = useState<string | null>(null);
  console.log(`personality responses: ${personalityResponses}`);
  console.log(`responses: ${responses}`);
  const currentResponses = personalityResponses;
  const hasResponses = currentResponses.length > 0;

  if (!hasResponses) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No Responses Yet
        </h3>
        <p className="text-gray-500">
          {showPersonalities
            ? "Configure your constitution and test a scenario to see personality responses here."
            : "Configure your AI providers and test a scenario to see responses here."
          }
        </p>
      </div>
    );
  }

  const toggleExpanded = (id: string) => {
    setExpandedResponse(expandedResponse === id ? null : id);
  };

  const formatProcessingTime = (ms: number) => {
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <BarChart3 className="mr-2 text-indigo-600" />
          {showPersonalities ? 'AI Personality Responses' : 'AI Model Responses'}
          <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
            {currentResponses.length} {showPersonalities ? 'personalities' : 'models'}
          </span>
        </h2>

        {onToggleMode && (
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Server className={`w-4 h-4 ${!showPersonalities ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span className={`text-sm ${!showPersonalities ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                Hide Responses
              </span>
            </div>
            <button
              onClick={() => onToggleMode(!showPersonalities)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showPersonalities ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showPersonalities ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <div className="flex items-center space-x-2">
              <User className={`w-4 h-4 ${showPersonalities ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span className={`text-sm ${showPersonalities ? 'text-indigo-600 font-medium' : 'text-gray-500'}`}>
                Show Responses
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {showPersonalities ? (
          personalityResponses.map((response, index) => (
            <PersonalityResponseCard
              key={`${response.personality.name}-${index}`}
              response={response}
              isExpanded={expandedResponse === `${response.personality.name}-${index}`}
              onToggleExpanded={() => toggleExpanded(`${response.personality.name}-${index}`)}
              formatProcessingTime={formatProcessingTime}
            />
          ))
        ) : (
          responses.map((response) => (
            <ProviderResponseCard
              key={response.modelId}
              response={response}
              alignmentAnalysis={alignmentAnalyses?.[response.modelId]}
              isExpanded={expandedResponse === response.modelId}
              onToggleExpanded={() => toggleExpanded(response.modelId)}
              onAnalyzeAlignment={onAnalyzeAlignment}
              formatProcessingTime={formatProcessingTime}
            />
          ))
        )}
      </div>
    </div>
  );
};

const PersonalityResponseCard: React.FC<{
  response: PersonalityResponse;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  formatProcessingTime: (ms: number) => string;
}> = ({ response, isExpanded, onToggleExpanded, formatProcessingTime }) => {
  const IconComponent = response.personality.icon;
  // Remove everything after the last dash in modelId
  const displayModelId = response.modelId.substring(0, response.modelId.lastIndexOf('-'));

  return (
    <div
      className={`border rounded-lg p-4 transition-all duration-200 ${
        response.error ? 'border-red-200 bg-red-50' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {response.error ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            <div className="flex items-center space-x-2">
              <IconComponent className="w-4 h-4" />
              <span className="font-medium text-gray-800">
                {response.personality.name}
              </span>
            </div>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${response.personality.color}`}>
            {response.personality.bias}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          {response.processingTime && (
            <div className="flex items-center space-x-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>{formatProcessingTime(response.processingTime)}</span>
            </div>
          )}
          {!response.error && (
            <button
              onClick={onToggleExpanded}
              className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Eye className="w-4 h-4" />
              <span>{isExpanded ? 'Hide' : 'View'}</span>
            </button>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <strong>LLM:</strong> {displayModelId || response.modelId}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <strong>Personality:</strong> {response.personality.name}
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <strong>Description:</strong> {response.personality.description}
      </div>
      {response.error ? (
        <div className="text-red-600 text-sm">
          <strong>Error:</strong> {response.error}
        </div>
      ) : (
        <>
          <div className={`text-gray-700 ${!isExpanded ? 'line-clamp-3' : ''}`}>
            {response.response}
          </div>
          {isExpanded && response.alignment && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-800 mb-3">
                Constitutional Alignment Analysis
              </h4>
              <AlignmentDisplay analysis={response.alignment} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Component for provider response cards
const ProviderResponseCard: React.FC<{
  response: AIResponse & { personality?: { name: string } };
  alignmentAnalysis?: AlignmentAnalysis;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onAnalyzeAlignment?: (response: AIResponse) => void;
  formatProcessingTime: (ms: number) => string;
}> = ({ response, alignmentAnalysis, isExpanded, onToggleExpanded, onAnalyzeAlignment, formatProcessingTime }) => {
  // Remove everything after the last dash in modelId
  const displayModelId = response.modelId.substring(0, response.modelId.lastIndexOf('-'));

  return (
    <div
      className={`border rounded-lg p-4 transition-all duration-200 ${
        response.error ? 'border-red-200 bg-red-50' : 'border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            {response.error ? (
              <AlertCircle className="w-5 h-5 text-red-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
            <span className="font-medium text-gray-800">
              {response.providerName}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            {displayModelId || response.modelId}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{formatProcessingTime(response.processingTime)}</span>
          </div>
          {!response.error && (
            <button
              onClick={onToggleExpanded}
              className="flex items-center space-x-1 text-sm text-indigo-600 hover:text-indigo-700"
            >
              <Eye className="w-4 h-4" />
              <span>{isExpanded ? 'Hide' : 'View'}</span>
            </button>
          )}
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-2">
        <strong>LLM:</strong> {displayModelId || response.modelId}
      </div>
      {response.personality && (
        <div className="text-sm text-gray-600 mb-2">
          <strong>Personality:</strong> {response.personality.name}
        </div>
      )}
      {response.error ? (
        <div className="text-red-600 text-sm">
          <strong>Error:</strong> {response.error}
        </div>
      ) : (
        <>
          <div className={`text-gray-700 ${!isExpanded ? 'line-clamp-3' : ''}`}>
            {response.response}
          </div>
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-800">
                  Constitutional Alignment Analysis
                </h4>
                {onAnalyzeAlignment && (
                  <button
                    onClick={() => onAnalyzeAlignment(response)}
                    className="text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    Analyze Alignment
                  </button>
                )}
              </div>
              {alignmentAnalysis && (
                <AlignmentDisplay analysis={alignmentAnalysis} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Component for displaying alignment analysis
const AlignmentDisplay: React.FC<{ analysis: AlignmentAnalysis }> = ({ analysis }) => {
  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 0.8) return 'bg-green-100';
    if (score >= 0.6) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-3">
        <span className="text-sm text-gray-600">Alignment Score:</span>
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(analysis.score)} ${getScoreBackground(analysis.score)}`}>
          {Math.round(analysis.score * 100)}%
        </span>
      </div>
      {analysis.supports.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-green-700 mb-2">Supports Principles:</h5>
          <ul className="text-sm text-green-600 space-y-1">
            {analysis.supports.map((support, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>{support}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {analysis.conflicts.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-red-700 mb-2">Potential Conflicts:</h5>
          <ul className="text-sm text-red-600 space-y-1">
            {analysis.conflicts.map((conflict, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>{conflict}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};