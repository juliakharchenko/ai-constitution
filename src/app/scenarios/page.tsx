'use client';
import Link from 'next/link';

export default function ScenariosPage() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Use Case Scenarios</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Explore how the Unified AI Trust & Values Explorer can be applied in various contexts to evaluate AI alignment and safety. Below, each scenario includes a step-by-step guide with specific examples to demonstrate how to use the application.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Corporate AI Deployment</h2>
          <p className="text-gray-600 mb-4">
            Ensure AI systems deployed in your organization align with corporate values and comply with safety standards. Test scenarios like customer service responses or internal decision-making prompts.
          </p>
          <h3 className="text-xl font-medium mb-3">Step-by-Step Guide</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm mb-4">
            <li>Configure AI providers: Set up API keys for models like GPT-4 or Claude 3 in the Setup Wizard.</li>
            <li>Select analysis mode: Choose 'Both' to evaluate cultural values and legal frameworks.</li>
            <li>Define values: Use the questionnaire for corporate culture (e.g., select 'Workplace' category) or manually add principles like "Prioritize customer satisfaction" and "Maintain professional integrity."</li>
            <li>Select frameworks: Choose EU AI Act and ISO/IEC 42001, assigning 50% weight to each.</li>
            <li>Select personalities: Pick 'Cautious AI' and 'Collectivist AI' to test risk-averse and team-oriented responses.</li>
            <li>Test scenario: Enter prompt like "How should we handle a customer complaint about delayed shipping?"</li>
            <li>Review results: Analyze alignment scores, safety compliance, and trust metrics.</li>
          </ol>
          <Link href="/explorer" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Try this scenario →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Policy Development</h2>
          <p className="text-gray-600 mb-4">
            Policymakers can evaluate AI responses against regulatory frameworks and ethical guidelines. Test scenarios involving public safety, fairness, or compliance with laws.
          </p>
          <h3 className="text-xl font-medium mb-3">Step-by-Step Guide</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm mb-4">
            <li>Configure AI providers: Add API keys for models such as Llama 3 or Gemini in the Setup Wizard.</li>
            <li>Select analysis mode: Choose 'Safety' for focus on legal/standard frameworks.</li>
            <li>Define frameworks: Select California CCPA and New York AI Bias Law, with weights 60% and 40% respectively.</li>
            <li>Add custom principles: Include "Ensure compliance with data privacy laws" if needed.</li>
            <li>Select personalities: Use 'Traditionalist AI' and 'Progressive AI' to compare conservative vs. innovative policy interpretations.</li>
            <li>Test scenario: Enter prompt like "Draft a policy response to AI-generated misinformation in elections."</li>
            <li>Review results: Check safety scores for bias mitigation and transparency compliance.</li>
          </ol>
          <Link href="/explorer" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Try this scenario →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Educational Research</h2>
          <p className="text-gray-600 mb-4">
            Researchers can use the tool to study AI behavior across cultural and ethical dimensions. Test scenarios like educational content generation or bias detection in responses.
          </p>
          <h3 className="text-xl font-medium mb-3">Step-by-Step Guide</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm mb-4">
            <li>Configure AI providers: Set up multiple models like Mistral and GPT-3.5 for comparison.</li>
            <li>Select analysis mode: Choose 'Values' to focus on cultural alignment.</li>
            <li>Define values: Take the questionnaire in 'Education' category or add principles like "Promote inclusive learning" and "Encourage critical thinking."</li>
            <li>Select personalities: Choose 'Optimistic AI' and 'Individualist AI' to test positive and self-reliant educational approaches.</li>
            <li>Test scenario: Enter prompt like "Explain the history of climate change to high school students."</li>
            <li>Review results: Examine alignment scores and adherence to educational principles.</li>
            <li>Iterate: Adjust weights in Trust Calculator for deeper analysis.</li>
          </ol>
          <Link href="/explorer" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Try this scenario →
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Personal AI Customization</h2>
          <p className="text-gray-600 mb-4">
            Individuals can tailor AI responses to match personal values or preferences. Test scenarios like personal assistant tasks or content recommendations.
          </p>
          <h3 className="text-xl font-medium mb-3">Step-by-Step Guide</h3>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 text-sm mb-4">
            <li>Configure AI providers: Use a single model like Claude 2 via API key setup.</li>
            <li>Select analysis mode: Choose 'Both' for personal values and basic safety.</li>
            <li>Define values: Use questionnaire in 'Personal Life' category or add custom principles like "Value work-life balance" and "Prioritize sustainability."</li>
            <li>Select frameworks: Pick IEEE Ethically Aligned Design with 100% weight.</li>
            <li>Select personalities: Select 'No Personality' and 'Optimistic AI' for neutral vs. positive responses.</li>
            <li>Test scenario: Enter prompt like "Suggest a daily routine for better productivity and health."</li>
            <li>Review results: Evaluate trust scores and customize further based on alignment.</li>
          </ol>
          <Link href="/explorer" className="text-indigo-600 hover:text-indigo-800 font-medium">
            Try this scenario →
          </Link>
        </div>
      </div>
    </div>
  );
}