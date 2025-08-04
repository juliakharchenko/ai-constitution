import React from 'react';

interface Response {
  providerName: string;
  processingTime: number;
  response: string;
  alignment?: { score: number };
  safety?: { overallScore: number };
  trust?: { score: number };
}

interface EnhancedResultsProps {
  responses: Response[];
  onAnalyze: (response: Response) => void;
}

const EnhancedResults: React.FC<EnhancedResultsProps> = ({ responses, onAnalyze }) => {
  return (
    <div className="space-y-6">
      {responses.map((response, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {response.providerName}
              </h3>
              <p className="text-sm text-gray-600">
                Processing time: {response.processingTime}ms
              </p>
            </div>
            <div className="flex space-x-2">
              {response.alignment && (
                <div className="text-center">
                  <div className="text-sm text-gray-600">Alignment</div>
                  <div className="text-lg font-bold text-indigo-600">
                    {(response.alignment.score * 100).toFixed(1)}%
                  </div>
                </div>
              )}
              {response.safety && (
                <div className="text-center">
                  <div className="text-sm text-gray-600">Safety</div>
                  <div className="text-lg font-bold text-green-600">
                    {(response.safety.overallScore * 100).toFixed(1)}%
                  </div>
                </div>
              )}
              {response.trust && (
                <div className="text-center">
                  <div className="text-sm text-gray-600">Trust</div>
                  <div className="text-lg font-bold text-purple-600">
                    {(response.trust.score * 100).toFixed(1)}%
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-800 whitespace-pre-wrap">{response.response}</p>
          </div>
          
          <button
            onClick={() => onAnalyze(response)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Analyze Safety & Trust
          </button>
        </div>
      ))}
    </div>
  );
};

export { EnhancedResults };