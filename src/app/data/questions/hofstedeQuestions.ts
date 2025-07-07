import { QuestionnaireQuestion } from "../../types";

// Hofstede questionnaire
export const hofstedeQuestions: QuestionnaireQuestion[] = [
    {
      id: "pd1",
      text: "It's important that bosses make decisions without consulting their employees.",
      dimension: "powerDistance",
      weight: 1
    },
    {
      id: "pd2",
      text: "Employees should question their superiors when they disagree.",
      dimension: "powerDistance",
      weight: -1
    },
    {
      id: "pd3",
      text: "A good leader should be accessible and treat everyone equally.",
      dimension: "powerDistance",
      weight: -1
    },
    {
      id: "ic1",
      text: "Individual achievement is more important than group harmony.",
      dimension: "individualismCollectivism",
      weight: 1
    },
    {
      id: "ic2",
      text: "Personal time is more important than time with colleagues.",
      dimension: "individualismCollectivism",
      weight: 1
    },
    {
      id: "ic3",
      text: "Group decisions are usually better than individual decisions.",
      dimension: "individualismCollectivism",
      weight: -1
    },
    {
      id: "mf1",
      text: "Competition between individuals is natural and beneficial.",
      dimension: "masculinityFemininity",
      weight: 1
    },
    {
      id: "mf2",
      text: "Quality of life is more important than career advancement.",
      dimension: "masculinityFemininity",
      weight: -1
    },
    {
      id: "mf3",
      text: "Success should be measured by material achievements.",
      dimension: "masculinityFemininity",
      weight: 1
    },
    {
      id: "ua1",
      text: "Rules should be followed even when they seem pointless.",
      dimension: "uncertaintyAvoidance",
      weight: 1
    },
    {
      id: "ua2",
      text: "I'm comfortable in unpredictable situations.",
      dimension: "uncertaintyAvoidance",
      weight: -1
    },
    {
      id: "ua3",
      text: "Clear structure and guidelines are essential for good work.",
      dimension: "uncertaintyAvoidance",
      weight: 1
    },
    {
      id: "lto1",
      text: "Traditional values should be preserved and respected.",
      dimension: "longTermOrientation",
      weight: -1
    },
    {
      id: "lto2",
      text: "Adapting to changing circumstances is more important than following tradition.",
      dimension: "longTermOrientation",
      weight: 1
    },
    {
      id: "lto3",
      text: "Planning for the future is more important than respecting the past.",
      dimension: "longTermOrientation",
      weight: 1
    },
    {
      id: "ir1",
      text: "People should control their desires and impulses.",
      dimension: "indulgenceRestraint",
      weight: -1
    },
    {
      id: "ir2",
      text: "It's important to enjoy life and have fun.",
      dimension: "indulgenceRestraint",
      weight: 1
    },
    {
      id: "ir3",
      text: "Self-discipline is more important than personal gratification.",
      dimension: "indulgenceRestraint",
      weight: -1
    }
  ];