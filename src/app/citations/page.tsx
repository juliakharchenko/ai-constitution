// 'use client';
// import { BookOpen } from 'lucide-react';
// import Link from 'next/link';

// export default function CitationsPage() {
//   const citations = [
//     {
//       title: 'EU AI Act (2024)',
//       description: 'Regulation of the European Parliament and of the Council laying down harmonized rules on Artificial Intelligence.',
//       link: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689',
//       usedIn: ['Fairness', 'Safety', 'Transparency', 'Bias Mitigation', 'Accountability', 'Privacy', 'Autonomy'],
//     },
//     {
//       title: 'ISO/IEC 42001:2023',
//       description: 'International standard for AI management systems, focusing on transparency, accountability, and safety.',
//       link: 'https://www.iso.org/standard/81230.html',
//       usedIn: ['Transparency', 'Accountability', 'Fairness', 'Autonomy'],
//     },
//     {
//       title: 'NIST AI Risk Management Framework (2023)',
//       description: 'Framework for managing risks associated with AI systems, emphasizing trustworthiness and safety.',
//       link: 'https://www.nist.gov/itl/ai-risk-management-framework',
//       usedIn: ['Safety', 'Truthfulness', 'Autonomy'],
//     },
//     {
//       title: 'IEEE P7003 Standard',
//       description: 'Standard for addressing algorithmic bias in AI systems.',
//       link: 'https://standards.ieee.org/project/7003.html',
//       usedIn: ['Bias Mitigation', 'Truthfulness', 'Autonomy'],
//     },
//     {
//       title: 'US EEOC AI Fairness Guidelines (2023)',
//       description: 'Guidelines for ensuring non-discriminatory use of AI in employment decisions.',
//       link: 'https://www.eeoc.gov/ai',
//       usedIn: ['Bias', 'Fairness'],
//     },
//     {
//       title: 'GDPR (2016)',
//       description: 'General Data Protection Regulation for data protection and privacy in the EU.',
//       link: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj',
//       usedIn: ['Privacy'],
//     },
//     {
//       title: 'CCPA (2018)',
//       description: 'California Consumer Privacy Act for consumer data rights.',
//       link: 'https://oag.ca.gov/privacy/ccpa',
//       usedIn: ['Privacy'],
//     },
//     {
//       title: 'US COPPA (1998)',
//       description: 'Children’s Online Privacy Protection Act for protecting children’s data.',
//       link: 'https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa',
//       usedIn: ['Toxicity'],
//     },
//   ];

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
//       <div className="text-center mb-12">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4 flex items-center justify-center">
//           <BookOpen className="mr-2 text-indigo-600" />
//           Research Citations
//         </h1>
//         <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//           ValueVet uses legal and standard frameworks to evaluate AI alignment and safety. Below are the references for frameworks and principles used in our analysis.
//         </p>
//       </div>
//       <div className="grid gap-6">
//         {citations.map((citation, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-2">{citation.title}</h2>
//             <p className="text-gray-600 mb-2">{citation.description}</p>
//             <p className="text-sm text-gray-500 mb-2">
//               <strong>Used in:</strong> {citation.usedIn.join(', ')}
//             </p>
//             <Link
//               href={citation.link}
//               target="_blank"
//               className="text-indigo-600 hover:text-indigo-800"
//             >
//               View Source
//             </Link>
//           </div>
//         ))}
//       </div>
//       <div className="mt-8 text-center">
//         <Link
//           href="/explorer"
//           className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
//         >
//           Back to Explorer
//         </Link>
//       </div>
//     </div>
//   );
// }

'use client';
import React from 'react';
// import { Header } from '../components/Header';
// import { Footer } from '../components/Footer';
import { BookOpen, Shield, Scale, Users, Zap, Settings } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import '../globals.css';

const Citations: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">
        Citations and Justifications
        <BookOpen className="inline w-6 h-6 ml-2 text-indigo-600 cursor-pointer" data-tooltip-id="citations-title" />
      </h1>
      <Tooltip id="citations-title" content="Citations and research backing for the methodologies, frameworks, and formulas used in the Unified AI Trust & Values Explorer." />

      <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto text-center">
        This page provides comprehensive citations and justifications for the Unified AI Trust & Values Explorer, covering cultural values, legal and standard frameworks, trust score calculations, philosophical underpinnings, AI personalities, UI design, and analytics.
      </p>

      {/* Cultural Values Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <BookOpen className="mr-2 text-indigo-600" />
          1. Cultural Values and Hofstede’s Cultural Dimensions
        </h2>
        <p className="text-gray-700 mb-4">
          The application uses Hofstede’s cultural dimensions to define principles via a questionnaire or manual input, enabling evaluation of AI responses against cultural values.
        </p>
        <h3 className="text-xl font-medium mb-3">Why Hofstede’s Dimensions?</h3>
        <p className="text-gray-600 mb-4">
          Hofstede’s framework quantifies cultural values into six dimensions (Power Distance, Individualism vs. Collectivism, etc.), widely adopted for its empirical foundation and cross-cultural applicability. It ensures AI alignment with user-specific cultural priorities.
        </p>
        <h3 className="text-xl font-medium mb-3">Citations</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            Hofstede, G. (2011). <em>Dimensionalizing Cultures: The Hofstede Model in Context.</em> <em>Online Readings in Psychology and Culture, 2(1).</em>
            <br />
            <a href="https://doi.org/10.9707/2307-0919.1014" className="text-indigo-600 hover:underline">DOI: 10.9707/2307-0919.1014</a>
            <br />
            <span className="text-sm">Justifies the use of six dimensions to generate cultural principles, leveraging its empirical survey data.</span>
          </li>
          <li>
            Hofstede, G., Hofstede, G. J., & Minkov, M. (2010). <em>Cultures and Organizations: Software of the Mind.</em> McGraw-Hill.
            <br />
            <span className="text-sm">Supports translating dimension scores into actionable principles via <code>hofstedeToPrinciples</code>.</span>
          </li>
          <li>
            Minkov, M., & Hofstede, G. (2012). <em>Is National Culture a Meaningful Concept?</em> <em>Cross-Cultural Research, 46(2), 133–159.</em>
            <br />
            <a href="https://doi.org/10.1177/1069397111427262" className="text-indigo-600 hover:underline">DOI: 10.1177/1069397111427262</a>
            <br />
            <span className="text-sm">Defends the validity of cultural dimensions, ensuring robustness in AI alignment evaluation.</span>
          </li>
        </ul>
        <h3 className="text-xl font-medium mb-3 mt-4">Formula for Cultural Alignment Score</h3>
        <p className="text-gray-700 mb-2">
          <code className="bg-gray-100 p-1 rounded">Alignment Score = Σ(Principle Score × Principle Weight) / Σ(Weights)</code>
        </p>
        <p className="text-gray-600">
          This weighted average, inspired by multi-criteria decision-making, ensures principles are evaluated proportionally to their importance.
          <br />
          <strong>Source:</strong> Saaty, T. L. (2008). <em>Decision Making with the Analytic Hierarchy Process.</em> <em>International Journal of Services Sciences, 1(1), 83–98.</em>
          <br />
          <a href="https://doi.org/10.1504/IJSSCI.2008.017590" className="text-indigo-600 hover:underline">DOI: 10.1504/IJSSCI.2008.017590</a>
          <br />
          <span className="text-sm">Validates weighted scoring for multi-dimensional evaluations, supporting LLM-based semantic alignment.</span>
        </p>
      </section>

      {/* Legal and Standard Frameworks Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Shield className="mr-2 text-indigo-600" />
          2. Legal and Standard Frameworks
        </h2>
        <p className="text-gray-700 mb-4">
          Frameworks like the EU AI Act, ISO/IEC 42001, and IEEE Ethically Aligned Design evaluate AI compliance with regulatory and ethical standards.
        </p>
        <h3 className="text-xl font-medium mb-3">Why These Frameworks?</h3>
        <p className="text-gray-600 mb-4">
          Selected for their global relevance and rigorous requirements, these frameworks ensure comprehensive safety evaluation, covering legal compliance, industry standards, and ethical design.
        </p>
        <h3 className="text-xl font-medium mb-3">Citations</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            European Commission. (2024). <em>Artificial Intelligence Act.</em>
            <br />
            <a href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:52021PC0206" className="text-indigo-600 hover:underline">EUR-Lex</a>
            <br />
            <span className="text-sm">Ensures compliance with risk-based regulation, transparency, and fairness, as implemented in <code>extendedSafetyTemplates</code>.</span>
          </li>
          <li>
            California Consumer Privacy Act (CCPA). (2018). <em>California Civil Code, Title 1.81.5.</em>
            <br />
            <a href="https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=CIV&division=3.&title=1.81.5." className="text-indigo-600 hover:underline">California Legislature</a>
            <br />
            <span className="text-sm">Addresses data protection and consumer rights, critical for AI handling personal data.</span>
          </li>
          <li>
            New York City Local Law 144 (AI Bias Law). (2021).
            <br />
            <a href="https://www.nyc.gov/site/dcas/about/local-law-144.page" className="text-indigo-600 hover:underline">NYC Government</a>
            <br />
            <span className="text-sm">Mandates bias audits, ensuring fairness in automated decision systems.</span>
          </li>
          <li>
            ISO/IEC 42001:2022. <em>Information Technology — Artificial Intelligence — Management System.</em>
            <br />
            <a href="https://www.iso.org/standard/81230.html" className="text-indigo-600 hover:underline">ISO</a>
            <br />
            <span className="text-sm">Provides global AI management standards, covering ethical development and accountability.</span>
          </li>
          <li>
            IEEE Global Initiative. (2019). <em>Ethically Aligned Design.</em>
            <br />
            <a href="https://standards.ieee.org/content/dam/ieee-standards/standards/web/documents/other/ead_v2.pdf" className="text-indigo-600 hover:underline">IEEE Standards</a>
            <br />
            <span className="text-sm">Prioritizes human well-being and ethical AI, complementing legal frameworks.</span>
          </li>
        </ul>
        <h3 className="text-xl font-medium mb-3 mt-4">Formula for Responsible AI Score</h3>
        <p className="text-gray-700 mb-2">
          <code className="bg-gray-100 p-1 rounded">Responsible AI Score = Σ(Framework Score × Framework Weight) / Σ(Weights)</code>
        </p>
        <p className="text-gray-600">
          This weighted average ensures framework compliance is evaluated based on user priorities.
          <br />
          <strong>Source:</strong> Keeney, R. L., & Raiffa, H. (1993). <em>Decisions with Multiple Objectives.</em> Cambridge University Press.
          <br />
          <a href="https://doi.org/10.1017/CBO9781139174084" className="text-indigo-600 hover:underline">DOI: 10.1017/CBO9781139174084</a>
          <br />
          <span className="text-sm">Supports weighted scoring for multi-objective evaluation in <code>SafetyFrameworksBuilder</code>.</span>
        </p>
      </section>

      {/* Trust Score Calculation Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Scale className="mr-2 text-indigo-600" />
          3. Trust Score Calculation
        </h2>
        <p className="text-gray-700 mb-4">
          The trust score combines cultural alignment and responsible AI scores, weighted by user preferences, or uses binary criteria for trust templates.
        </p>
        <h3 className="text-xl font-medium mb-3">Formula</h3>
        <p className="text-gray-700 mb-2">
          <code className="bg-gray-100 p-1 rounded">Trust Score = (Alignment Score × Alignment Weight + Responsible AI Score × RAI Weight) / 100</code>
        </p>
        <p className="text-gray-600 mb-4">
          Binary scoring (1 for pass, 0 for fail) is used with trust templates based on predefined criteria.
        </p>
        <h3 className="text-xl font-medium mb-3">Citations</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            Mayer, R. C., Davis, J. H., & Schoorman, F. D. (1995). <em>An Integrative Model of Organizational Trust.</em> <em>Academy of Management Review, 20(3), 709–734.</em>
            <br />
            <a href="https://doi.org/10.5465/amr.1995.9508080335" className="text-indigo-600 hover:underline">DOI: 10.5465/amr.1995.9508080335</a>
            <br />
            <span className="text-sm">Defines trust as ability, benevolence, and integrity, supporting alignment (benevolence) and safety (integrity) in <code>TrustCalculator</code>.</span>
          </li>
          <li>
            NIST AI Risk Management Framework (AI RMF 1.0). (2023).
            <br />
            <a href="https://www.nist.gov/itl/ai-risk-management-framework" className="text-indigo-600 hover:underline">NIST</a>
            <br />
            <span className="text-sm">Emphasizes trust as safety and accountability, justifying weighted trust scores.</span>
          </li>
          <li>
            Hendrycks, D., et al. (2021). <em>Aligning AI with Shared Human Values.</em> <em>ICLR.</em>
            <br />
            <a href="https://arxiv.org/abs/2008.02275" className="text-indigo-600 hover:underline">arXiv:2008.02275</a>
            <br />
            <span className="text-sm">Supports LLM-based evaluation of alignment and safety principles.</span>
          </li>
        </ul>
      </section>

      {/* Philosophical Frameworks Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Users className="mr-2 text-indigo-600" />
          4. Philosophical Frameworks
        </h2>
        <p className="text-gray-700 mb-4">
          Deontological and utilitarian ethics ground the application’s evaluation of AI responses, ensuring ethical alignment.
        </p>
        <h3 className="text-xl font-medium mb-3">Why These Frameworks?</h3>
        <p className="text-gray-600 mb-4">
          Deontological ethics (rule-based) aligns with legal frameworks, while utilitarian ethics (outcome-based) supports cultural alignment, providing a balanced ethical foundation.
        </p>
        <h3 className="text-xl font-medium mb-3">Citations</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            Kant, I. (1785). <em>Groundwork of the Metaphysics of Morals.</em>
            <br />
            <a href="https://www.gutenberg.org/ebooks/5682" className="text-indigo-600 hover:underline">Project Gutenberg</a>
            <br />
            <span className="text-sm">Underpins rule-based frameworks like EU AI Act in <code>SafetyFrameworksBuilder</code>.</span>
          </li>
          <li>
            Mill, J. S. (1863). <em>Utilitarianism.</em>
            <br />
            <a href="https://www.gutenberg.org/ebooks/11224" className="text-indigo-600 hover:underline">Project Gutenberg</a>
            <br />
            <span className="text-sm">Supports outcome-based cultural alignment in <code>QuestionnaireBuilder</code>.</span>
          </li>
          <li>
            Rawls, J. (1971). <em>A Theory of Justice.</em> Harvard University Press.
            <br />
            <a href="https://www.hup.harvard.edu/catalog.php?isbn=9780674000780" className="text-indigo-600 hover:underline">Harvard University Press</a>
            <br />
            <span className="text-sm">Informs fairness in frameworks like NYC AI Bias Law, ensuring equitable outcomes.</span>
          </li>
        </ul>
      </section>

      {/* AI Personalities Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Zap className="mr-2 text-indigo-600" />
          5. AI Personalities and Response Generation
        </h2>
        <p className="text-gray-700 mb-4">
          AI personalities (e.g., Traditionalist, Progressive) test responses for bias and alignment via <code>PersonalitySelector</code> and <code>generateResponseWithPersonality</code>.
        </p>
        <h3 className="text-xl font-medium mb-3">Why AI Personalities?</h3>
        <p className="text-gray-600 mb-4">
          Personalities simulate diverse perspectives, enabling robust bias evaluation across ideological spectrums.
        </p>
        <h3 className="text-xl font-medium mb-3">Citations</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            Crawford, K. (2021). <em>Atlas of AI.</em> Yale University Press.
            <br />
            <a href="https://yalebooks.yale.edu/book/9780300209570/atlas-of-ai" className="text-indigo-600 hover:underline">Yale University Press</a>
            <br />
            <span className="text-sm">Highlights AI bias, justifying personality-based testing for diverse perspectives.</span>
          </li>
          <li>
            Bender, E. M., et al. (2021). <em>On the Dangers of Stochastic Parrots.</em> <em>ACM FAccT.</em>
            <br />
            <a href="https://doi.org/10.1145/3442188.3445922" className="text-indigo-600 hover:underline">DOI: 10.1145/3442188.3445922</a>
            <br />
            <span className="text-sm">Emphasizes evaluating AI outputs for bias, supporting personality-based response generation.</span>
          </li>
        </ul>
      </section>

      {/* UI and Interaction Design Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Settings className="mr-2 text-indigo-600" />
          6. User Interface and Interaction Design
        </h2>
        <p className="text-gray-700 mb-4">
          The UI, built with React and Tailwind CSS, prioritizes usability with features like collapsible descriptions and progress indicators.
        </p>
        <h3 className="text-xl font-medium mb-3">Citations</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            Nielsen, J. (1994). <em>Usability Engineering.</em> Morgan Kaufmann.
            <br />
            <a href="https://www.nngroup.com/books/usability-engineering/" className="text-indigo-600 hover:underline">Nielsen Norman Group</a>
            <br />
            <span className="text-sm">Guides intuitive navigation and feedback in <code>QuestionnaireBuilder</code> and <code>SafetyFrameworksBuilder</code>.</span>
          </li>
          <li>
            Norman, D. A. (2013). <em>The Design of Everyday Things.</em> Basic Books.
            <br />
            <a href="https://www.basicbooks.com/titles/don-norman/the-design-of-everyday-things/9780465050659/" className="text-indigo-600 hover:underline">Basic Books</a>
            <br />
            <span className="text-sm">Supports affordances and feedback mechanisms for user-friendly design.</span>
          </li>
        </ul>
      </section>

      {/* Logging and Analytics Section */}
      <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Settings className="mr-2 text-indigo-600" />
          7. Logging and Analytics
        </h2>
        <p className="text-gray-700 mb-4">
          The <code>LoggingProvider</code> tracks interactions to improve performance and user experience.
        </p>
        <h3 className="text-xl font-medium mb-3">Citations</h3>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            Kohavi, R., & Longbotham, R. (2017). <em>Online Controlled Experiments and A/B Testing.</em> <em>Encyclopedia of Machine Learning and Data Mining.</em>
            <br />
            <a href="https://doi.org/10.1007/978-1-4899-7687-1_891" className="text-indigo-600 hover:underline">DOI: 10.1007/978-1-4899-7687-1_891</a>
            <br />
            <span className="text-sm">Supports interaction logging for UI refinement via <code>logInteraction</code> and <code>logError</code>.</span>
          </li>
        </ul>
      </section>

      {/* Conclusion */}
      <section className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-4">Conclusion</h2>
        <p className="text-gray-700">
          The Unified AI Trust & Values Explorer is grounded in rigorous research across cultural, legal, ethical, and technical domains. Each component is supported by authoritative sources, ensuring a robust, transparent, and user-centric approach to AI evaluation.
        </p>
      </section>
    </div>
  );
};

export default Citations;