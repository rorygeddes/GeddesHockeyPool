'use client';

import Link from 'next/link';
import { teamMembers } from '@/app/matchups/page';

interface TeamMemberPick {
  team: string;
  games: number;
  matchupId: string;
}

interface CompletedMatchup {
  id: string;
  winner: string;
  games: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  correctTeams: number;
  perfectPicks: number;
}

interface TeamMember {
  name: string;
  picks: TeamMemberPick[];
}

// Add completed matchups data
const completedMatchups: CompletedMatchup[] = [
  {
    id: 'CAR-NJD',
    winner: 'CAR',
    games: 5
  }
];

// Calculate points and create leaderboard data
const calculatePoints = (picks: TeamMemberPick[]): number => {
  return picks.reduce((total, pick) => {
    const matchup = completedMatchups.find(m => m.id === pick.matchupId);
    if (!matchup) return total;

    const correctTeam = pick.team === matchup.winner;
    const correctGames = pick.games === matchup.games;

    if (correctTeam && correctGames) {
      return total + 2; // Perfect pick - 2 points
    } else if (correctTeam) {
      return total + 1; // Correct team only - 1 point
    }
    return total;
  }, 0);
};

interface Stats {
  correctTeams: number;
  perfectPicks: number;
}

const calculateStats = (picks: TeamMemberPick[]): Stats => {
  return picks.reduce((stats, pick) => {
    const matchup = completedMatchups.find(m => m.id === pick.matchupId);
    if (!matchup) return stats;

    const correctTeam = pick.team === matchup.winner;
    const correctGames = pick.games === matchup.games;

    if (correctTeam && correctGames) {
      return {
        correctTeams: stats.correctTeams + 1,
        perfectPicks: stats.perfectPicks + 1
      };
    } else if (correctTeam) {
      return {
        correctTeams: stats.correctTeams + 1,
        perfectPicks: stats.perfectPicks
      };
    }
    return stats;
  }, { correctTeams: 0, perfectPicks: 0 });
};

const leaderboardData: LeaderboardEntry[] = teamMembers
  .map((member: TeamMember) => {
    const stats = calculateStats(member.picks);
    return {
      rank: 0, // Will be set after sorting
      name: member.name,
      points: calculatePoints(member.picks),
      correctTeams: stats.correctTeams,
      perfectPicks: stats.perfectPicks
    };
  })
  .sort((a, b) => b.points - a.points)
  .reduce((acc: LeaderboardEntry[], entry, index, array) => {
    if (index === 0) {
      // First entry always gets rank 1
      return [...acc, { ...entry, rank: 1 }];
    }

    const prevEntry = array[index - 1];
    if (entry.points === prevEntry.points) {
      // If points are equal, use the same rank as previous entry
      return [...acc, { ...entry, rank: acc[index - 1].rank }];
    } else {
      // If points are different, rank is the current position + 1
      return [...acc, { ...entry, rank: acc[index - 1].rank + 1 }];
    }
  }, []);

const getRankStyle = (rank: number): string => {
  if (rank === 0) return 'bg-white border-gray-200';
  if (rank === 1) return 'bg-gradient-to-r from-yellow-100 to-yellow-200 border-yellow-400';
  if (rank === 2) return 'bg-gradient-to-r from-gray-100 to-gray-200 border-gray-400';
  if (rank === 3) return 'bg-gradient-to-r from-amber-100 to-amber-200 border-amber-400';
  if (rank <= 10) return 'bg-white border-gray-300';
  return 'bg-white border-gray-200';
};

const getRankEmoji = (rank: number): string | number => {
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
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Leaderboard</h1>
        
        {/* Point System Legend */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4 border border-gray-200 dark:border-gray-700">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">Point System</h2>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-700 dark:text-gray-300">Correct Team = 1 Point</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs text-gray-700 dark:text-gray-300">Correct Team & # of Games = 2 Points</span>
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
                dark:border-gray-700
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-base font-bold text-gray-400 dark:text-gray-500 w-6">
                    {getRankEmoji(entry.rank)}
                  </span>
                  <Link 
                    href={`/teams?member=${entry.name}`}
                    className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition-colors"
                  >
                    {entry.name}
                  </Link>
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