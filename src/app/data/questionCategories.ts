  import { CategoryInfo } from "../types";
  import { hofstedeQuestions } from "./questions/hofstedeQuestions";
  import { hofstedeQuestionsCommunity } from "./questions/hofstedeQuestionsCommunity";
  import { hofstedeQuestionsHome } from "./questions/hofstedeQuestionsHome";
  import { hofstedeQuestionsSchool } from "./questions/hofstedeQuestionsSchool";
  import { hofstedeQuestionsFriends } from "./questions/hofstedeQuestionsFriends";

  // Define category information
  export const questionnaireCategories: CategoryInfo[] = [
    {
      id: 'workplace',
      title: 'Workplace',
      description: 'How you approach work relationships, hierarchy, and professional environments',
      icon: '💼',
      questions: hofstedeQuestions // original questions
    },
    {
      id: 'home',
      title: 'Home & Family',
      description: 'Your values regarding family dynamics, household decisions, and relationships',
      icon: '🏠',
      questions: hofstedeQuestionsHome
    },
    {
      id: 'school',
      title: 'School & Education',
      description: 'Your approach to learning, academic environments, and educational relationships',
      icon: '🎓',
      questions: hofstedeQuestionsSchool
    },
    {
      id: 'friends',
      title: 'Friends & Social',
      description: 'How you navigate friendships, social groups, and peer relationships',
      icon: '👥',
      questions: hofstedeQuestionsFriends
    },
    {
      id: 'community',
      title: 'Community & Neighborhood',
      description: 'Your views on civic participation, local governance, and community involvement',
      icon: '🏘️',
      questions: hofstedeQuestionsCommunity
    }
  ];