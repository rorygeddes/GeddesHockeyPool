'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white font-bold">Hockey Pool</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="/"
                  className={`${
                    isActive('/') 
                      ? 'bg-indigo-700 text-white' 
                      : 'text-white hover:bg-indigo-500 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/teams"
                  className={`${
                    isActive('/teams') 
                      ? 'bg-indigo-700 text-white' 
                      : 'text-white hover:bg-indigo-500 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Teams
                </Link>
                <Link
                  href="/playoff-bracket"
                  className={`${
                    isActive('/playoff-bracket') 
                      ? 'bg-indigo-700 text-white' 
                      : 'text-white hover:bg-indigo-500 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Playoff Bracket
                </Link>
                <Link
                  href="/leaderboard"
                  className={`${
                    isActive('/leaderboard') 
                      ? 'bg-indigo-700 text-white' 
                      : 'text-white hover:bg-indigo-500 hover:text-white'
                  } px-3 py-2 rounded-md text-sm font-medium`}
                >
                  Leaderboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 