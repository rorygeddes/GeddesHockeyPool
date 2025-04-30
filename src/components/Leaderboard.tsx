import { FC } from 'react';

interface Pick {
  team: string;
  games: number;
  matchupId: string;
}

interface TeamMember {
  name: string;
  picks: Pick[];
}

interface LeaderboardProps {
  teamMembers: TeamMember[];
  completedMatchups: {
    id: string;
    winner: string;
    games: number;
  }[];
}

const Leaderboard: FC<LeaderboardProps> = ({ teamMembers, completedMatchups }) => {
  const calculateScore = (picks: Pick[]) => {
    return picks.reduce((total, pick) => {
      const matchup = completedMatchups.find(m => m.id === pick.matchupId);
      if (!matchup) return total;

      const correctTeam = pick.team === matchup.winner;
      const correctGames = pick.games === matchup.games;

      if (correctTeam && correctGames) {
        return total + 2; // Green background - 2 points
      } else if (correctTeam) {
        return total + 1; // Blue background - 1 point
      }
      return total; // Grey background - 0 points
    }, 0);
  };

  const leaderboardData = teamMembers
    .map(member => ({
      name: member.name,
      score: calculateScore(member.picks)
    }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Leaderboard</h2>
      <div className="space-y-2">
        {leaderboardData.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded"
          >
            <div className="flex items-center">
              <span className="font-medium w-6">{index + 1}.</span>
              <span className="ml-2">{item.name}</span>
            </div>
            <span className="font-bold">{item.score} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
