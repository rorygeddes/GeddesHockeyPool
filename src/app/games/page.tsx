'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Team {
  id: number;
  name: string;
  abbrev: string;
  score?: number;
  wins?: number;
}

interface Matchup {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  seriesStatus?: string;
}

interface Conference {
  name: string;
  matchups: Matchup[];
}

interface Series {
  seriesCode: string;
  conference: string;
  homeTeam: {
    id: number;
    name: {
      default: string;
    };
    abbrev: string;
    seriesWins: number;
  };
  awayTeam: {
    id: number;
    name: {
      default: string;
    };
    abbrev: string;
    seriesWins: number;
  };
}

export default function PlayoffMatchups() {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPlayoffData() {
      try {
        const response = await fetch('/api/nhl');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        
        // Process playoff data
        const playoffData = data.playoffs;
        if (!playoffData?.rounds?.[0]?.series) {
          throw new Error('No playoff data available');
        }

        const eastMatchups: Matchup[] = [];
        const westMatchups: Matchup[] = [];

        playoffData.rounds[0].series.forEach((series: Series) => {
          const matchup = {
            id: series.seriesCode,
            homeTeam: {
              id: series.homeTeam.id,
              name: series.homeTeam.name.default,
              abbrev: series.homeTeam.abbrev,
              wins: series.homeTeam.seriesWins
            },
            awayTeam: {
              id: series.awayTeam.id,
              name: series.awayTeam.name.default,
              abbrev: series.awayTeam.abbrev,
              wins: series.awayTeam.seriesWins
            },
            seriesStatus: `${series.homeTeam.seriesWins}-${series.awayTeam.seriesWins}`
          };

          if (series.conference === 'Eastern') {
            eastMatchups.push(matchup);
          } else {
            westMatchups.push(matchup);
          }
        });

        setConferences([
          { name: 'Eastern Conference', matchups: eastMatchups },
          { name: 'Western Conference', matchups: westMatchups }
        ]);
        setError(null);
      } catch (err) {
        setError('Failed to load playoff data');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayoffData();
    const interval = setInterval(fetchPlayoffData, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {conferences.map((conference) => (
        <div key={conference.name} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{conference.name}</h2>
          <div className="space-y-4">
            {conference.matchups.map((matchup) => (
              <div 
                key={matchup.id} 
                className="bg-gradient-to-r from-slate-100 to-rose-100 rounded-lg p-4 shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <div className="relative w-12 h-12 mr-4">
                      <Image
                        src={`/team-logos/${matchup.awayTeam.abbrev.toLowerCase()}.png`}
                        alt={matchup.awayTeam.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex items-center">
                      <span className="font-semibold">{matchup.awayTeam.name}</span>
                      <span className="ml-2 text-lg font-bold">{matchup.awayTeam.wins}</span>
                    </div>
                  </div>
                  <div className="mx-4 font-bold text-gray-500">VS</div>
                  <div className="flex items-center flex-1 justify-end">
                    <div className="flex items-center">
                      <span className="font-bold text-lg mr-2">{matchup.homeTeam.wins}</span>
                      <span className="font-semibold">{matchup.homeTeam.name}</span>
                    </div>
                    <div className="relative w-12 h-12 ml-4">
                      <Image
                        src={`/team-logos/${matchup.homeTeam.abbrev.toLowerCase()}.png`}
                        alt={matchup.homeTeam.name}
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
      ))}
    </div>
  );
} 