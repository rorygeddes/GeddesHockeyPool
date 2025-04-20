'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface LeaderboardEntry {
  name: string;
  points: number;
  correctPicks: number;  // Correct team AND games
  correctTeams: number;  // Just correct team
}

export default function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Fetch profiles with their picks in a single query
        const { data: profiles, error: profilesError } = await supabase
          .from('profiles')
          .select(`
            id,
            email,
            picks:picks(*)
          `);

        if (profilesError) {
          console.error('Error fetching profiles:', profilesError);
          throw profilesError;
        }

        if (!profiles) {
          throw new Error('No profiles found');
        }

        // Calculate points for each user
        const leaderboardData = profiles.map((profile) => {
          const userPicks = profile.picks || [];
          
          const correctPicks = userPicks.filter((pick) => {
            // TODO: Compare with actual results when available
            return false; // For now, no correct picks since results aren't in
          }).length;

          const correctTeams = userPicks.filter((pick) => {
            // TODO: Compare with actual results when available
            return false; // For now, no correct teams since results aren't in
          }).length;

          return {
            name: profile.email?.split('@')[0] || 'Unknown User', // Use the part before @ as display name
            points: (correctPicks * 2) + (correctTeams), // 2 points for perfect picks, 1 for correct team
            correctPicks,
            correctTeams,
          };
        });

        // Sort by points in descending order
        leaderboardData.sort((a, b) => b.points - a.points);

        setLeaderboard(leaderboardData);
      } catch (err) {
        console.error('Error fetching leaderboard data:', err);
        setError('Failed to fetch leaderboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [supabase]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
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

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-gray-500">
            Scoring: 2 points for correct team and games, 1 point for correct team only
          </p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Perfect Picks
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Correct Teams
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {leaderboard.length > 0 ? (
                leaderboard.map((entry, index) => (
                  <tr key={entry.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
                        {entry.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 tabular-nums">
                        {entry.points}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 tabular-nums">
                        {entry.correctPicks}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 tabular-nums">
                        {entry.correctTeams}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No users have made picks yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>* Perfect picks are when both the winning team and number of games are predicted correctly</p>
        </div>
      </div>
    </div>
  );
} 