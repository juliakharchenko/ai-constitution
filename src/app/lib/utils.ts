import { BookOpen, Zap, Users, Heart, Shield, Brain, LucideIcon } from 'lucide-react';

export const getIconComponent = (iconName: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    BookOpen,
    Zap,
    Users,
    Heart,
    Shield,
    Brain,
  };
  
  return iconMap[iconName] || BookOpen;
};