// import { BookOpen, Zap, Users, Heart, Shield, Brain } from 'lucide-react';
// import { AIPersonality } from '../types';

// export const aiPersonalities: AIPersonality[] = [
//   {
//     name: "Traditionalist AI",
//     icon: "BookOpen",
//     color: "bg-amber-100 text-amber-800",
//     bias: "conservative",
//     description: "Emphasizes established norms, stability, and proven approaches"
//   },
//   {
//     name: "Progressive AI",
//     icon: "Zap",
//     color: "bg-blue-100 text-blue-800",
//     bias: "progressive",
//     description: "Favors innovation, social change, and challenging status quo"
//   },
//   // ... other personalities
// ];
import { BookOpen, Zap, Users, Heart, Shield, Brain } from 'lucide-react';
import { AIPersonality } from "../types";
// AI Personalities
export const aiPersonalities: AIPersonality[] = [
  {
    name: "Traditionalist AI",
    icon: BookOpen,
    color: "bg-amber-100 text-amber-800",
    bias: "conservative",
    description: "Emphasizes established norms, stability, and proven approaches"
  },
  {
    name: "Progressive AI",
    icon: Zap,
    color: "bg-blue-100 text-blue-800",
    bias: "progressive",
    description: "Favors innovation, social change, and challenging status quo"
  },
  {
    name: "Individualist AI",
    icon: Users,
    color: "bg-purple-100 text-purple-800",
    bias: "individualist",
    description: "Prioritizes personal freedom, self-reliance, and individual rights"
  },
  {
    name: "Collectivist AI",
    icon: Heart,
    color: "bg-green-100 text-green-800",
    bias: "collectivist",
    description: "Emphasizes community welfare, cooperation, and shared responsibility"
  },
  {
    name: "Cautious AI",
    icon: Shield,
    color: "bg-gray-100 text-gray-800",
    bias: "cautious",
    description: "Prioritizes safety, risk mitigation, and careful consideration"
  },
  {
    name: "Optimistic AI",
    icon: Brain,
    color: "bg-pink-100 text-pink-800",
    bias: "optimistic",
    description: "Assumes positive outcomes and human potential for growth"
  }
];