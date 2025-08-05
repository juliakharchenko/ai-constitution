'use client';
import Link from 'next/link';
import { Info } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Welcome to Value Vet
          <Info className="inline w-6 h-6 ml-2 text-gray-500 cursor-pointer" data-tooltip-id="home-title" />
        </h1>
        <Tooltip id="home-title" content="A platform to test AI alignment with your values and safety requirements." />
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover how AI models align with your ethical principles and safety standards. Configure AI providers, define your values, select personalities, and test scenarios to ensure trustworthy AI responses.
        </p>
      </div>
      <div className="flex justify-center mb-12">
        <Link
          href="/explorer"
          className="px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-lg font-semibold"
        >
          Try the Explorer Now
        </Link>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Why Use This Tool?</h2>
          <p className="text-gray-600">
          As LLMs become incorporated throughout more and more facets of our lives, becoming embedded within our technologies, it is imperative that we analyze how they portray our values and understandings of trust and safety, so that we can ensure that the development and implementation of AI is human-centered and beneficial. 
          </p>
          <p className="text-gray-600">
          We have developed ValueVet, an online platform where users can input a sample constitution of what they value, either their cultural/political/other values or their requirements for trusting and feeling safe to use an LLM, ask sample queries, and see an analysis of requested LLMs and AI personalities based on their inputs. 
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              Define custom constitutional principles or use a questionnaire.
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              Test AI responses across multiple providers and personalities.
            </li>
            <li className="flex items-start">
              <span className="text-indigo-600 mr-2">•</span>
              Evaluate alignment, safety, and trust scores with detailed analysis.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// purple design
// 'use client';
// import Link from 'next/link';
// import { Info, Shield, Heart, Cpu, Sparkles, ChevronRight } from 'lucide-react';
// import { Tooltip } from 'react-tooltip';

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 opacity-20">
//         <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full filter blur-xl animate-pulse"></div>
//         <div className="absolute top-40 right-32 w-96 h-96 bg-blue-500 rounded-full filter blur-xl animate-pulse delay-1000"></div>
//         <div className="absolute bottom-32 left-1/3 w-80 h-80 bg-indigo-500 rounded-full filter blur-xl animate-pulse delay-500"></div>
//       </div>
      
//       {/* Floating particles effect */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(12)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute animate-float"
//             style={{
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 3}s`,
//               animationDuration: `${3 + Math.random() * 4}s`
//             }}
//           >
//             <Sparkles className="w-4 h-4 text-purple-300 opacity-60" />
//           </div>
//         ))}
//       </div>

//       <div className="relative z-10 max-w-7xl mx-auto p-6">
//         {/* Hero Section */}
//         <div className="text-center mb-16 pt-12">
//           <div className="inline-flex items-center bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/30 rounded-full px-6 py-2 mb-8">
//             <Shield className="w-4 h-4 text-purple-300 mr-2" />
//             <span className="text-purple-200 text-sm font-medium">AI Alignment & Safety Platform</span>
//           </div>
          
//           <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent leading-tight">
//             Welcome to
//             <br />
//             <span className="relative">
//               Value Vet
//               <div className="absolute -top-2 -right-2">
//                 <Info 
//                   className="w-6 h-6 text-purple-400 cursor-pointer hover:text-purple-300 transition-colors" 
//                   data-tooltip-id="home-title" 
//                 />
//               </div>
//             </span>
//           </h1>
          
//           <Tooltip 
//             id="home-title" 
//             content="A platform to test AI alignment with your values and safety requirements."
//             className="!bg-slate-800 !text-purple-200 !border !border-purple-500/50"
//           />
          
//           <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed mb-12">
//             Discover how AI models align with your <span className="text-purple-300 font-semibold">ethical principles</span> and 
//             <span className="text-blue-300 font-semibold"> safety standards</span>. Configure providers, define values, 
//             and test scenarios to ensure <span className="text-emerald-300 font-semibold">trustworthy AI responses</span>.
//           </p>
          
//           <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
//             <Link
//               href="/explorer"
//               className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center"
//             >
//               Try the Explorer Now
//               <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//             </Link>
            
//             <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 text-lg font-semibold">
//               Watch Demo
//             </button>
//           </div>
//         </div>

//         {/* Feature Cards */}
//         <div className="grid lg:grid-cols-2 gap-8 mb-16">
//           {/* Why Use This Tool Card */}
//           <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl">
//             <div className="flex items-center mb-6">
//               <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mr-4">
//                 <Heart className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">Why Use This Tool?</h2>
//             </div>
            
//             <div className="space-y-4 text-slate-300 leading-relaxed">
//               <p>
//                 As LLMs become embedded throughout our technologies and daily lives, it's 
//                 <span className="text-purple-300 font-medium"> imperative that we analyze</span> how 
//                 they embody our values and safety standards.
//               </p>
//               <p>
//                 ValueVet empowers you to ensure AI development remains 
//                 <span className="text-emerald-300 font-medium"> human-centered and beneficial</span>, 
//                 providing transparent analysis of how AI systems align with your constitutional principles 
//                 and trust requirements.
//               </p>
//             </div>
            
//             <div className="mt-6 pt-6 border-t border-white/10">
//               <div className="flex items-center text-purple-300 text-sm font-medium">
//                 <Sparkles className="w-4 h-4 mr-2" />
//                 Human-Centered AI Evaluation
//               </div>
//             </div>
//           </div>

//           {/* Key Features Card */}
//           <div className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl">
//             <div className="flex items-center mb-6">
//               <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl mr-4">
//                 <Cpu className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">Advanced Features</h2>
//             </div>
            
//             <div className="space-y-4">
//               {[
//                 {
//                   text: "Define custom constitutional principles or use our intelligent questionnaire",
//                   color: "text-purple-300"
//                 },
//                 {
//                   text: "Test AI responses across multiple providers and personality configurations",
//                   color: "text-blue-300"
//                 },
//                 {
//                   text: "Comprehensive alignment, safety, and trust scoring with detailed analytics",
//                   color: "text-emerald-300"
//                 }
//               ].map((feature, index) => (
//                 <div key={index} className="flex items-start group/item">
//                   <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full mt-3 mr-4 group-hover/item:scale-150 transition-transform"></div>
//                   <p className={`text-slate-300 leading-relaxed group-hover/item:${feature.color} transition-colors`}>
//                     {feature.text}
//                   </p>
//                 </div>
//               ))}
//             </div>
            
//             <div className="mt-6 pt-6 border-t border-white/10">
//               <div className="flex items-center text-blue-300 text-sm font-medium">
//                 <Shield className="w-4 h-4 mr-2" />
//                 Enterprise-Grade Security & Privacy
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Trust Indicators */}
//         <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center">
//           <h3 className="text-2xl font-bold text-white mb-6">Built with Your Values in Mind</h3>
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="flex flex-col items-center">
//               <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4">
//                 <Shield className="w-8 h-8 text-white" />
//               </div>
//               <h4 className="text-lg font-semibold text-white mb-2">Privacy First</h4>
//               <p className="text-slate-400 text-sm">Your data and values remain completely private and secure</p>
//             </div>
            
//             <div className="flex flex-col items-center">
//               <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-4">
//                 <Heart className="w-8 h-8 text-white" />
//               </div>
//               <h4 className="text-lg font-semibold text-white mb-2">Human-Centered</h4>
//               <p className="text-slate-400 text-sm">Designed to prioritize human values and ethical considerations</p>
//             </div>
            
//             <div className="flex flex-col items-center">
//               <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-4">
//                 <Sparkles className="w-8 h-8 text-white" />
//               </div>
//               <h4 className="text-lg font-semibold text-white mb-2">Cutting-Edge</h4>
//               <p className="text-slate-400 text-sm">Advanced AI analysis with state-of-the-art alignment metrics</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           33% { transform: translateY(-10px) rotate(1deg); }
//           66% { transform: translateY(5px) rotate(-1deg); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }