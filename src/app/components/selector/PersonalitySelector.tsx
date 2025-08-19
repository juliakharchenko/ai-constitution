import React, { Dispatch, SetStateAction, useState } from 'react';
import { Users, Check, LucideIcon, Plus, BookOpen, Zap, Heart, Shield, Brain } from 'lucide-react';

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
  setAiPersonalities: Dispatch<SetStateAction<PersonalityType[]>>;
}

export const PersonalitySelector: React.FC<PersonalitySelectorProps> = ({
  personalities,
  selectedPersonalities,
  setSelectedPersonalities,
  setAiPersonalities,
}) => {
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customBias, setCustomBias] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customTraits, setCustomTraits] = useState('');
  const [customIconName, setCustomIconName] = useState('Users');
  const [customColor, setCustomColor] = useState('bg-indigo-100 text-indigo-800');

  const iconMap: Record<string, LucideIcon> = {
    BookOpen,
    Zap,
    Users,
    Heart,
    Shield,
    Brain,
  };

  const availableColors = [
    'bg-amber-100 text-amber-800',
    'bg-blue-100 text-blue-800',
    'bg-purple-100 text-purple-800',
    'bg-green-100 text-green-800',
    'bg-gray-100 text-gray-800',
    'bg-pink-100 text-pink-800',
    'bg-indigo-100 text-indigo-800',
  ];

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim() || !customBias.trim() || !customDescription.trim() || !customTraits.trim()) {
      return;
    }
    const newPersonality: PersonalityType = {
      name: customName,
      icon: iconMap[customIconName] || Users,
      color: customColor,
      bias: customBias,
      description: customDescription,
      traits: customTraits,
    };
    setAiPersonalities([...personalities, newPersonality]);
    setCustomName('');
    setCustomBias('');
    setCustomDescription('');
    setCustomTraits('');
    setShowCustomForm(false);
  };

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
          Select the AI personalities you want to test. Each selected model will respond with each selected personality. Choose &apos;No Personality&apos; to use only the raw prompt without additional personality traits.
        </p>
        <p className="text-gray-600 mb-4">
          AI models have been found to exhibit distinct personality traits across different models, influencing their responses and biases. By testing with specific personalities, we can observe variations in alignment and outputs. See: 
          <a href="https://arxiv.org/abs/2307.00184" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Jiang et al. (2023)</a>, 
          <a href="https://www.nature.com/articles/s41598-024-84109-5" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Safyari et al. (2024)</a>, 
          <a href="https://arxiv.org/abs/2402.08341" className="text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer">Huang et al. (2024)</a>.
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

      <div className="mt-6">
        <button
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          <span>{showCustomForm ? 'Cancel' : 'Add Custom Personality'}</span>
        </button>
        {showCustomForm && (
          <form onSubmit={handleAddCustom} className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Bias"
              value={customBias}
              onChange={(e) => setCustomBias(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Traits (comma-separated)"
              value={customTraits}
              onChange={(e) => setCustomTraits(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              required
            />
            <select
              value={customIconName}
              onChange={(e) => setCustomIconName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {Object.keys(iconMap).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
            <select
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              {availableColors.map((color) => (
                <option key={color} value={color}>{color}</option>
              ))}
            </select>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Add Personality
            </button>
          </form>
        )}
      </div>
    </div>
  );
};