import React from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

interface SafetyResult {
  score: number;
  passes: string[];
  concerns: string[];
}

interface SafetyAnalysisProps {
  safetyResults: Record<string, SafetyResult>;
}

const SafetyAnalysis: React.FC<SafetyAnalysisProps> = ({ safetyResults }) => {
  const getSafetyColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSafetyIcon = (score: number) => {
    if (score >= 0.8) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (score >= 0.6) return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Shield className="mr-2 text-indigo-600" />
        Safety Analysis
      </h3>
      
      <div className="space-y-4">
        {Object.entries(safetyResults).map(([dimension, result]) => (
          <div key={dimension} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium capitalize">{dimension}</h4>
              <div className="flex items-center space-x-2">
                {getSafetyIcon(result.score)}
                <span className={`font-bold ${getSafetyColor(result.score)}`}>
                  {(result.score * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              {result.passes.length > 0 && (
                <div>
                  <p className="text-sm text-green-600 font-medium">✓ Strengths:</p>
                  <ul className="text-sm text-green-700 ml-4 space-y-1">
                    {result.passes.map((pass, i) => (
                      <li key={i}>• {pass}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {result.concerns.length > 0 && (
                <div>
                  <p className="text-sm text-red-600 font-medium">⚠ Concerns:</p>
                  <ul className="text-sm text-red-700 ml-4 space-y-1">
                    {result.concerns.map((concern, i) => (
                      <li key={i}>• {concern}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { SafetyAnalysis };