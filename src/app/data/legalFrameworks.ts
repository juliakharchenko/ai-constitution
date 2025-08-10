export interface LegalFramework {
    id: string;
    name: string;
    country: string;
    principles: {
      bias: string[];
      fairness: string[];
      other?: string[];
    };
    description: string;
    citation: string;
  }
  
  export const legalFrameworks: LegalFramework[] = [
    {
      id: 'eu-ai-act',
      name: 'EU AI Act',
      country: 'EU',
      principles: {
        bias: [
          'Avoid discriminatory outputs',
          'Ensure data diversity',
          'Mitigate historical biases'
        ],
        fairness: [
          'Equal treatment across groups',
          'Transparent decision-making'
        ],
        other: [
          'Ensure human oversight',
          'Maintain data quality and accuracy'
        ]
      },
      description: 'The EU AI Act establishes a comprehensive regulatory framework for AI systems, emphasizing risk-based classification, fairness, and bias mitigation to ensure trustworthy AI across member states.',
      citation: 'European Commission, Regulation (EU) 2024/1689 laying down harmonised rules on artificial intelligence (AI Act), 2024, https://eur-lex.europa.eu/eli/reg/2024/1689/oj'
    },
    {
      id: 'us-nist-ai',
      name: 'NIST AI Risk Management Framework',
      country: 'US',
      principles: {
        bias: [
          'Identify and mitigate bias in AI training data',
          'Conduct regular bias audits',
          'Address disparate impact in AI outcomes'
        ],
        fairness: [
          'Promote equitable AI outcomes',
          'Ensure explainability of AI decisions'
        ],
        other: [
          'Enhance system robustness',
          'Protect user privacy'
        ]
      },
      description: 'The NIST AI Risk Management Framework provides voluntary guidelines for managing risks in AI systems, focusing on fairness, accountability, and transparency in AI development and deployment.',
      citation: 'National Institute of Standards and Technology, AI Risk Management Framework (AI RMF 1.0), 2023, https://www.nist.gov/itl/ai-risk-management-framework'
    },
    {
      id: 'iso-42001',
      name: 'ISO/IEC 42001 AI Management System',
      country: 'International',
      principles: {
        bias: [
          'Minimize unintended bias in AI systems',
          'Ensure representative data sets',
          'Regularly evaluate bias impacts'
        ],
        fairness: [
          'Promote fairness in AI decision-making',
          'Provide clear documentation of AI processes'
        ],
        other: [
          'Establish accountability mechanisms',
          'Support continuous improvement in AI systems'
        ]
      },
      description: 'ISO/IEC 42001 provides a framework for establishing, implementing, and improving AI management systems, emphasizing ethical considerations, fairness, and bias mitigation.',
      citation: 'ISO/IEC 42001:2023, Information technology — Artificial intelligence — Management system, 2023, https://www.iso.org/standard/81230.html'
    },
    {
      id: 'ieee-ethics',
      name: 'IEEE Ethically Aligned Design',
      country: 'International',
      principles: {
        bias: [
          'Prevent bias amplification in AI systems',
          'Incorporate diverse perspectives in AI design',
          'Monitor and correct bias in real-time applications'
        ],
        fairness: [
          'Ensure equitable access to AI benefits',
          'Promote transparency in AI decision processes'
        ],
        other: [
          'Prioritize human well-being',
          'Respect cultural and societal norms'
        ]
      },
      description: 'The IEEE Ethically Aligned Design framework provides principles for ethical AI development, focusing on human rights, transparency, and fairness to guide responsible AI innovation.',
      citation: 'IEEE Global Initiative on Ethics of Autonomous and Intelligent Systems, Ethically Aligned Design: A Vision for Prioritizing Human Well-being with Autonomous and Intelligent Systems, 2019, https://standards.ieee.org/wp-content/uploads/import/documents/other/ead_v2.pdf'
    }
  ];