'use client';
import Link from 'next/link';

export default function ScenariosPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Use Case Scenarios</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Explore how the Unified AI Trust & Values Explorer can be applied in various contexts to evaluate AI alignment and safety.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Corporate AI Deployment</h2>
          <p className="text-gray-600 mb-4">
            Ensure AI systems deployed in your organization align with corporate values and comply with safety standards. Test scenarios like customer service responses or internal decision-making prompts.
          </p>
          <Link href="/explorer" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Try this scenario →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Policy Development</h2>
          <p className="text-gray-600 mb-4">
            Policymakers can evaluate AI responses against regulatory frameworks and ethical guidelines. Test scenarios involving public safety, fairness, or compliance with laws.
          </p>
          <Link href="/explorer" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Try this scenario →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Educational Research</h2>
          <p className="text-gray-600 mb-4">
            Researchers can use the tool to study AI behavior across cultural and ethical dimensions. Test scenarios like educational content generation or bias detection in responses.
          </p>
          <Link href="/explorer" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Try this scenario →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Personal AI Customization</h2>
          <p className="text-gray-600 mb-4">
            Individuals can tailor AI responses to match personal values or preferences. Test scenarios like personal assistant tasks or content recommendations.
          </p>
          <Link href="/explorer" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Try this scenario →
          </Link>
        </div>
      </div>
    </div>
  );
}