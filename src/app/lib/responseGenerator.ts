import { AIPersonality } from '../types';

// Response generation functions
export const generateResponse = (aiPersonality: AIPersonality, principles: string[], scenario: string): string => {
  const responses: Record<string, Record<string, string>> = {
    conservative: {
      "Should I quit my stable job to start my own business?": "Consider the stability and security your current job provides. Starting a business involves significant risks that could affect not just you, but your family and dependents. Build your business gradually while maintaining your current income stream.",
      "How should we address climate change as a society?": "Climate change should be addressed through gradual, market-based solutions that don't disrupt our economic foundations. Innovation and adaptation, rather than radical changes, will provide sustainable solutions.",
    },
    progressive: {
      "Should I quit my stable job to start my own business?": "Follow your passion! The traditional model of job security is increasingly outdated. If you have a vision and the basic means to survive, entrepreneurship offers both personal fulfillment and potential for positive change.",
      "How should we address climate change as a society?": "Climate change demands immediate, systemic transformation. We need aggressive government action, massive investment in renewable energy, and fundamental changes to how we organize society and the economy.",
    },
    individualist: {
      "Should I quit my stable job to start my own business?": "This is ultimately your decision to make. Consider your personal risk tolerance, financial situation, and life goals. You have the right to pursue your own path, regardless of what others might think is 'safe' or 'practical.'",
      "How should we address climate change as a society?": "Climate solutions should emerge from individual choices and market innovations rather than top-down mandates. People should be free to make their own environmental choices based on their values and circumstances.",
    },
    collectivist: {
      "Should I quit my stable job to start my own business?": "Consider how this decision affects not just you, but your family, community, and employees who depend on you. Sometimes individual sacrifice for collective stability is the right choice. Consult with those who matter to you.",
      "How should we address climate change as a society?": "Climate change requires coordinated collective action. We must work together, sharing resources and making collective sacrifices for the greater good of current and future generations.",
    },
    cautious: {
      "Should I quit my stable job to start my own business?": "This is a high-risk decision that requires careful planning. Before quitting, ensure you have adequate savings, a detailed business plan, and fallback options. Consider starting your business part-time first.",
      "How should we address climate change as a society?": "Climate action must be carefully planned to avoid unintended consequences. We need evidence-based policies, gradual transitions, and thorough risk assessment of proposed solutions.",
    },
    optimistic: {
      "Should I quit my stable job to start my own business?": "Entrepreneurship is an exciting opportunity for growth and positive impact! While there are risks, human creativity and determination often overcome obstacles. Trust in your ability to adapt and succeed.",
      "How should we address climate change as a society?": "Human ingenuity will solve climate change through technological breakthroughs and innovative solutions. We have the capacity to create a sustainable future while maintaining prosperity and growth.",
    }
  };

  return responses[aiPersonality.bias]?.[scenario] ||
    `Based on the principles you've defined, I would approach this thoughtfully, considering multiple perspectives and potential outcomes while staying true to the constitutional constraints you've established.`;
};

// Analyze alignment
export const analyzeAlignment = (response: string, principles: string[]) => {
  const principleKeywords = principles.join(' ').toLowerCase();
  const responseText = response.toLowerCase();

  let alignmentScore = 0;
  const conflicts: string[] = [];
  const supports: string[] = [];

  // Individual vs collective
  if (principleKeywords.includes('individual') || principleKeywords.includes('freedom') || principleKeywords.includes('autonomy')) {
    if (responseText.includes('choice') || responseText.includes('decide') || responseText.includes('freedom') || responseText.includes('personal')) {
      alignmentScore += 1;
      supports.push('Individual autonomy');
    }
  }

  if (principleKeywords.includes('community') || principleKeywords.includes('collective') || principleKeywords.includes('group')) {
    if (responseText.includes('together') || responseText.includes('community') || responseText.includes('collective')) {
      alignmentScore += 1;
      supports.push('Community welfare');
    }
  }

  // Caution vs risk-taking
  if (principleKeywords.includes('risk') || principleKeywords.includes('careful') || principleKeywords.includes('structure')) {
    if (responseText.includes('careful') || responseText.includes('safe') || responseText.includes('plan')) {
      alignmentScore += 1;
      supports.push('Risk management');
    }
  }

  // Authority and hierarchy
  if (principleKeywords.includes('authority') || principleKeywords.includes('hierarchy')) {
    if (responseText.includes('expert') || responseText.includes('authority') || responseText.includes('structure')) {
      alignmentScore += 1;
      supports.push('Hierarchical respect');
    }
  }

  return {
    score: Math.min(alignmentScore / 3 * 0.8 + 0.2, 1), // Base score with some randomness
    supports,
    conflicts
  };
};