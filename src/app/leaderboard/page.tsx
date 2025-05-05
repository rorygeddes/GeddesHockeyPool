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
  // Second Round
  {
    id: 'TOR-CAR',
    winner: 'CAR',
    games: 5
  },
  {
    id: 'WSH-FLA',
    winner: 'FLA',
    games: 6
  },
  {
    id: 'VGK-EDM',
    winner: 'VGK',
    games: 6
  },
  {
    id: 'WPG-DAL',
    winner: 'DAL',
    games: 6
  },
  // First Round
  {
    id: 'TOR-OTT',
    winner: 'TOR',
    games: 6
  },
  {
    id: 'CAR-NJD',
    winner: 'CAR',
    games: 5
  },
  {
    id: 'WSH-MTL',
    winner: 'WSH',
    games: 5
  },
  {
    id: 'TBL-FLA',
    winner: 'FLA',
    games: 5
  },
  {
    id: 'VGK-MIN',
    winner: 'VGK',
    games: 6
  },
  {
    id: 'LA-EDM',
    winner: 'EDM',
    games: 6
  },
  {
    id: 'WPG-STL',
    winner: 'WPG',
    games: 7
  },
  {
    id: 'DAL-COL',
    winner: 'DAL',
    games: 7
  }
];

// Calculate points and create leaderboard data
const calculatePoints = (picks: TeamMemberPick[]): LeaderboardEntry => {
  let correctTeams = 0;
  let perfectPicks = 0;
  let points = 0;

  picks.forEach(pick => {
    const matchup = completedMatchups.find(m => m.id === pick.matchupId);
    if (matchup) {
      if (pick.team === matchup.winner) {
        correctTeams++;
        if (pick.games === matchup.games) {
          perfectPicks++;
          points += 2; // Perfect pick - 2 points
        } else {
          points += 1; // Correct team only - 1 point
        }
      }
    }
  });

  return {
    rank: 0, // Will be set after sorting
    name: '',
    points,
    correctTeams,
    perfectPicks
  };
};

const leaderboardData: LeaderboardEntry[] = teamMembers
  .map((member: TeamMember) => {
    const leaderboardEntry = calculatePoints(member.picks);
    return {
      ...leaderboardEntry,
      name: member.name
    };
  })
  .sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    }
    if (b.perfectPicks !== a.perfectPicks) {
      return b.perfectPicks - a.perfectPicks;
    }
    return b.correctTeams - a.correctTeams;
  })
  .reduce((acc: LeaderboardEntry[], entry, index, array) => {
    if (index === 0) {
      // First entry always gets rank 1
      return [...acc, { ...entry, rank: 1 }];
    }

    const prevEntry = array[index - 1];
    if (entry.points === prevEntry.points && entry.perfectPicks === prevEntry.perfectPicks && entry.correctTeams === prevEntry.correctTeams) {
      // If points, perfect picks, and correct teams are equal, use the same rank as previous entry
      return [...acc, { ...entry, rank: acc[index - 1].rank }];
    } else {
      // If any of the above are different, rank is the current position + 1
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