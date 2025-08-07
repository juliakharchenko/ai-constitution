'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Explorer', path: '/explorer' },
    { name: 'Scenarios', path: '/scenarios' },
    { name: 'People', path: '/people' },
    { name: 'Demo', path: '/demo' },
    {name: 'Citations', path: '/citations'}
  ];

  return (
    <header className="bg-indigo-600 text-white shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <Link href="/">Value Vet</Link>
          </h1>
          <nav>
            <ul className="flex space-x-6">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`text-sm font-medium hover:text-indigo-200 transition-colors ${
                      pathname === item.path ? 'border-b-2 border-white' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}