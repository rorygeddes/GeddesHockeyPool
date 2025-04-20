'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';

interface Team {
  id: string;
  name: string;
  logo_url: string;
}

interface Matchup {
  id: string;
  round: number;
  home_team: Team;
  away_team: Team;
  home_team_id: string;
  away_team_id: string;
  conference: 'Eastern' | 'Western';
}

interface MatchupCardProps {
  matchup: Matchup;
  className?: string;
}

const MatchupCard = ({ matchup, className = '' }: MatchupCardProps) => {
  return (
    <div className={`bg-gray-800 rounded-lg p-4 w-[300px] ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 relative mr-2">
            {matchup.home_team?.logo_url && (
              <Image
                src={matchup.home_team.logo_url}
                alt={`${matchup.home_team.name} logo`}
                fill
                className="object-contain"
              />
            )}
          </div>
          <span className="text-white">{matchup.home_team?.name || 'TBD'}</span>
        </div>
        <span className="text-white">0</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 relative mr-2">
            {matchup.away_team?.logo_url && (
              <Image
                src={matchup.away_team.logo_url}
                alt={`${matchup.away_team.name} logo`}
                fill
                className="object-contain"
              />
            )}
          </div>
          <span className="text-white">{matchup.away_team?.name || 'TBD'}</span>
        </div>
        <span className="text-white">0</span>
      </div>
    </div>
  );
};

const BracketConnector = ({ className = '' }: { className?: string }) => (
  <div className={`w-[60px] border-t-2 border-gray-600 ${className}`} />
);

export default function PlayoffBracket() {
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchMatchups = async () => {
      try {
        const { data, error } = await supabase
          .from('matchups')
          .select(`
            *,
            home_team:home_team_id (id, name, logo_url),
            away_team:away_team_id (id, name, logo_url)
          `);

        if (error) throw error;
        setMatchups(data || []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchMatchups();
  }, [supabase]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getMatchupsByRoundAndConference = (round: number, conference: 'Eastern' | 'Western') => {
    return matchups.filter(m => m.round === round && m.conference === conference);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12">
      <div className="max-w-[1800px] mx-auto px-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">NHL Playoff Bracket</h1>
        
        <div className="flex justify-between gap-16">
          {/* Eastern Conference */}
          <div className="flex-1 min-w-[600px]">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Eastern Conference</h2>
            <div className="grid grid-cols-[300px_60px_300px_60px_300px] gap-8">
              {/* Round 1 */}
              <div className="space-y-8">
                {getMatchupsByRoundAndConference(1, 'Eastern').map((matchup) => (
                  <MatchupCard key={matchup.id} matchup={matchup} />
                ))}
              </div>

              {/* Connectors to Round 2 */}
              <div className="flex flex-col justify-around pt-12 pb-12">
                <BracketConnector />
                <BracketConnector />
              </div>

              {/* Round 2 */}
              <div className="space-y-8 pt-24">
                {getMatchupsByRoundAndConference(2, 'Eastern').map((matchup) => (
                  <MatchupCard key={matchup.id} matchup={matchup} />
                ))}
              </div>

              {/* Connectors to Conference Final */}
              <div className="flex flex-col justify-center">
                <BracketConnector />
              </div>

              {/* Conference Final */}
              <div className="flex flex-col justify-center">
                {getMatchupsByRoundAndConference(3, 'Eastern').map((matchup) => (
                  <MatchupCard key={matchup.id} matchup={matchup} />
                ))}
              </div>
            </div>
          </div>

          {/* Stanley Cup Final */}
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Stanley Cup Final</h2>
            {matchups.filter(m => m.round === 4).map((matchup) => (
              <MatchupCard key={matchup.id} matchup={matchup} />
            ))}
          </div>

          {/* Western Conference */}
          <div className="flex-1 min-w-[600px]">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Western Conference</h2>
            <div className="grid grid-cols-[300px_60px_300px_60px_300px] gap-8">
              {/* Round 1 */}
              <div className="space-y-8">
                {getMatchupsByRoundAndConference(1, 'Western').map((matchup) => (
                  <MatchupCard key={matchup.id} matchup={matchup} />
                ))}
              </div>

              {/* Connectors to Round 2 */}
              <div className="flex flex-col justify-around pt-12 pb-12">
                <BracketConnector />
                <BracketConnector />
              </div>

              {/* Round 2 */}
              <div className="space-y-8 pt-24">
                {getMatchupsByRoundAndConference(2, 'Western').map((matchup) => (
                  <MatchupCard key={matchup.id} matchup={matchup} />
                ))}
              </div>

              {/* Connectors to Conference Final */}
              <div className="flex flex-col justify-center">
                <BracketConnector />
              </div>

              {/* Conference Final */}
              <div className="flex flex-col justify-center">
                {getMatchupsByRoundAndConference(3, 'Western').map((matchup) => (
                  <MatchupCard key={matchup.id} matchup={matchup} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 