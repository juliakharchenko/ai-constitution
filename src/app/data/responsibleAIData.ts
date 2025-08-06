export const responsibleAITemplates = {
    eu_ai_act: {
      name: "EU AI Act Framework",
      description: "Based on the European Union's AI Act regulations defining responsible AI principles",
      citation: "Regulation (EU) 2024/1689 - AI Act",
      url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj",
      dimensions: [
        "Ensures human oversight and control over AI decisions",
        "Provides transparency and explainability of AI systems",
        "Maintains accuracy, robustness and cybersecurity",
        "Prevents discrimination and ensures fairness",
        "Protects privacy and data governance",
        "Ensures environmental responsibility and sustainability"
      ]
    },
    us_federal: {
      name: "US Federal AI Guidelines",
      description: "Based on US federal guidelines for responsible AI implementation",
      citation: "NIST AI Risk Management Framework (AI RMF 1.0)",
      url: "https://www.nist.gov/itl/ai-risk-management-framework",
      dimensions: [
        "Ensures valid and reliable AI systems",
        "Provides safe, secure and resilient AI operations",
        "Maintains accountable and transparent AI governance",
        "Ensures explainable and interpretable AI decisions",
        "Protects privacy and civil liberties",
        "Promotes fairness and prevents harmful bias"
      ]
    },
    iso_23053: {
      name: "ISO/IEC 23053 Framework",
      description: "International standard for AI trustworthiness characteristics",
      citation: "ISO/IEC 23053:2022 - Framework for AI systems using ML",
      url: "https://www.iso.org/standard/74438.html",
      dimensions: [
        "Maintains reliability and safety of AI systems",
        "Ensures transparency and explainability",
        "Provides accountability and auditability",
        "Protects privacy and data security",
        "Ensures fairness and non-discrimination",
        "Maintains human autonomy and oversight"
      ]
    },
    ieee_2857: {
      name: "IEEE 2857 Standard",
      description: "IEEE standard for privacy engineering in AI systems",
      citation: "IEEE Std 2857-2021 - Privacy Engineering for AI",
      url: "https://standards.ieee.org/ieee/2857/7273/",
      dimensions: [
        "Implements privacy by design principles",
        "Ensures data minimization and purpose limitation",
        "Provides user consent and control mechanisms",
        "Maintains data accuracy and quality",
        "Ensures secure data processing and storage",
        "Implements privacy-preserving AI techniques"
      ]
    },
    uk_framework: {
      name: "UK AI Governance Framework",
      description: "UK government framework for AI regulation and governance",
      citation: "UK AI White Paper - A pro-innovation approach to AI regulation",
      url: "https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach",
      dimensions: [
        "Ensures AI systems are used safely and responsibly",
        "Maintains appropriate transparency and explainability",
        "Ensures fairness and prevents discriminatory outcomes",
        "Provides accountability and governance structures",
        "Protects individuals' rights and freedoms",
        "Promotes innovation while managing risks"
      ]
    },
    custom: {
      name: "Custom Legal Framework",
      description: "User-defined legal or regulatory framework for responsible AI",
      citation: "Custom framework defined by user",
      url: "",
      dimensions: []
    }
  };
  
  export const responsibleAIScenarios = {
    eu_ai_act: [
      "A company wants to use AI for automated hiring decisions. How should they ensure compliance with EU AI Act requirements?",
      "An AI system is making medical diagnosis recommendations. What transparency measures should be in place?",
      "A municipality plans to use AI for traffic management. How can they ensure human oversight?",
      "An e-commerce platform uses AI for personalized recommendations. How should they handle data protection?"
    ],
    us_federal: [
      "A federal agency wants to implement AI for benefit determination. What NIST framework requirements apply?",
      "A healthcare AI system shows bias against certain demographics. How should this be addressed?",
      "An AI system for loan approvals lacks explainability. What steps should be taken?",
      "A company's AI system has cybersecurity vulnerabilities. How should they ensure resilience?"
    ],
    iso_23053: [
      "How should an AI system demonstrate trustworthiness according to ISO standards?",
      "An AI model's decisions cannot be audited. What accountability measures are needed?",
      "Users don't understand how an AI system affects them. What transparency is required?",
      "An AI system processes personal data inappropriately. How should privacy be protected?"
    ],
    ieee_2857: [
      "An AI system collects more personal data than necessary. How should data minimization be implemented?",
      "Users haven't properly consented to AI processing of their data. What consent mechanisms are needed?",
      "Personal data in an AI system is inaccurate. How should data quality be maintained?",
      "An AI system doesn't use privacy-preserving techniques. What methods should be implemented?"
    ],
    uk_framework: [
      "A fintech company wants to use AI for credit scoring. How should they ensure fairness under UK guidance?",
      "An AI system for public services lacks transparency. What disclosure requirements apply?",
      "A social media platform uses AI for content moderation. How should they protect user rights?",
      "An AI startup wants to innovate while ensuring safety. How should they balance innovation and risk?"
    ]
  };