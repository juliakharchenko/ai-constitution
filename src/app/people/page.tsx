'use client';
import { peopleData } from "../data/peopleData";

export default function PeoplePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Who Uses This Tool?</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        The Unified AI Trust & Values Explorer is designed for a wide range of users, from developers to policymakers, who need to ensure AI aligns with their values and safety requirements.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {peopleData.map((person, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
            <p className="text-gray-500 text-sm mb-3">{person.role}</p>
            <p className="text-gray-600">{person.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}