'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Team, Matchup, UserPick } from '@/types/picks';

interface MatchupWithPicks extends Matchup {
  picks: UserPick[];
}

function MatchupPicksCard({ matchup }: { matchup: MatchupWithPicks }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Matchup Header */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative w-12 h-12">
              <Image
                src={matchup.homeTeam.logo}
                alt={matchup.homeTeam.name}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-semibold">{matchup.homeTeam.name}</span>
          </div>
          <div className="text-lg font-bold text-gray-400">VS</div>
          <div className="flex items-center space-x-4">
            <span className="font-semibold">{matchup.awayTeam.name}</span>
            <div className="relative w-12 h-12">
              <Image
                src={matchup.awayTeam.logo}
                alt={matchup.awayTeam.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Picks List */}
      <div className="divide-y divide-gray-200">
        {matchup.picks.map((pick, index) => (
          <div key={index} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{pick.userName}</span>
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <Image
                    src={pick.selectedTeam.logo}
                    alt={pick.selectedTeam.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-sm text-gray-600">
                  in {pick.games} {pick.games === 1 ? 'game' : 'games'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [matchups, setMatchups] = useState<MatchupWithPicks[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual Supabase fetch
    const fetchMatchupsAndPicks = async () => {
      try {
        // This will be replaced with actual Supabase queries
        const response = await fetch('/api/matchups-with-picks');
        const data = await response.json();
        setMatchups(data);
      } catch (error) {
        console.error('Error fetching matchups and picks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchupsAndPicks();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const easternMatchups = matchups.filter(
    (matchup) => matchup.homeTeam.conference === 'Eastern'
  );
  const westernMatchups = matchups.filter(
    (matchup) => matchup.homeTeam.conference === 'Western'
  );

  return (
    <div className="space-y-8 p-6">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">Playoff Picks Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500">
          View all picks made by pool participants for each playoff matchup.
        </p>
      </div>

      <div className="space-y-8">
        {/* Eastern Conference */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Eastern Conference</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {easternMatchups.map((matchup) => (
              <MatchupPicksCard key={matchup.id} matchup={matchup} />
            ))}
          </div>
        </div>

        {/* Western Conference */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Western Conference</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {westernMatchups.map((matchup) => (
              <MatchupPicksCard key={matchup.id} matchup={matchup} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 