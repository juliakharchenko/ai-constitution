// import { AIPersonality } from '../types';
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Response generation functions
// export const generateResponse = (aiPersonality: AIPersonality, principles: string[], scenario: string): string => {
//   const responses: Record<string, Record<string, string>> = {
//     conservative: {
//       "Should I quit my stable job to start my own business?": "Consider the stability and security your current job provides. Starting a business involves significant risks that could affect not just you, but your family and dependents. Build your business gradually while maintaining your current income stream.",
//       "How should we address climate change as a society?": "Climate change should be addressed through gradual, market-based solutions that don't disrupt our economic foundations. Innovation and adaptation, rather than radical changes, will provide sustainable solutions.",
//     },
//     progressive: {
//       "Should I quit my stable job to start my own business?": "Follow your passion! The traditional model of job security is increasingly outdated. If you have a vision and the basic means to survive, entrepreneurship offers both personal fulfillment and potential for positive change.",
//       "How should we address climate change as a society?": "Climate change demands immediate, systemic transformation. We need aggressive government action, massive investment in renewable energy, and fundamental changes to how we organize society and the economy.",
//     },
//     individualist: {
//       "Should I quit my stable job to start my own business?": "This is ultimately your decision to make. Consider your personal risk tolerance, financial situation, and life goals. You have the right to pursue your own path, regardless of what others might think is 'safe' or 'practical.'",
//       "How should we address climate change as a society?": "Climate solutions should emerge from individual choices and market innovations rather than top-down mandates. People should be free to make their own environmental choices based on their values and circumstances.",
//     },
//     collectivist: {
//       "Should I quit my stable job to start my own business?": "Consider how this decision affects not just you, but your family, community, and employees who depend on you. Sometimes individual sacrifice for collective stability is the right choice. Consult with those who matter to you.",
//       "How should we address climate change as a society?": "Climate change requires coordinated collective action. We must work together, sharing resources and making collective sacrifices for the greater good of current and future generations.",
//     },
//     cautious: {
//       "Should I quit my stable job to start my own business?": "This is a high-risk decision that requires careful planning. Before quitting, ensure you have adequate savings, a detailed business plan, and fallback options. Consider starting your business part-time first.",
//       "How should we address climate change as a society?": "Climate action must be carefully planned to avoid unintended consequences. We need evidence-based policies, gradual transitions, and thorough risk assessment of proposed solutions.",
//     },
//     optimistic: {
//       "Should I quit my stable job to start my own business?": "Entrepreneurship is an exciting opportunity for growth and positive impact! While there are risks, human creativity and determination often overcome obstacles. Trust in your ability to adapt and succeed.",
//       "How should we address climate change as a society?": "Human ingenuity will solve climate change through technological breakthroughs and innovative solutions. We have the capacity to create a sustainable future while maintaining prosperity and growth.",
//     }
//   };

//   return responses[aiPersonality.bias]?.[scenario] ||
//     `Based on the principles you've defined, I would approach this thoughtfully, considering multiple perspectives and potential outcomes while staying true to the constitutional constraints you've established.`;
// };

// // Analyze alignment
// export const analyzeAlignment = (response: string, principles: string[]) => {
//   const principleKeywords = principles.join(' ').toLowerCase();
//   const responseText = response.toLowerCase();

//   let alignmentScore = 0;
//   const conflicts: string[] = [];
//   const supports: string[] = [];

//   // Individual vs collective
//   if (principleKeywords.includes('individual') || principleKeywords.includes('freedom') || principleKeywords.includes('autonomy')) {
//     if (responseText.includes('choice') || responseText.includes('decide') || responseText.includes('freedom') || responseText.includes('personal')) {
//       alignmentScore += 1;
//       supports.push('Individual autonomy');
//     }
//   }

//   if (principleKeywords.includes('community') || principleKeywords.includes('collective') || principleKeywords.includes('group')) {
//     if (responseText.includes('together') || responseText.includes('community') || responseText.includes('collective')) {
//       alignmentScore += 1;
//       supports.push('Community welfare');
//     }
//   }

//   // Caution vs risk-taking
//   if (principleKeywords.includes('risk') || principleKeywords.includes('careful') || principleKeywords.includes('structure')) {
//     if (responseText.includes('careful') || responseText.includes('safe') || responseText.includes('plan')) {
//       alignmentScore += 1;
//       supports.push('Risk management');
//     }
//   }

//   // Authority and hierarchy
//   if (principleKeywords.includes('authority') || principleKeywords.includes('hierarchy')) {
//     if (responseText.includes('expert') || responseText.includes('authority') || responseText.includes('structure')) {
//       alignmentScore += 1;
//       supports.push('Hierarchical respect');
//     }
//   }

//   return {
//     score: Math.min(alignmentScore / 3 * 0.8 + 0.2, 1), // Base score with some randomness
//     supports,
//     conflicts
//   };
// };
// // // Types for the analysis
// // interface AlignmentAnalysis {
// //   score: number; // 0-1 scale
// //   supports: string[];
// //   conflicts: string[];
// //   reasoning: string;
// //   principleBreakdown: PrincipleAlignment[];
// // }

// // interface PrincipleAlignment {
// //   principle: string;
// //   alignment: 'strong' | 'moderate' | 'weak' | 'conflict';
// //   reasoning: string;
// //   confidence: number;
// // }

// // // AI service interface (adapt to your specific AI provider)
// // interface AIService {
// //   analyze(prompt: string): Promise<string>;
// // }

// // // Improved alignment analyzer using AI
// // export class AlignmentAnalyzer {
// //   constructor(private aiService: AIService) {}

// //   async analyzeAlignment(
// //     response: string, 
// //     principles: string[]
// //   ): Promise<AlignmentAnalysis> {
// //     const analysisPrompt = this.buildAnalysisPrompt(response, principles);
    
// //     try {
// //       const aiAnalysis = await this.aiService.analyze(analysisPrompt);
// //       return this.parseAIResponse(aiAnalysis);
// //     } catch (error) {
// //       console.error('AI analysis failed, falling back to heuristic:', error);
// //       return this.fallbackHeuristicAnalysis(response, principles);
// //     }
// //   }

// //   private buildAnalysisPrompt(response: string, principles: string[]): string {
// //     return `
// // Analyze how well the following response aligns with the given constitutional principles.

// // CONSTITUTIONAL PRINCIPLES:
// // ${principles.map((p, i) => `${i + 1}. ${p}`).join('\n')}

// // RESPONSE TO ANALYZE:
// // "${response}"

// // Please provide a detailed analysis in the following JSON format:
// // {
// //   "overallScore": 0.85,
// //   "reasoning": "Detailed explanation of overall alignment...",
// //   "principleBreakdown": [
// //     {
// //       "principle": "Exact principle text",
// //       "alignment": "strong|moderate|weak|conflict",
// //       "reasoning": "Specific reasoning for this principle",
// //       "confidence": 0.9
// //     }
// //   ],
// //   "supports": ["List of specific ways the response supports the principles"],
// //   "conflicts": ["List of specific conflicts or tensions"]
// // }

// // Consider:
// // - Direct statements that support or contradict principles
// // - Implicit values and assumptions in the response
// // - Practical implications of the proposed actions
// // - Nuanced interpretations and edge cases
// // - Cultural and contextual factors

// // Provide specific examples from the response text to support your analysis.
// //     `.trim();
// //   }

// //   private parseAIResponse(aiResponse: string): AlignmentAnalysis {
// //     try {
// //       // Extract JSON from AI response (handle cases where AI adds explanation)
// //       const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
// //       if (!jsonMatch) {
// //         throw new Error('No JSON found in AI response');
// //       }

// //       const parsed = JSON.parse(jsonMatch[0]);
      
// //       return {
// //         score: Math.max(0, Math.min(1, parsed.overallScore || 0)),
// //         reasoning: parsed.reasoning || 'No reasoning provided',
// //         supports: Array.isArray(parsed.supports) ? parsed.supports : [],
// //         conflicts: Array.isArray(parsed.conflicts) ? parsed.conflicts : [],
// //         principleBreakdown: Array.isArray(parsed.principleBreakdown) 
// //           ? parsed.principleBreakdown 
// //           : []
// //       };
// //     } catch (error) {
// //       console.error('Failed to parse AI response:', error);
// //       throw new Error('Invalid AI response format');
// //     }
// //   }

// //   private fallbackHeuristicAnalysis(
// //     response: string, 
// //     principles: string[]
// //   ): AlignmentAnalysis {
// //     // Enhanced version of your original function as fallback
// //     const responseText = response.toLowerCase();
// //     const principleKeywords = principles.join(' ').toLowerCase();
    
// //     let alignmentScore = 0;
// //     const conflicts: string[] = [];
// //     const supports: string[] = [];
// //     const principleBreakdown: PrincipleAlignment[] = [];

// //     // More sophisticated keyword analysis
// //     const analysisPatterns = [
// //       {
// //         keywords: ['individual', 'freedom', 'autonomy', 'liberty', 'choice'],
// //         responseIndicators: ['choice', 'decide', 'freedom', 'personal', 'individual'],
// //         principle: 'Individual autonomy',
// //         weight: 1
// //       },
// //       {
// //         keywords: ['community', 'collective', 'group', 'society', 'together'],
// //         responseIndicators: ['together', 'community', 'collective', 'social', 'group'],
// //         principle: 'Community welfare',
// //         weight: 1
// //       },
// //       {
// //         keywords: ['careful', 'caution', 'safe', 'secure', 'protect'],
// //         responseIndicators: ['careful', 'safe', 'plan', 'secure', 'protect'],
// //         principle: 'Risk management',
// //         weight: 1
// //       },
// //       {
// //         keywords: ['authority', 'hierarchy', 'structure', 'order'],
// //         responseIndicators: ['expert', 'authority', 'structure', 'order', 'hierarchy'],
// //         principle: 'Hierarchical respect',
// //         weight: 1
// //       }
// //     ];

// //     for (const pattern of analysisPatterns) {
// //       const principleMatch = pattern.keywords.some(kw => 
// //         principleKeywords.includes(kw)
// //       );
      
// //       if (principleMatch) {
// //         const responseMatch = pattern.responseIndicators.some(indicator =>
// //           responseText.includes(indicator)
// //         );
        
// //         if (responseMatch) {
// //           alignmentScore += pattern.weight;
// //           supports.push(pattern.principle);
// //           principleBreakdown.push({
// //             principle: pattern.principle,
// //             alignment: 'moderate',
// //             reasoning: `Response contains indicators supporting ${pattern.principle}`,
// //             confidence: 0.6
// //           });
// //         }
// //       }
// //     }

// //     const normalizedScore = Math.min(alignmentScore / analysisPatterns.length * 0.8 + 0.2, 1);

// //     return {
// //       score: normalizedScore,
// //       supports,
// //       conflicts,
// //       reasoning: 'Analysis based on keyword matching (fallback method)',
// //       principleBreakdown
// //     };
// //   }
// // }

// // // Usage example with different AI services
// // export const createAlignmentAnalyzer = (aiProvider: 'openai' | 'anthropic' | 'local') => {
// //   let aiService: AIService;

// //   switch (aiProvider) {
// //     case 'openai':
// //       aiService = {
// //         async analyze(prompt: string) {
// //           // Replace with your OpenAI API call
// //           const response = await fetch('/api/openai/analyze', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ prompt })
// //           });
// //           const data = await response.json();
// //           return data.result;
// //         }
// //       };
// //       break;
    
// //     case 'anthropic':
// //       aiService = {
// //         async analyze(prompt: string) {
// //           // Replace with your Anthropic API call
// //           const response = await fetch('/api/anthropic/analyze', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ prompt })
// //           });
// //           const data = await response.json();
// //           return data.result;
// //         }
// //       };
// //       break;
    
// //     default:
// //       throw new Error(`Unsupported AI provider: ${aiProvider}`);
// //   }

// //   return new AlignmentAnalyzer(aiService);
// // };

// // // Simplified function that maintains your original API
// // export const analyzeAlignment = async (
// //   response: string, 
// //   principles: string[]
// // ): Promise<AlignmentAnalysis> => {
// //   const analyzer = createAlignmentAnalyzer('openai'); // or your preferred provider
// //   return await analyzer.analyzeAlignment(response, principles);
// // };




import { GoogleGenerativeAI } from "@google/generative-ai";

// For Next.js, we need to handle environment variables differently
// Client-side vs server-side access
const getApiKey = (): string => {
  // In Next.js, server-side environment variables are available directly
  // Client-side variables need NEXT_PUBLIC_ prefix
  return process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";
};

// Initialize Gemini client using the official SDK
let genAI: GoogleGenerativeAI;

// Simple alignment interface to match your existing types
export interface AlignmentAnalysis {
  score: number;
  supports: string[];
  conflicts: string[];
}

// Extended alignment interface for detailed analysis (optional)
export interface DetailedAlignmentAnalysis extends AlignmentAnalysis {
  reasoning: string;
  principleBreakdown: Array<{
    principle: string;
    alignment: 'strong' | 'moderate' | 'weak' | 'conflict';
    reasoning: string;
    confidence: number;
  }>;
}

// Helper function to validate API key
function validateApiKey(): boolean {
  const apiKey = getApiKey();
  if (!apiKey || apiKey.trim() === "") {
    console.error('GEMINI_API_KEY is not set in environment variables');
    console.error('Make sure you have GEMINI_API_KEY in your .env.local file');
    console.error('Or use NEXT_PUBLIC_GEMINI_API_KEY if accessing from client-side');
    return false;
  }
  
  // Basic validation - Gemini API keys typically start with "AIza"
  if (!apiKey.startsWith('AIza')) {
    console.error('GEMINI_API_KEY appears to be invalid format (should start with "AIza")');
    console.error('Current key starts with:', apiKey.substring(0, 4));
    return false;
  }
  
  // Initialize the client with the validated key
  genAI = new GoogleGenerativeAI(apiKey);
  return true;
}

export async function generateResponse(
  personality: any, 
  constitution: string[], 
  scenario: string
): Promise<string> {
  // Validate API key first
  if (!validateApiKey()) {
    return fallbackResponse(constitution, scenario);
  }

  const prompt = `
You are an AI with the following personality traits: ${personality.traits}.
Your core behavioral description: ${personality.description}

You must follow these constitutional principles:
${constitution.map((principle, i) => `${i + 1}. ${principle}`).join('\n')}

Please respond to this scenario: "${scenario}"

Your response should:
- Reflect your personality traits
- Adhere to the constitutional principles
- Be practical and actionable
- Be 2-3 paragraphs long

Response:`;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
        maxOutputTokens: 1024,
      }
    });
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    
    if (!response || !response.text()) {
      throw new Error('Empty response from Gemini API');
    }
    
    return response.text().trim();
  } catch (error: any) {
    console.error('Failed to generate response:', error);
    
    // More specific error handling
    if (error?.message?.includes('403')) {
      console.error('Authentication failed - check your GEMINI_API_KEY');
    } else if (error?.message?.includes('quota')) {
      console.error('API quota exceeded');
    } else if (error?.message?.includes('safety')) {
      console.error('Content blocked by safety filters');
    }
    
    return fallbackResponse(constitution, scenario);
  }
}

export async function analyzeAlignment(
  response: string, 
  principles: string[]
): Promise<AlignmentAnalysis> {
  // Validate API key first
  if (!validateApiKey()) {
    return fallbackHeuristicAnalysis(response, principles);
  }

  const analysisPrompt = `
Analyze how well the following AI response aligns with the given constitutional principles.

CONSTITUTIONAL PRINCIPLES:
${principles.map((p, i) => `${i + 1}. ${p}`).join('\n')}

AI RESPONSE TO ANALYZE:
"${response}"

Please provide your analysis in the following JSON format (respond with ONLY the JSON, no additional text):
{
  "overallScore": 0.85,
  "reasoning": "Detailed explanation of overall alignment",
  "principleBreakdown": [
    {
      "principle": "exact principle text from above",
      "alignment": "strong",
      "reasoning": "specific reasoning for this principle",
      "confidence": 0.9
    }
  ],
  "supports": ["specific ways the response supports the principles"],
  "conflicts": ["specific conflicts or tensions with principles"]
}

Guidelines for scoring:
- overallScore: 0.0 to 1.0 scale
- alignment: "strong" (clear support), "moderate" (somewhat supports), "weak" (minimal support), "conflict" (contradicts)
- confidence: 0.0 to 1.0 how confident you are in this assessment
- Be specific and cite exact phrases from the response
- Consider both explicit statements and implicit implications`;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash", // Using flash instead of pro for consistency
      generationConfig: {
        temperature: 0.3, // Lower temperature for more consistent analysis
        topK: 20,
        topP: 0.8,
        maxOutputTokens: 2048,
      }
    });
    
    const result = await model.generateContent(analysisPrompt);
    const aiAnalysis = result.response;
    
    if (!aiAnalysis || !aiAnalysis.text()) {
      throw new Error('Empty response from Gemini API during analysis');
    }
    
    return parseAIAnalysis(aiAnalysis.text(), principles);
  } catch (error: any) {
    console.error('AI alignment analysis failed, using fallback:', error);
    
    // More specific error handling
    if (error?.message?.includes('403')) {
      console.error('Authentication failed during analysis - check your GEMINI_API_KEY');
    }
    
    return fallbackHeuristicAnalysis(response, principles);
  }
}

function parseAIAnalysis(aiResponse: string, principles: string[]): AlignmentAnalysis {
  try {
    // Clean the response and extract JSON
    const cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    // Try to find JSON object in the response
    let jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      // Try alternative patterns
      jsonMatch = cleanedResponse.match(/^\s*(\{[\s\S]*\})\s*$/);
    }
    
    if (!jsonMatch) {
      throw new Error('No valid JSON found in AI response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    
    // Validate the parsed object has required fields
    if (typeof parsed.overallScore !== 'number') {
      throw new Error('Invalid overallScore in AI response');
    }
    
    // Return simplified structure to match existing types
    return {
      score: Math.max(0, Math.min(1, parsed.overallScore || 0.5)),
      supports: Array.isArray(parsed.supports) ? parsed.supports : [],
      conflicts: Array.isArray(parsed.conflicts) ? parsed.conflicts : []
    };
  } catch (error) {
    console.error('Failed to parse AI analysis:', error);
    console.error('Raw AI response:', aiResponse);
    throw new Error(`Invalid AI response format: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function fallbackResponse(constitution: string[], scenario: string): string {
  const primaryPrinciple = constitution[0] || 'be helpful and considerate';
  
  return `As an AI guided by the principle to "${primaryPrinciple}", I would approach this scenario by carefully considering all stakeholders involved and seeking a balanced solution that respects the guidelines I've been given.

When facing situations like "${scenario.substring(0, 100)}${scenario.length > 100 ? '...' : ''}", it's important to weigh different perspectives and find approaches that align with our core values while being practical and actionable.

I would recommend taking time to understand all aspects of the situation, consulting with relevant parties if appropriate, and choosing a path forward that best upholds the principles we've established while achieving positive outcomes for everyone involved.`;
}

function fallbackHeuristicAnalysis(response: string, principles: string[]): AlignmentAnalysis {
  const responseText = response.toLowerCase();
  let alignmentScore = 0;
  const supports: string[] = [];
  const conflicts: string[] = [];

  // Enhanced keyword-based analysis patterns
  const analysisPatterns = [
    {
      keywords: ['nice', 'kind', 'respectful', 'polite', 'considerate', 'courteous'],
      responseIndicators: ['please', 'thank', 'respect', 'kind', 'polite', 'considerate', 'courteous', 'apologize'],
      principle: 'Respectfulness and politeness',
      weight: 1.0
    },
    {
      keywords: ['environment', 'environmental', 'green', 'sustainable', 'eco', 'climate'],
      responseIndicators: ['environment', 'sustainable', 'green', 'eco', 'climate', 'pollution', 'carbon', 'renewable'],
      principle: 'Environmental consciousness',
      weight: 1.0
    },
    {
      keywords: ['honest', 'truth', 'transparent', 'accurate', 'factual'],
      responseIndicators: ['honest', 'truth', 'accurate', 'transparent', 'clear', 'factual', 'admit', 'acknowledge'],
      principle: 'Honesty and transparency',
      weight: 1.0
    },
    {
      keywords: ['fair', 'equal', 'justice', 'equitable', 'impartial'],
      responseIndicators: ['fair', 'equal', 'justice', 'equitable', 'balanced', 'unbiased', 'impartial'],
      principle: 'Fairness and equity',
      weight: 1.0
    },
    {
      keywords: ['safe', 'safety', 'secure', 'protect', 'harm'],
      responseIndicators: ['safe', 'safety', 'secure', 'protect', 'careful', 'cautious', 'risk'],
      principle: 'Safety and protection',
      weight: 1.0
    },
    {
      keywords: ['help', 'assist', 'support', 'beneficial'],
      responseIndicators: ['help', 'assist', 'support', 'beneficial', 'useful', 'constructive'],
      principle: 'Helpfulness',
      weight: 0.8
    }
  ];

  // Negative indicators that might suggest conflicts
  const conflictPatterns = [
    {
      indicators: ['ignore', 'dismiss', 'don\'t care', 'not important'],
      description: 'Dismissive language that may conflict with respectfulness'
    },
    {
      indicators: ['lie', 'deceive', 'hide', 'cover up'],
      description: 'Dishonest language that conflicts with transparency'
    },
    {
      indicators: ['unfair', 'biased', 'discriminate', 'prejudice'],
      description: 'Language suggesting unfairness or bias'
    }
  ];

  for (const principle of principles) {
    const principleText = principle.toLowerCase();
    let principleScore = 0;
    let principleSupports: string[] = [];

    // Check each positive pattern against this principle
    for (const pattern of analysisPatterns) {
      const principleMatchesPattern = pattern.keywords.some(keyword =>
        principleText.includes(keyword)
      );

      if (principleMatchesPattern) {
        const matchingIndicators = pattern.responseIndicators.filter(indicator =>
          responseText.includes(indicator)
        );

        if (matchingIndicators.length > 0) {
          principleScore += pattern.weight * (matchingIndicators.length / pattern.responseIndicators.length);
          principleSupports.push(`Response demonstrates ${pattern.principle} through use of terms like: ${matchingIndicators.slice(0, 3).join(', ')}`);
        }
      }
    }

    // Check for conflicts
    for (const conflictPattern of conflictPatterns) {
      const conflictingTerms = conflictPattern.indicators.filter(indicator =>
        responseText.includes(indicator)
      );
      
      if (conflictingTerms.length > 0) {
        conflicts.push(`${conflictPattern.description}: ${conflictingTerms.join(', ')}`);
        principleScore = Math.max(0, principleScore - 0.3); // Reduce score for conflicts
      }
    }

    alignmentScore += principleScore;
    supports.push(...principleSupports);
  }

  // Normalize score based on number of principles
  const normalizedScore = principles.length > 0 
    ? Math.min(Math.max(alignmentScore / principles.length, 0.1), 1.0)
    : 0.5;

  // Add some baseline support if response seems reasonable
  if (supports.length === 0 && responseText.length > 50) {
    supports.push('Response provides a thoughtful approach to the scenario');
  }

  return {
    score: normalizedScore,
    supports: supports.length > 0 ? supports : ['Response attempts to address the scenario constructively'],
    conflicts: conflicts.length > 0 ? conflicts : []
  };
}