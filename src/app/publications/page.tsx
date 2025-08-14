'use client';
import { peopleData } from "../data/peopleData";

interface Publication {
  title: string;
  authors: string;
  citation: string;
  description: string;
  link: string;
  associatedPerson?: string;
}

export default function PublicationsPage() {
  const allPublications: Publication[] = peopleData
    .filter(person => person.publications && person.publications.length > 0)
    .flatMap(person => person.publications!.map(pub => ({
      ...pub,
      associatedPerson: person.name
    })));

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Publications</h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
        Explore the research behind the Unified AI Trust & Values Explorer. These publications, primarily from the <a href="https://infoseeking.org/" className="text-blue-600 hover:underline">InfoSeeking Lab</a> at the University of Washington’s Information School, cover topics such as large language model evaluation, information seeking, and collaborative information retrieval.
      </p>
      <div className="bg-white rounded-lg shadow-sm p-6">
        {allPublications.length > 0 ? (
          <ul className="space-y-6">
            {allPublications.map((pub, index) => (
              <li key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  <a href={pub.link} className="text-blue-600 hover:underline">{pub.title}</a>
                </h3>
                <p className="text-gray-600 text-sm mb-1">{pub.authors}</p>
                <p className="text-gray-500 text-sm mb-2">({pub.citation})</p>
                <p className="text-gray-600 text-sm">{pub.description}</p>
                {pub.associatedPerson && (
                  <p className="text-gray-500 text-sm mt-2">Contributed by: {pub.associatedPerson}</p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">No publications available at this time.</p>
        )}
      </div>
    </div>
  );
}