'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Team } from '@/lib/teams';
import { teams } from '@/lib/teams';

interface Matchup {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  round: number;
}

interface Pick {
  teamId: string;
  games: number;
}

interface DatabasePick {
  id: string;
  user_id: string;
  matchup_id: string;
  selected_team_id: string;
  games: number;
}

interface MatchupData {
  id: string;
  home_team_id: string;
  away_team_id: string;
  round: number;
}

export default function PicksPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeams, setSelectedTeams] = useState<Record<string, string>>({});
  const [selectedGames, setSelectedGames] = useState<Record<string, number>>({});
  const [submittedPicks, setSubmittedPicks] = useState<Record<string, Pick>>({});
  const [editMode, setEditMode] = useState(false);
  const [hasInitialPicks, setHasInitialPicks] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          router.push('/sign-in');
          return;
        }

        // Fetch matchups
        const { data: matchupsData, error: matchupsError } = await supabase
          .from('matchups')
          .select('*')
          .order('round');

        if (matchupsError) throw matchupsError;

        // Transform the matchups data to include team objects
        const formattedMatchups = (matchupsData as MatchupData[]).map(matchup => ({
          id: matchup.id,
          homeTeam: teams[matchup.home_team_id],
          awayTeam: teams[matchup.away_team_id],
          round: matchup.round
        }));

        // Fetch user's picks
        const { data: picksData, error: picksError } = await supabase
          .from('picks')
          .select('*')
          .eq('user_id', session.user.id);

        if (picksError) throw picksError;

        // Convert picks to a map for easier access
        const picksMap: Record<string, Pick> = {};
        (picksData as DatabasePick[]).forEach((pick) => {
          picksMap[pick.matchup_id] = {
            teamId: pick.selected_team_id,
            games: pick.games,
          };
        });

        setMatchups(formattedMatchups);
        setSubmittedPicks(picksMap);
        setHasInitialPicks(Object.keys(picksMap).length > 0);

        // Initialize selected teams and games from submitted picks
        if (Object.keys(picksMap).length > 0) {
          const initialTeams: Record<string, string> = {};
          const initialGames: Record<string, number> = {};
          Object.entries(picksMap).forEach(([matchupId, pick]) => {
            initialTeams[matchupId] = pick.teamId;
            initialGames[matchupId] = pick.games;
          });
          setSelectedTeams(initialTeams);
          setSelectedGames(initialGames);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, supabase]);

  const handleTeamSelect = (matchupId: string, teamId: string) => {
    if (!editMode && hasInitialPicks) return;
    setSelectedTeams(prev => ({ ...prev, [matchupId]: teamId }));
  };

  const handleGamesSelect = (matchupId: string, games: number) => {
    if (!editMode && hasInitialPicks) return;
    setSelectedGames(prev => ({ ...prev, [matchupId]: games }));
  };

  const handleSubmit = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/sign-in');
        return;
      }

      const picks = Object.keys(selectedTeams).map(matchupId => ({
        user_id: session.user.id,
        matchup_id: matchupId,
        selected_team_id: selectedTeams[matchupId],
        games: selectedGames[matchupId] || 4,
      }));

      const { error: upsertError } = await supabase
        .from('picks')
        .upsert(picks);

      if (upsertError) throw upsertError;

      setSubmittedPicks(
        picks.reduce((acc, pick) => ({
          ...acc,
          [pick.matchup_id]: {
            teamId: pick.selected_team_id,
            games: pick.games,
          },
        }), {})
      );
      setHasInitialPicks(true);
      setEditMode(false);
    } catch (error) {
      console.error('Error submitting picks:', error);
      setError('Failed to submit picks');
    }
  };

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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Playoff Picks</h1>
          {hasInitialPicks && (
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              {editMode ? 'Cancel Edit' : 'Edit Picks'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Eastern Conference */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Eastern Conference</h2>
            <div className="space-y-4">
              {matchups
                .filter(matchup => matchup.homeTeam.conference === 'Eastern')
                .map(matchup => (
                  <div key={matchup.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="relative w-8 h-8">
                          <Image
                            src={matchup.homeTeam.logo}
                            alt={matchup.homeTeam.name}
                            width={32}
                            height={32}
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
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Team Selection */}
                    <div className="flex justify-between items-center mb-4">
                      <button
                        onClick={() => handleTeamSelect(matchup.id, matchup.homeTeam.id)}
                        className={`px-4 py-2 rounded ${
                          selectedTeams[matchup.id] === matchup.homeTeam.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } ${(!editMode && hasInitialPicks) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!editMode && hasInitialPicks}
                      >
                        {matchup.homeTeam.name}
                      </button>
                      <button
                        onClick={() => handleTeamSelect(matchup.id, matchup.awayTeam.id)}
                        className={`px-4 py-2 rounded ${
                          selectedTeams[matchup.id] === matchup.awayTeam.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } ${(!editMode && hasInitialPicks) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!editMode && hasInitialPicks}
                      >
                        {matchup.awayTeam.name}
                      </button>
                    </div>

                    {/* Games Selection */}
                    <div className="flex justify-center space-x-2">
                      {[4, 5, 6, 7].map(games => (
                        <button
                          key={games}
                          onClick={() => handleGamesSelect(matchup.id, games)}
                          className={`px-3 py-1 rounded ${
                            selectedGames[matchup.id] === games
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          } ${(!editMode && hasInitialPicks) ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!editMode && hasInitialPicks}
                        >
                          {games}
                        </button>
                      ))}
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
                .filter(matchup => matchup.homeTeam.conference === 'Western')
                .map(matchup => (
                  <div key={matchup.id} className="bg-white rounded-lg shadow p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="relative w-8 h-8">
                          <Image
                            src={matchup.homeTeam.logo}
                            alt={matchup.homeTeam.name}
                            width={32}
                            height={32}
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
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Team Selection */}
                    <div className="flex justify-between items-center mb-4">
                      <button
                        onClick={() => handleTeamSelect(matchup.id, matchup.homeTeam.id)}
                        className={`px-4 py-2 rounded ${
                          selectedTeams[matchup.id] === matchup.homeTeam.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } ${(!editMode && hasInitialPicks) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!editMode && hasInitialPicks}
                      >
                        {matchup.homeTeam.name}
                      </button>
                      <button
                        onClick={() => handleTeamSelect(matchup.id, matchup.awayTeam.id)}
                        className={`px-4 py-2 rounded ${
                          selectedTeams[matchup.id] === matchup.awayTeam.id
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } ${(!editMode && hasInitialPicks) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!editMode && hasInitialPicks}
                      >
                        {matchup.awayTeam.name}
                      </button>
                    </div>

                    {/* Games Selection */}
                    <div className="flex justify-center space-x-2">
                      {[4, 5, 6, 7].map(games => (
                        <button
                          key={games}
                          onClick={() => handleGamesSelect(matchup.id, games)}
                          className={`px-3 py-1 rounded ${
                            selectedGames[matchup.id] === games
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          } ${(!editMode && hasInitialPicks) ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={!editMode && hasInitialPicks}
                        >
                          {games}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={!editMode && hasInitialPicks}
            className={`px-6 py-3 rounded-md ${
              (!editMode && hasInitialPicks)
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
            }`}
          >
            {hasInitialPicks ? 'Update Picks' : 'Submit Picks'}
          </button>
        </div>
      </div>
    </div>
  );
} 