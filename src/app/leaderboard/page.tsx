'use client';

import { useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  correctTeams: number;
  perfectPicks: number;
}

const leaderboardData: LeaderboardEntry[] = [
  { rank: 0, name: "GMA", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Fiona", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Claire", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Noah", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Cooper", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Rayna", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Rory", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Grady", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Crosby", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Bow", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Jill", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Jordan", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Grant", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Dave", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Rhonda", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Tina", points: 0, correctTeams: 0, perfectPicks: 0 },
  { rank: 0, name: "Bird", points: 0, correctTeams: 0, perfectPicks: 0 }
];

const getRankStyle = (rank: number) => {
  if (rank === 0) return 'bg-white border-gray-200';
  if (rank === 1) return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-400';
  if (rank === 2) return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-400';
  if (rank === 3) return 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-400';
  if (rank <= 10) return 'bg-white border-gray-300';
  return 'bg-white border-gray-200';
};

const getRankEmoji = (rank: number) => {
  if (rank === 0) return '-';
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
};

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen py-4">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Leaderboard</h1>
        
        {/* Point System Legend */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4 border border-gray-200">
          <h2 className="text-base font-semibold text-gray-900 mb-2">Point System</h2>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-700">Correct Team = 1 Point</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-700">Correct Team & # of Games = 2 Points</span>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-2">
          {leaderboardData.map((entry) => (
            <div
              key={entry.name}
              className={`
                rounded-lg border shadow-sm p-2
                ${getRankStyle(entry.rank)}
                transition-all duration-200 hover:shadow-md
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-base font-bold text-gray-400 w-6">
                    {getRankEmoji(entry.rank)}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{entry.name}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Correct</div>
                    <div className="text-sm font-medium text-gray-900">{entry.correctTeams}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Perfect</div>
                    <div className="text-sm font-medium text-gray-900">{entry.perfectPicks}</div>
                  </div>
                  <div className="text-right min-w-[60px]">
                    <div className="text-xs text-gray-500">Points</div>
                    <div className="text-sm font-bold text-gray-900">{entry.points}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 