// 'use client';
// import { Header } from './components/Header';
// import { Footer } from './components/Footer';
// import './globals.css';
// import { ReactNode } from 'react';

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <head>
//         <title>Unified AI Trust & Values Explorer</title>
//         <meta name="description" content="Explore AI alignment with your values and safety requirements." />
//         <link rel="icon" href="/favicon.ico" />
//         <script src="https://cdn.jsdelivr.net/npm/react@18/umd/react.production.min.js" crossOrigin="anonymous"></script>
//         <script src="https://cdn.jsdelivr.net/npm/react-dom@18/umd/react-dom.production.min.js" crossOrigin="anonymous"></script>
//         <script src="https://cdn.tailwindcss.com"></script>
//         {/* Google Analytics */}
//         <script async src="https://www.googletagmanager.com/gtag/js?id=G-L1CL8HC4WW"></script>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               window.dataLayer = window.dataLayer || [];
//               function gtag(){dataLayer.push(arguments);}
//               gtag('js', new Date());
//               gtag('config', 'G-L1CL8HC4WW');
//             `,
//           }}
//         />
//       </head>
//       <body className="bg-gray-100 min-h-screen flex flex-col">
//         <Header />
//         <main className="flex-grow">{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }

'use client';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './globals.css';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Unified AI Trust & Values Explorer</title>
        <meta name="description" content="Explore AI alignment with your values and safety requirements." />
        <link rel="icon" href="/favicon.ico" />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-L1CL8HC4WW"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-L1CL8HC4WW');
            `,
          }}
        />
      </head>
      <body className="bg-gray-100 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}