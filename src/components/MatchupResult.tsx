import React from 'react';
import Image from 'next/image';

interface MatchupResultProps {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  winner: string;
  games: number;
  picks: Array<{
    name: string;
    selectedTeam: string;
    games: number;
  }>;
}

export default function MatchupResult({ 
  homeTeam, 
  awayTeam, 
  homeScore, 
  awayScore,
  winner,
  games,
  picks
}: MatchupResultProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-8 h-8">
            <Image
              src={`/team-logos/${homeTeam.toLowerCase()}.png`}
              alt={homeTeam}
              fill
              className="object-contain"
            />
          </div>
          <span className="font-semibold">{homeTeam}</span>
          <span className="text-xl font-bold">{homeScore}</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xl font-bold">{awayScore}</span>
          <span className="font-semibold">{awayTeam}</span>
          <div className="relative w-8 h-8">
            <Image
              src={`/team-logos/${awayTeam.toLowerCase()}.png`}
              alt={awayTeam}
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Picks</h3>
        <div className="space-y-2">
          {picks.map((pick, index) => {
            const correctTeam = pick.selectedTeam === winner;
            const correctGames = pick.games === games;
            
            let bgColor = 'bg-white';
            if (correctTeam && correctGames) {
              bgColor = 'bg-green-100';
            } else if (correctTeam) {
              bgColor = 'bg-blue-100';
            }
            
            return (
              <div 
                key={index} 
                className={`flex justify-between items-center p-2 rounded ${bgColor}`}
              >
                <div className="flex items-center space-x-2">
                  <span>{pick.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{pick.selectedTeam}</span>
                  <span>in {pick.games}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}