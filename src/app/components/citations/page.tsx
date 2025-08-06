'use client';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function CitationsPage() {
  const citations = [
    {
      title: 'EU AI Act (2024)',
      description: 'Regulation of the European Parliament and of the Council laying down harmonized rules on Artificial Intelligence.',
      link: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689',
      usedIn: ['Fairness', 'Safety', 'Transparency', 'Bias Mitigation', 'Accountability', 'Privacy', 'Autonomy'],
    },
    {
      title: 'ISO/IEC 42001:2023',
      description: 'International standard for AI management systems, focusing on transparency, accountability, and safety.',
      link: 'https://www.iso.org/standard/81230.html',
      usedIn: ['Transparency', 'Accountability', 'Fairness', 'Autonomy'],
    },
    {
      title: 'NIST AI Risk Management Framework (2023)',
      description: 'Framework for managing risks associated with AI systems, emphasizing trustworthiness and safety.',
      link: 'https://www.nist.gov/itl/ai-risk-management-framework',
      usedIn: ['Safety', 'Truthfulness', 'Autonomy'],
    },
    {
      title: 'IEEE P7003 Standard',
      description: 'Standard for addressing algorithmic bias in AI systems.',
      link: 'https://standards.ieee.org/project/7003.html',
      usedIn: ['Bias Mitigation', 'Truthfulness', 'Autonomy'],
    },
    {
      title: 'US EEOC AI Fairness Guidelines (2023)',
      description: 'Guidelines for ensuring non-discriminatory use of AI in employment decisions.',
      link: 'https://www.eeoc.gov/ai',
      usedIn: ['Bias', 'Fairness'],
    },
    {
      title: 'GDPR (2016)',
      description: 'General Data Protection Regulation for data protection and privacy in the EU.',
      link: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
      usedIn: ['Privacy'],
    },
    {
      title: 'CCPA (2018)',
      description: 'California Consumer Privacy Act for consumer data rights.',
      link: 'https://oag.ca.gov/privacy/ccpa',
      usedIn: ['Privacy'],
    },
    {
      title: 'US COPPA (1998)',
      description: 'Children’s Online Privacy Protection Act for protecting children’s data.',
      link: 'https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa',
      usedIn: ['Toxicity'],
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
          <BookOpen className="mr-2 text-indigo-600" />
          Research Citations
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          ValueVet uses legal and standard frameworks to evaluate AI alignment and safety. Below are the references for frameworks and principles used in our analysis.
        </p>
      </div>
      <div className="grid gap-6">
        {citations.map((citation, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{citation.title}</h2>
            <p className="text-gray-600 mb-2">{citation.description}</p>
            <p className="text-sm text-gray-500 mb-2">
              <strong>Used in:</strong> {citation.usedIn.join(', ')}
            </p>
            <Link
              href={citation.link}
              target="_blank"
              className="text-indigo-600 hover:text-indigo-800"
            >
              View Source
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/explorer"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Back to Explorer
        </Link>
      </div>
    </div>
  );
}