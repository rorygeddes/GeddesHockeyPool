'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
}

interface MatchupCardProps {
  homeTeam: Team;
  awayTeam: Team;
  onPickTeam: (teamId: string) => void;
  onPickGames: (games: number) => void;
  selectedTeamId?: string;
  selectedGames?: number;
}

export default function MatchupCard({ 
  homeTeam, 
  awayTeam, 
  onPickTeam, 
  onPickGames,
  selectedTeamId,
  selectedGames 
}: MatchupCardProps) {
  const [homeImageError, setHomeImageError] = useState(false);
  const [awayImageError, setAwayImageError] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between space-x-4">
          <button
            onClick={() => onPickTeam(homeTeam.id)}
            className={`flex-1 flex flex-col items-center p-4 rounded-lg transition-colors ${
              selectedTeamId === homeTeam.id
                ? 'bg-indigo-50 border-2 border-indigo-500'
                : 'hover:bg-gray-50 border-2 border-transparent'
            }`}
          >
            <div className="relative w-24 h-24 mb-2 bg-gray-50">
              {!homeImageError ? (
                <Image
                  src={homeTeam.logo}
                  alt={`${homeTeam.name} logo`}
                  fill
                  className="object-contain"
                  priority
                  onError={() => setHomeImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {homeTeam.abbreviation}
                </div>
              )}
            </div>
            <span className="font-medium text-gray-900">{homeTeam.name}</span>
          </button>

          <div className="flex flex-col items-center">
            <span className="text-lg font-bold text-gray-400">VS</span>
          </div>

          <button
            onClick={() => onPickTeam(awayTeam.id)}
            className={`flex-1 flex flex-col items-center p-4 rounded-lg transition-colors ${
              selectedTeamId === awayTeam.id
                ? 'bg-indigo-50 border-2 border-indigo-500'
                : 'hover:bg-gray-50 border-2 border-transparent'
            }`}
          >
            <div className="relative w-24 h-24 mb-2 bg-gray-50">
              {!awayImageError ? (
                <Image
                  src={awayTeam.logo}
                  alt={`${awayTeam.name} logo`}
                  fill
                  className="object-contain"
                  priority
                  onError={() => setAwayImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {awayTeam.abbreviation}
                </div>
              )}
            </div>
            <span className="font-medium text-gray-900">{awayTeam.name}</span>
          </button>
        </div>

        {selectedTeamId && (
          <div className="flex justify-center items-center space-x-2">
            <span className="text-sm text-gray-600">Games:</span>
            {[4, 5, 6, 7].map((games) => (
              <button
                key={games}
                onClick={() => onPickGames(games)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  selectedGames === games
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {games}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 