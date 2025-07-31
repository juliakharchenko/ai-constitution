import React, { Dispatch, SetStateAction } from 'react';
import { User, Users, Check, LucideIcon } from 'lucide-react';

interface PersonalityType {
  name: string;
  icon: LucideIcon;
  color: string;
  bias: string;
  description: string;
  traits: string;
}

interface PersonalitySelectorProps {
  personalities: PersonalityType[];
  selectedPersonalities: string[];
  setSelectedPersonalities: Dispatch<SetStateAction<string[]>>;
}

export const PersonalitySelector: React.FC<PersonalitySelectorProps> = ({
  personalities,
  selectedPersonalities,
  setSelectedPersonalities,
}) => {
  const handlePersonalityToggle = (personalityName: string) => {
    if (selectedPersonalities.includes(personalityName)) {
      setSelectedPersonalities(selectedPersonalities.filter(p => p !== personalityName));
    } else {
      setSelectedPersonalities([...selectedPersonalities, personalityName]);
    }
  };

  const handleSelectAll = () => {
    if (selectedPersonalities.length === personalities.length) {
      setSelectedPersonalities([]);
    } else {
      setSelectedPersonalities(personalities.map(p => p.name));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
          <Users className="mr-2 text-indigo-600" />
          AI Personality Testing
        </h2>
      </div>

      <div className="mb-4">
        <p className="text-gray-600 mb-4">
          Select the AI personalities you want to test. Each selected model will respond with each selected personality. Choose 'No Personality' to use only the raw prompt without additional personality traits.
        </p>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">
            {selectedPersonalities.length} of {personalities.length} personalities selected
          </span>
          <button
            onClick={handleSelectAll}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {selectedPersonalities.length === personalities.length ? 'Deselect All' : 'Select All'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {personalities.map((personality) => {
          const IconComponent = personality.icon;
          const isSelected = selectedPersonalities.includes(personality.name);
          
          return (
            <div
              key={personality.name}
              onClick={() => handlePersonalityToggle(personality.name)}
              className={`relative cursor-pointer border-2 rounded-lg p-4 transition-all duration-200 ${
                isSelected 
                  ? 'border-indigo-500 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {/* Selection Indicator */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
              )}

              {/* Personality Icon and Name */}
              <div className="flex items-center space-x-3 mb-2">
                <div className={`p-2 rounded-lg ${personality.color}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{personality.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${personality.color}`}>
                    {personality.bias}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-2">
                {personality.description}
              </p>

              {/* Traits */}
              <div className="text-xs text-gray-500">
                <span className="font-medium">Traits:</span> {personality.traits}
              </div>
            </div>
          );
        })}
      </div>

      {selectedPersonalities.length > 0 && (
        <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
          <h4 className="font-medium text-indigo-800 mb-2">Testing Configuration:</h4>
          <p className="text-sm text-indigo-700">
            Each selected AI model will generate responses with each of the {selectedPersonalities.length} selected personalit{selectedPersonalities.length === 1 ? 'y' : 'ies'}.
            This will create multiple response variations for comprehensive testing.
          </p>
        </div>
      )}
    </div>
  );
};