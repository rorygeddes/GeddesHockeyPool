'use client';

import { PlayoffMatchup } from '@/types';

export default function Home() {
  // This will be replaced with actual data from Supabase
  const mockMatchups: PlayoffMatchup[] = [];

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">Geddes Hockey Pool 2024</h1>
        <p className="mt-2 text-sm text-gray-500">
          Welcome to the Geddes family hockey pool! Make your picks for the playoff matchups below.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Current Playoff Matchups</h2>
          {mockMatchups.length > 0 ? (
            <div className="space-y-4">
              {mockMatchups.map((matchup) => (
                <div
                  key={matchup.id}
                  className="bg-white shadow rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{matchup.homeTeam.name}</span>
                        <span>vs</span>
                        <span className="font-medium">{matchup.awayTeam.name}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Round {matchup.round} - {matchup.status}
                      </div>
                    </div>
                    {matchup.status === 'upcoming' && (
                      <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                        Make Pick
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">No active playoff matchups at the moment.</p>
              <p className="text-sm text-gray-400 mt-1">Check back when the playoffs begin!</p>
            </div>
          )}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Leaderboard</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">-</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
