'use client';

import Image from 'next/image';

interface WinnerEntry {
  year: number;
  cupWinner: {
    team: string;
    abbrev: string;
  };
  first: {
    name: string;
    score: string;
    perfectPicks?: number;
  };
  second: {
    name: string;
    score?: string;
    perfectPicks?: number;
  };
  third: {
    name: string;
    score?: string;
    perfectPicks?: number;
  };
  lastPlace: {
    name: string;
    score: string;
  };
}

const winners: WinnerEntry[] = [
  {
    year: 2024,
    cupWinner: { team: 'Florida', abbrev: 'FLA' },
    first: { name: 'GMA', score: '18' },
    second: { name: 'Noah', perfectPicks: 6 },
    third: { name: 'Grady', perfectPicks: 5 },
    lastPlace: { name: 'Grant', score: '7' }
  },
  {
    year: 2023,
    cupWinner: { team: 'Vegas', abbrev: 'VGK' },
    first: { name: 'Bow', score: '14', perfectPicks: 5 },
    second: { name: 'Bird', score: '14', perfectPicks: 4 },
    third: { name: 'Fiona', score: '13' },
    lastPlace: { name: 'Grant', score: '4' }
  },
  {
    year: 2019,
    cupWinner: { team: 'St. Louis', abbrev: 'STL' },
    first: { name: 'Dave', score: '10' },
    second: { name: 'Bow', score: '9' },
    third: { name: 'Noah', score: '8' },
    lastPlace: { name: 'Rhonda', score: '1' }
  },
  {
    year: 2018,
    cupWinner: { team: 'Washington', abbrev: 'WSH' },
    first: { name: 'Grant', score: '13' },
    second: { name: 'Cooper', score: '10' },
    third: { name: 'Jordan', score: '9' },
    lastPlace: { name: 'Crosby', score: '6' }
  },
  {
    year: 2017,
    cupWinner: { team: 'Pittsburgh', abbrev: 'PIT' },
    first: { name: 'Bow', score: '16' },
    second: { name: 'Rory', score: '15' },
    third: { name: 'Bird', score: '14' },
    lastPlace: { name: 'Cooper', score: '11' }
  }
];

export default function InfoPage() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Pool Information</h1>

        {/* Quick Rules */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Quick Rules</h2>
            
            {/* Scoring Rules */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Scoring</h3>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                    <div className="absolute inset-0 bg-green-500 rounded-full opacity-20"></div>
                    <div className="absolute inset-2 bg-green-500 rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600 dark:text-gray-400">
                    Correctly pick the right team = 1 Point
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 relative mt-1">
                    <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20"></div>
                    <div className="absolute inset-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <p className="ml-3 text-gray-600 dark:text-gray-400">
                    Pick it to perfect with right number of Games = 2 Points
                  </p>
                </div>
              </div>
            </div>

            {/* Submission Rule */}
            <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
              <p className="text-amber-800 dark:text-amber-200 font-medium">
                Get your picks into Rory before the round starts to make it as fair as possible!
              </p>
            </div>

            {/* Tie Break Rules */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Tie Breakers</h3>
              <p className="text-gray-600 dark:text-gray-400">
                If players are tied, the winner will be determined by:
              </p>
              <ol className="list-decimal list-inside mt-2 space-y-1 text-gray-600 dark:text-gray-400 ml-4">
                <li>Total goals scored by both teams in the Stanley Cup Final Round</li>
                <li>Most perfect guesses in all rounds</li>
                <li>Most correct teams picked</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Prize Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Prize Breakdown</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-yellow-400 dark:bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">First Place</span>
                </div>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">$100</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Second Place</span>
                </div>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">$50</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-amber-600 dark:bg-amber-700 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">Third Place</span>
                </div>
                <span className="text-xl font-bold text-green-600 dark:text-green-400">$20</span>
              </div>
            </div>
          </div>
        </div>

        {/* Entry Fee */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Entry Fee</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-800 dark:text-gray-200">Cost per Entry</span>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">$10</span>
            </div>
          </div>
        </div>

        {/* Payment Instructions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Payment Instructions</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please send your entry fee via e-transfer to:
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
              <p className="text-blue-800 dark:text-blue-200 font-mono">rorygeddes16@gmail.com</p>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              If you haven&apos;t paid yet, please send your entry fee as soon as possible to secure your spot in the pool.
            </p>
          </div>
        </div>

        {/* Hall of Fame */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Hall of Fame</h2>
            <div className="space-y-8">
              {winners.map((entry) => (
                <div key={entry.year} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold text-lg text-gray-900 dark:text-white">
                      {entry.year} - {entry.cupWinner.team} Won Cup
                    </div>
                    <div className="relative w-12 h-12 bg-white dark:bg-gray-700 rounded-lg p-1">
                      <Image
                        src={`/team-logos/${entry.cupWinner.abbrev.toLowerCase()}.png`}
                        alt={`${entry.cupWinner.team} Logo`}
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🥇</span>
                      <span>
                        {entry.first.name} ({entry.first.score})
                        {entry.first.perfectPicks && ` - ${entry.first.perfectPicks} Perfect Picks`}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🥈</span>
                      <span>
                        {entry.second.name}
                        {entry.second.score && ` (${entry.second.score})`}
                        {entry.second.perfectPicks && ` - ${entry.second.perfectPicks} Perfect Picks`}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-xl mr-2">🥉</span>
                      <span>
                        {entry.third.name}
                        {entry.third.score && ` (${entry.third.score})`}
                        {entry.third.perfectPicks && ` - ${entry.third.perfectPicks} Perfect Picks`}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      Last Place: {entry.lastPlace.name} ({entry.lastPlace.score})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 