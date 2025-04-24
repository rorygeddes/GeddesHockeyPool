'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Matchups', href: '/matchups' },
  { name: 'Teams', href: '/teams' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'Info', href: '/info' }
];

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className={`text-lg font-bold ${isActive('/') ? 'text-blue-600' : 'text-gray-800'}`}
          >
            GMA Geddes Hockey Pool 2025
          </Link>
          
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.href)
                    ? 'bg-blue-100 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 