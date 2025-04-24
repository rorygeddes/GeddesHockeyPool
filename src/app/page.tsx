'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to the 2025 Annual GMA Geddes Hockey Pool!
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Track playoff picks, Standings, and compete with the fam to win!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Quick Links */}
          <Link href="/matchups" 
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Matchups</h2>
            <p className="text-gray-600 dark:text-gray-400">View all playoff matchups and picks</p>
          </Link>

          <Link href="/teams" 
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Teams</h2>
            <p className="text-gray-600 dark:text-gray-400">Check individual team picks and history</p>
          </Link>

          <Link href="/leaderboard" 
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Leaderboard</h2>
            <p className="text-gray-600 dark:text-gray-400">See current standings and points</p>
          </Link>

          <Link href="/info" 
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-6 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Info</h2>
            <p className="text-gray-600 dark:text-gray-400">Rules, prizes, and past winners</p>
          </Link>
        </div>

        {/* Latest Updates or Highlights */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Latest Updates</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-600 dark:text-gray-400">Round 1 playoff picks are now live!</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-600 dark:text-gray-400">GMA leads the pool with 18 points</p>
            </div>
          </div>
        </div>

        {/* Live Odds */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Live Odds to Win</h2>
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400 italic">Coming soon - Live win probability chart</p>
          </div>
        </div>
      </div>
    </div>
  );
}
