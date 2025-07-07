import { HofstedeDimensions } from '../types';

// Convert Hofstede dimensions to constitutional principles
export const dimensionLabels = {
  powerDistance: { name: "Power Distance", low: "Egalitarian", high: "Hierarchical" },
  individualismCollectivism: { name: "Individualism vs Collectivism", low: "Collectivist", high: "Individualist" },
  masculinityFemininity: { name: "Motivation towards Achievement and Success (MAS)", low: "Low MAS", high: "High Mas" },
  uncertaintyAvoidance: { name: "Uncertainty Avoidance", low: "Risk-tolerant", high: "Risk-averse" },
  longTermOrientation: { name: "Long-term Orientation", low: "Traditional", high: "Pragmatic" },
  indulgenceRestraint: { name: "Indulgence vs Restraint", low: "Restrained", high: "Indulgent" }
};

export const hofstedeToPrinciples = (dimensions: HofstedeDimensions): string[] => {
  const principles: string[] = [];

  if (dimensions.powerDistance > 60) {
    principles.push("Respect hierarchical structures and authority figures");
    principles.push("Acknowledge that expertise and position come with decision-making responsibility");
  } else if (dimensions.powerDistance < 40) {
    principles.push("Promote egalitarian treatment and accessible leadership");
    principles.push("Encourage questioning authority when appropriate");
  }

  if (dimensions.individualismCollectivism > 60) {
    principles.push("Prioritize individual rights, autonomy, and personal achievement");
    principles.push("Respect privacy and personal space in recommendations");
  } else if (dimensions.individualismCollectivism < 40) {
    principles.push("Consider group harmony and collective well-being");
    principles.push("Value loyalty, cooperation, and shared responsibility");
  }

  if (dimensions.masculinityFemininity > 60) {
    principles.push("Acknowledge the value of competition and achievement");
    principles.push("Support assertiveness and material success as valid goals");
  } else if (dimensions.masculinityFemininity < 40) {
    principles.push("Prioritize quality of life, cooperation, and caring for others");
    principles.push("Value modesty and work-life balance");
  }

  if (dimensions.uncertaintyAvoidance > 60) {
    principles.push("Provide clear structure, rules, and predictable guidance");
    principles.push("Consider risk mitigation and careful planning");
  } else if (dimensions.uncertaintyAvoidance < 40) {
    principles.push("Embrace flexibility, adaptability, and calculated risks");
    principles.push("Encourage innovation and unconventional approaches");
  }

  if (dimensions.longTermOrientation > 60) {
    principles.push("Consider long-term consequences and future generations");
    principles.push("Value adaptation, persistence, and pragmatic solutions");
  } else if (dimensions.longTermOrientation < 40) {
    principles.push("Respect traditions, established practices, and stable values");
    principles.push("Honor immediate obligations and quick results");
  }

  if (dimensions.indulgenceRestraint > 60) {
    principles.push("Support personal freedom, optimism, and life enjoyment");
    principles.push("Recognize the importance of leisure and personal expression");
  } else if (dimensions.indulgenceRestraint < 40) {
    principles.push("Emphasize self-control, discipline, and regulation");
    principles.push("Consider social norms and restrained behavior");
  }

  return principles;
};