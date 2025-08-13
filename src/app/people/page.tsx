'use client';
import { peopleData } from "../data/peopleData";

// export default function PeoplePage() {
//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
//       <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Who Uses This Tool?</h1>
//       <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
//         The Unified AI Trust & Values Explorer is designed for a wide range of users, from developers to policymakers, who need to ensure AI aligns with their values and safety requirements.
//       </p>
//       <div className="grid md:grid-cols-3 gap-6">
//         {peopleData.map((person, index) => (
//           <div key={index} className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
//             <p className="text-gray-500 text-sm mb-3">{person.role}</p>
//             <p className="text-gray-600">{person.description}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// export default function PeoplePage() {
//     return (
//       <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
//         <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Who Uses This Tool?</h1>
//         <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
//           The Unified AI Trust & Values Explorer is designed for a wide range of users, from developers to policymakers, who need to ensure AI aligns with their values and safety requirements.
//         </p>
//         <div className="grid md:grid-cols-3 gap-6">
//           {peopleData.map((person, index) => (
//             <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
//               <img
//                 src={person.image}
//                 alt={`${person.name} portrait`}
//                 className="w-24 h-24 rounded-full mb-4 object-cover"
//               />
//               <h2 className="text-xl font-semibold mb-2 text-center">{person.name}</h2>
//               <p className="text-gray-500 text-sm mb-3 text-center">{person.role}</p>
//               <p className="text-gray-600 text-center">{person.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

export default function PeoplePage() {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Who Uses This Tool?</h1>
        <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
          The Unified AI Trust & Values Explorer is designed for a wide range of users, from developers to policymakers, who need to ensure AI aligns with their values and safety requirements. Much of the research behind this tool stems from the <a href="https://infoseeking.org/" className="text-blue-600 hover:underline">InfoSeeking Lab</a> at the University of Washington’s Information School, directed by Dr. Chirag Shah. The lab focuses on information seeking, retrieval, and behavior, with projects funded by NSF, Amazon, Google, and others, exploring topics like large language model evaluation and collaborative information seeking.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {peopleData.map((person, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center">
              <img
                src={person.image}
                alt={`${person.name} portrait`}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold mb-2 text-center">{person.name}</h2>
              <p className="text-gray-500 text-sm mb-3 text-center">{person.role}</p>
              <p className="text-gray-600 text-center">{person.description}</p>
              {person.publications && (
                <div className="mt-4 w-full">
                  <h3 className="text-lg font-semibold mb-2">Publications</h3>
                  <ul className="list-disc pl-5 text-gray-600 text-sm">
                    {person.publications.map((pub, pubIndex) => (
                      <li key={pubIndex} className="mb-2">
                        <a href={pub.link} className="text-blue-600 hover:underline">{pub.title}</a>
                        <p>{pub.authors} ({pub.citation})</p>
                        <p>{pub.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }