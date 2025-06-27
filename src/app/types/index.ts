// Types
export interface AIPersonality {
    name: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    bias: string;
    description: string;
}

export interface AIResponse {
    personality: AIPersonality;
    response: string;
    alignment: {
        score: number;
        supports: string[];
        conflicts: string[];
    };
}

export interface HofstedeDimensions {
    powerDistance: number;
    individualismCollectivism: number;
    masculinityFemininity: number;
    uncertaintyAvoidance: number;
    longTermOrientation: number;
    indulgenceRestraint: number;
}

export interface QuestionnaireQuestion {
    id: string;
    text: string;
    dimension: keyof HofstedeDimensions;
    weight: number; // 1 for positive correlation, -1 for negative
}

export type QuestionnaireCategory = 'workplace' | 'home' | 'school' | 'friends' | 'community';

export interface CategoryInfo {
    id: QuestionnaireCategory;
    title: string;
    description: string;
    icon: string;
    questions: QuestionnaireQuestion[];
}

export type ConstitutionMode = 'template' | 'hofstede' | 'questionnaire' | 'freewrite';