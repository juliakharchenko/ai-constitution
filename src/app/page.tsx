'use client';
import Link from 'next/link';
import { Info } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to ValueVet
          <Info className="inline w-6 h-6 ml-2 text-gray-500 cursor-pointer" data-tooltip-id="home-title" />
        </h1>
        <Tooltip id="home-title" content="A platform to test AI alignment with your values, safety requirements, and legal frameworks." />
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how AI models align with your ethical principles, safety standards, and legal frameworks (e.g., US, EU, ISO, IEEE). Configure AI providers, define values or legal standards, select personalities, and test scenarios to ensure trustworthy AI responses. All assessments are backed by research and legal citations.
        </p>
      </div>
      <div className="flex justify-center mb-12 space-x-4">
        <Link
          href="/explorer"
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
        >
          Try the Explorer Now
        </Link>
        <Link
          href="/citations"
          className="px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-lg font-semibold"
        >
          View Citations
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Why Use This Tool?</h2>
          <p className="text-gray-600">
            As LLMs become integral to our technologies, ensuring their alignment with human values, safety, and legal standards is critical. ValueVet allows you to test AI responses against your chosen principles or legal frameworks, such as the EU AI Act or US regulations, ensuring human-centered AI development.
          </p>
          <p className="text-gray-600">
            Define custom values, select from legal frameworks (e.g., ISO, IEEE), or use our questionnaire to generate principles. Test AI responses across providers and personalities, with research-backed trust and safety assessments.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              Define custom constitutional principles or use legal frameworks (US, EU, ISO, IEEE).
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              Test AI responses across multiple providers and personalities.
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              Evaluate alignment, safety, and trust with detailed, research-backed analysis.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}