import React from 'react';

export function HelpSection() {
  const dimensions = [
    {
      title: '🌐 Power Distance',
      description: 'How much inequality in power is accepted in society. High: respect for hierarchy. Low: equality and accessibility.'
    },
    {
      title: '👤 Individualism vs Collectivism',
      description: 'Do people prioritize individual goals or group harmony? High: personal achievement. Low: collective well-being.'
    },
    {
      title: '⚖️ Masculinity vs Femininity',
      description: 'Does society value achievement or care? High: assertiveness. Low: empathy and quality of life.'
    },
    {
      title: '🌀 Uncertainty Avoidance',
      description: 'How comfortable are people with ambiguity? High: rules and structure. Low: flexibility and spontaneity.'
    },
    {
      title: '📆 Long-term Orientation',
      description: 'Focus on future or tradition? High: planning and pragmatism. Low: respect for heritage and present focus.'
    },
    {
      title: '🎉 Indulgence vs Restraint',
      description: 'Attitudes toward pleasure and control. High: free expression. Low: discipline and restraint.'
    }
  ];

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Hofstede's Cultural Dimensions
      </h3>
      <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-sm">
        {dimensions.map((dimension, index) => (
          <div key={index} className="p-5 border rounded-lg hover:shadow-md transition duration-300">
            <h4 className="font-semibold text-lg mb-1">{dimension.title}</h4>
            <p>{dimension.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}