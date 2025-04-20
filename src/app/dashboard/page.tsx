'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Team } from '@/lib/teams';
import { teams } from '@/lib/teams';

interface Pick {
  userName: string;
  selectedTeam: Team;
  games: number;
}

interface MatchupWithPicks {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  round: number;
  picks: Pick[];
}

export default function DashboardPage() {
  const router = useRouter();
  const [matchups, setMatchups] = useState<MatchupWithPicks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        router.push('/sign-in');
        return null;
      }
      return user;
    };

    const fetchMatchupsAndPicks = async () => {
      try {
        const user = await checkUser();
        if (!user) return;

        // First, fetch matchups
        const { data: matchupsData, error: matchupsError } = await supabase
          .from('matchups')
          .select('*')
          .order('round');

        if (matchupsError) throw matchupsError;

        // Then, fetch picks for each matchup
        const picksPromises = matchupsData.map(matchup =>
          supabase
            .from('picks')
            .select(`
              id,
              user_id,
              selected_team_id,
              games,
              users (
                id,
                email
              )
            `)
            .eq('matchup_id', matchup.id)
        );

        const picksResults = await Promise.all(picksPromises);
        
        const formattedMatchups: MatchupWithPicks[] = matchupsData.map((matchup, index) => {
          const picksData = picksResults[index].data || [];
          return {
            id: matchup.id,
            homeTeam: teams[matchup.home_team_id],
            awayTeam: teams[matchup.away_team_id],
            round: matchup.round,
            picks: picksData.map((pick) => ({
              userName: pick.users?.email?.split('@')[0] || 'Unknown',
              selectedTeam: teams[pick.selected_team_id],
              games: pick.games,
            })),
          };
        });

        setMatchups(formattedMatchups);
      } catch (err) {
        console.error('Error fetching matchups and picks:', err);
        setError('Failed to load matchups and picks');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchupsAndPicks();
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  const easternMatchups = matchups.filter(
    (matchup) => matchup.homeTeam.conference === 'Eastern'
  );

  const westernMatchups = matchups.filter(
    (matchup) => matchup.homeTeam.conference === 'Western'
  );

  const renderPicks = (picks: Pick[]) => {
    if (picks.length === 0) {
      return <p className="text-gray-500 text-sm italic mt-2">No picks submitted yet</p>;
    }

    return (
      <div className="mt-4 space-y-2">
        {picks.map((pick, index) => (
          <div key={index} className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded">
            <div className="flex items-center space-x-2">
              <div className="relative w-6 h-6">
                <Image
                  src={pick.selectedTeam.logo}
                  alt={pick.selectedTeam.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-medium">{pick.userName}</span>
            </div>
            <span className="text-gray-600">in {pick.games}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-3xl font-bold text-gray-900">Playoff Picks Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500">
            View all submitted picks for the playoff matchups.
          </p>
        </div>

        <div className="mt-8 space-y-12">
          {/* Eastern Conference */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Eastern Conference</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {easternMatchups.map((matchup) => (
                <div key={matchup.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10">
                        <Image
                          src={matchup.homeTeam.logo}
                          alt={matchup.homeTeam.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium">{matchup.homeTeam.name}</span>
                    </div>
                    <span className="text-gray-500">vs</span>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{matchup.awayTeam.name}</span>
                      <div className="relative w-10 h-10">
                        <Image
                          src={matchup.awayTeam.logo}
                          alt={matchup.awayTeam.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  {renderPicks(matchup.picks)}
                </div>
              ))}
            </div>
          </div>

          {/* Western Conference */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Western Conference</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {westernMatchups.map((matchup) => (
                <div key={matchup.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10">
                        <Image
                          src={matchup.homeTeam.logo}
                          alt={matchup.homeTeam.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium">{matchup.homeTeam.name}</span>
                    </div>
                    <span className="text-gray-500">vs</span>
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{matchup.awayTeam.name}</span>
                      <div className="relative w-10 h-10">
                        <Image
                          src={matchup.awayTeam.logo}
                          alt={matchup.awayTeam.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  {renderPicks(matchup.picks)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 