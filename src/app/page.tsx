'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen py-4 sm:py-8 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow">
        <div className="text-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            Welcome to the 2025 Annual GMA Geddes Hockey Pool!
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 mb-6 sm:mb-8">
            Track playoff picks, Standings, and compete with the fam to win!
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-4 sm:mt-8">
          <Link href="/matchups" 
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Matchups</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">View all playoff matchups and picks</p>
          </Link>

          <Link href="/teams" 
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Teams</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Check individual team picks and history</p>
          </Link>

          <Link href="/leaderboard" 
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Leaderboard</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">See current standings and points</p>
          </Link>

          <Link href="/info" 
            className="bg-white dark:bg-gray-800 shadow-sm rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Info</h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Rules, prizes, and past winners</p>
          </Link>
        </div>

        {/* Latest Updates */}
        <div className="mt-6 sm:mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Latest Updates</h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">GMA looking to go back to back</p>
            </div>
            <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Sens favoured game 3</p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-3 sm:pl-4">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Grant looking to not come last for the third straight year</p>
            </div>
            <div className="border-l-4 border-red-500 pl-3 sm:pl-4">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Will Oil finally fall to the Kings???</p>
            </div>
          </div>
        </div>

        {/* Live Odds */}
        <div className="mt-6 sm:mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">Live Odds to Win</h2>
          <div className="h-48 sm:h-64 flex items-center justify-center">
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 italic">Coming soon - Live win probability chart</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>Made by rorygeddes © 2025</p>
      </footer>
    </div>
  );
}
