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

// 'use client';
// import { peopleData } from "../data/peopleData";
// import { Users, Sparkles, User, Building, GraduationCap, Shield } from 'lucide-react';

// // Mock data if peopleData is not available
// const mockPeopleData = [
//   {
//     name: "AI Researchers",
//     role: "Research & Development",
//     description: "Scientists and researchers studying AI alignment, safety, and ethical considerations who need robust tools to evaluate model behavior across different scenarios and value systems.",
//     icon: GraduationCap
//   },
//   {
//     name: "Enterprise Leaders",
//     role: "Business & Strategy",
//     description: "CTOs, product managers, and executives deploying AI systems who must ensure their AI implementations align with corporate values and regulatory requirements.",
//     icon: Building
//   },
//   {
//     name: "Policy Makers",
//     role: "Government & Regulation",
//     description: "Government officials and regulatory bodies developing AI governance frameworks who need to understand how AI systems behave under different policy constraints.",
//     icon: Shield
//   },
//   {
//     name: "Ethicists & Advocates",
//     role: "Ethics & Advocacy",
//     description: "Ethics researchers, civil rights advocates, and social scientists working to ensure AI development remains human-centered and beneficial to society.",
//     icon: Users
//   },
//   {
//     name: "Individual Users",
//     role: "Personal Use",
//     description: "Privacy-conscious individuals who want to understand and customize how AI systems align with their personal values and cultural background.",
//     icon: User
//   },
//   {
//     name: "Developers",
//     role: "Technical Implementation",
//     description: "Software engineers and AI developers building applications who need to test and validate AI behavior before deployment to ensure safety and alignment.",
//     icon: Sparkles
//   }
// ];

// const dataToUse = typeof peopleData !== 'undefined' ? peopleData : mockPeopleData;

// export default function PeoplePage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-800 to-indigo-800 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 opacity-15">
//         <div className="absolute top-32 left-20 w-64 h-64 bg-purple-400 rounded-full filter blur-xl animate-pulse"></div>
//         <div className="absolute top-60 right-32 w-80 h-80 bg-blue-400 rounded-full filter blur-xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-40 left-1/3 w-72 h-72 bg-indigo-400 rounded-full filter blur-xl animate-pulse delay-500"></div>
//       </div>
      
//       {/* Floating particles effect */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(8)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${3 + Math.random() * 4}s`
//             }}
//           >
//             <Sparkles className="w-3 h-3 text-purple-300 opacity-50" />
//           </div>
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto p-6">
//         {/* Header Section */}
//         <div className="text-center mb-16 pt-12">
//           <div className="inline-flex items-center bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-2 mb-8">
//             <Users className="w-4 h-4 text-purple-300 mr-2" />
//             <span className="text-purple-200 text-sm font-medium">Built for Everyone</span>
//           </div>
          
//           <h1 className="text-5xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
//             Who Uses This Tool?
//           </h1>
          
//           <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
//             The <span className="text-purple-300 font-semibold">Unified AI Trust & Values Explorer</span> is designed for a 
//             wide range of users, from <span className="text-blue-300">developers to policymakers</span>, who need to ensure 
//             AI aligns with their <span className="text-emerald-300">values and safety requirements</span>.
//           </p>
//         </div>

//         {/* People Cards Grid */}
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {dataToUse.map((person, index) => {
//             const IconComponent = person.icon || User;
//             return (
//               <div 
//                 key={index} 
//                 className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl"
//               >
//                 <div className="flex items-center mb-4">
//                   <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl mr-4 group-hover:scale-110 transition-transform">
//                     <IconComponent className="w-6 h-6 text-white" />
//                   </div>
//                   <div>
//                     <h2 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
//                       {person.name}
//                     </h2>
//                     <p className="text-purple-300 text-sm font-medium">{person.role}</p>
//                   </div>
//                 </div>
                
//                 <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
//                   {person.description}
//                 </p>
                
//                 <div className="mt-4 pt-4 border-t border-white/10">
//                   <div className="flex items-center text-purple-300 text-sm">
//                     <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mr-2"></div>
//                     Trusted by professionals worldwide
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Bottom CTA Section */}
//         <div className="mt-16 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
//           <h3 className="text-2xl font-bold text-white mb-4">Ready to Get Started?</h3>
//           <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
//             Join thousands of professionals who trust ValueVet to ensure their AI systems align with human values and safety standards.
//           </p>
//           <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-400 hover:to-blue-400 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1">
//             Start Your Free Trial
//           </button>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           33% { transform: translateY(-8px) rotate(1deg); }
//           66% { transform: translateY(4px) rotate(-1deg); }
//         }
//         .animate-float {
//           animation: float 5s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }