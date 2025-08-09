'use client';
import React, { useState } from 'react';
import { Bot, Clock, AlertCircle, CheckCircle, BarChart3, Eye } from 'lucide-react';
import { PersonalityResponse, AnalysisReport } from '../../types/ai';
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
  personalityResponses: PersonalityResponse[];
  showPersonalities: boolean;
  onToggleMode: (mode: boolean) => void;
  onAnalyzeAlignment: (response: PersonalityResponse) => Promise<void>;
  alignmentAnalyses: { [modelId: string]: AnalysisReport };
}

export const MultiProviderResults: React.FC<MultiProviderResultsProps> = ({
  personalityResponses = [],
  showPersonalities,
  onToggleMode,
  onAnalyzeAlignment,
  alignmentAnalyses,
}) => {
  const [expandedResponses, setExpandedResponses] = useState<string[]>([]);
  const hasResponses = personalityResponses.length > 0;

  if (!hasResponses) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <Bot className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          No Responses Yet
        </h3>
        <p className="text-gray-500">
          Configure your constitution and test a scenario to see personality responses here.
        </p>
      </div>
    );
  }

  const toggleExpanded = (id: string) => {
    setExpandedResponses((prev) =>
      prev.includes(id)
        ? prev.filter((responseId) => responseId !== id)
        : [...prev, id]
    );
  };

  const formatProcessingTime = (ms: number) => {
    return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <BarChart3 className="mr-2 text-indigo-600" />
          AI Responses
          <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
            {personalityResponses.length} personalities
          </span>
        </h2>
        <label className="flex items-center space-x-2">
          {/* <input
            type="checkbox"
            checked={showPersonalities}
            onChange={(e) => onToggleMode(e.target.checked)}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span>Show Responses</span> */}
        </label>
      </div>

      <div className="space-y-4">
        {personalityResponses.map((response, index) => (
          <PersonalityResponseCard
            key={`${response.personality.name}-${index}`}
            response={response}
            isExpanded={expandedResponses.includes(`${response.personality.name}-${index}`)}
            onToggleExpanded={() => toggleExpanded(`${response.personality.name}-${index}`)}
            formatProcessingTime={formatProcessingTime}
            onAnalyzeAlignment={onAnalyzeAlignment}
            alignmentAnalysis={alignmentAnalyses[response.modelId]}
          />
        ))}
      </div>
    </div>
  );
};

const PersonalityResponseCard: React.FC<{
  response: PersonalityResponse;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  formatProcessingTime: (ms: number) => string;
  onAnalyzeAlignment: (response: PersonalityResponse) => Promise<void>;
  alignmentAnalysis?: AnalysisReport;
}> = ({ response, isExpanded, onToggleExpanded, formatProcessingTime, onAnalyzeAlignment, alignmentAnalysis }) => {
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
          {isExpanded && alignmentAnalysis && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-800">
                  Constitutional Alignment Analysis
                </h4>
                <button
                  onClick={() => onAnalyzeAlignment(response)}
                  className="text-sm text-indigo-600 hover:text-indigo-700"
                >
                  Re-analyze
                </button>
              </div>
              <AlignmentDisplay analysis={alignmentAnalysis} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Component for displaying alignment analysis
const AlignmentDisplay: React.FC<{ analysis: AnalysisReport }> = ({ analysis }) => {
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
        <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreColor(analysis.alignmentScore)} ${getScoreBackground(analysis.alignmentScore)}`}>
          {Math.round(analysis.alignmentScore * 100)}%
        </span>
      </div>
      <div>
        <h5 className="text-sm font-medium text-gray-700 mb-2">Summary:</h5>
        <p className="text-sm text-gray-600">{analysis.summary}</p>
      </div>
      {analysis.adherenceAnalysis.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-green-700 mb-2">Adheres to Principles:</h5>
          <ul className="text-sm text-green-600 space-y-1">
            {analysis.adherenceAnalysis.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                <span>{item.item}: {item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {analysis.nonAdherenceAnalysis.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-red-700 mb-2">Potential Conflicts:</h5>
          <ul className="text-sm text-red-600 space-y-1">
            {analysis.nonAdherenceAnalysis.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>{item.item}: {item.description}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      {analysis.recommendations.length > 0 && (
        <div>
          <h5 className="text-sm font-medium text-gray-700 mb-2">Recommendations:</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-500 mr-2">•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};