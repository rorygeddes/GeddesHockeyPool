'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { teams } from '@/lib/teams';
import type { Team } from '@/lib/teams';

interface Matchup {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  round: number;
  picks: Pick[];
}

interface Pick {
  userName: string;
  selectedTeam: Team;
  games: number;
}

const TeamLogo = ({ src, alt, size }: { src: string; alt: string; size: number }) => {
  return (
    <div className={`relative w-${size} h-${size} flex items-center justify-center`}>
      <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse" />
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="relative object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/nhl-shield.svg'; // Fallback to NHL shield if team logo fails
        }}
      />
    </div>
  );
};

const MatchupCard = ({ matchup }: { matchup: Matchup }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 relative mr-2">
            {matchup.homeTeam?.logo && (
              <Image
                src={matchup.homeTeam.logo}
                alt={`${matchup.homeTeam.name} logo`}
                fill
                className="object-contain"
              />
            )}
          </div>
          <span className="text-white">{matchup.homeTeam?.name || 'TBD'}</span>
        </div>
        <span className="text-white">0</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 relative mr-2">
            {matchup.awayTeam?.logo && (
              <Image
                src={matchup.awayTeam.logo}
                alt={`${matchup.awayTeam.name} logo`}
                fill
                className="object-contain"
              />
            )}
          </div>
          <span className="text-white">{matchup.awayTeam?.name || 'TBD'}</span>
        </div>
        <span className="text-white">0</span>
      </div>
    </div>
  );
};

export default function BracketPage() {
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        const { data: matchupsData, error: matchupsError } = await supabase
          .from('matchups')
          .select(`
            id,
            home_team_id,
            away_team_id,
            round,
            picks (
              id,
              user_id,
              selected_team_id,
              games,
              users (
                id,
                email
              )
            )
          `);

        if (matchupsError) throw matchupsError;

        const formattedMatchups = matchupsData.map((matchup) => ({
          id: matchup.id,
          homeTeam: teams[matchup.home_team_id],
          awayTeam: teams[matchup.away_team_id],
          round: matchup.round,
          picks: matchup.picks.map((pick) => ({
            userName: pick.users.email.split('@')[0],
            selectedTeam: teams[pick.selected_team_id],
            games: pick.games,
          })),
        }));

        setMatchups(formattedMatchups);
      } catch (error) {
        console.error('Error fetching matchups:', error);
        setError('Failed to fetch matchups');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchups();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-3xl font-bold mb-8">NHL Playoff Bracket</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Eastern Conference */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Eastern Conference</h2>
          <div className="space-y-4">
            {matchups
              .filter((matchup) => matchup.homeTeam.conference === 'Eastern')
              .map((matchup) => (
                <div key={matchup.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="relative w-8 h-8">
                        <Image
                          src={matchup.homeTeam.logo}
                          alt={matchup.homeTeam.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>{matchup.homeTeam.name}</span>
                    </div>
                    <span>vs</span>
                    <div className="flex items-center space-x-2">
                      <span>{matchup.awayTeam.name}</span>
                      <div className="relative w-8 h-8">
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
              ))}
          </div>
        </div>

        {/* Western Conference */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Western Conference</h2>
          <div className="space-y-4">
            {matchups
              .filter((matchup) => matchup.homeTeam.conference === 'Western')
              .map((matchup) => (
                <div key={matchup.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="relative w-8 h-8">
                        <Image
                          src={matchup.homeTeam.logo}
                          alt={matchup.homeTeam.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>{matchup.homeTeam.name}</span>
                    </div>
                    <span>vs</span>
                    <div className="flex items-center space-x-2">
                      <span>{matchup.awayTeam.name}</span>
                      <div className="relative w-8 h-8">
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
              ))}
          </div>
        </div>
      </div>
    </div>
  );
} 