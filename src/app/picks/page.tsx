'use client';

import { useState, useEffect } from 'react';
import MatchupCard from '@/components/MatchupCard';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const teams = {
  toronto: {
    id: 'toronto',
    name: 'Toronto Maple Leafs',
    abbreviation: 'TOR',
    logo: 'https://assets.nhle.com/logos/nhl/svg/TOR_light.svg',
    conference: 'Eastern'
  },
  ottawa: {
    id: 'ottawa',
    name: 'Ottawa Senators',
    abbreviation: 'OTT',
    logo: 'https://assets.nhle.com/logos/nhl/svg/OTT_light.svg',
    conference: 'Eastern'
  },
  tampabay: {
    id: 'tampabay',
    name: 'Tampa Bay Lightning',
    abbreviation: 'TBL',
    logo: 'https://assets.nhle.com/logos/nhl/svg/TBL_light.svg',
    conference: 'Eastern'
  },
  florida: {
    id: 'florida',
    name: 'Florida Panthers',
    abbreviation: 'FLA',
    logo: 'https://assets.nhle.com/logos/nhl/svg/FLA_light.svg',
    conference: 'Eastern'
  },
  washington: {
    id: 'washington',
    name: 'Washington Capitals',
    abbreviation: 'WSH',
    logo: 'https://assets.nhle.com/logos/nhl/svg/WSH_light.svg',
    conference: 'Eastern'
  },
  montreal: {
    id: 'montreal',
    name: 'Montreal Canadiens',
    abbreviation: 'MTL',
    logo: 'https://assets.nhle.com/logos/nhl/svg/MTL_light.svg',
    conference: 'Eastern'
  },
  carolina: {
    id: 'carolina',
    name: 'Carolina Hurricanes',
    abbreviation: 'CAR',
    logo: 'https://assets.nhle.com/logos/nhl/svg/CAR_light.svg',
    conference: 'Eastern'
  },
  newjersey: {
    id: 'newjersey',
    name: 'New Jersey Devils',
    abbreviation: 'NJD',
    logo: 'https://assets.nhle.com/logos/nhl/svg/NJD_light.svg',
    conference: 'Eastern'
  },
  winnipeg: {
    id: 'winnipeg',
    name: 'Winnipeg Jets',
    abbreviation: 'WPG',
    logo: 'https://assets.nhle.com/logos/nhl/svg/WPG_light.svg',
    conference: 'Western'
  },
  stlouis: {
    id: 'stlouis',
    name: 'St. Louis Blues',
    abbreviation: 'STL',
    logo: 'https://assets.nhle.com/logos/nhl/svg/STL_light.svg',
    conference: 'Western'
  },
  dallas: {
    id: 'dallas',
    name: 'Dallas Stars',
    abbreviation: 'DAL',
    logo: 'https://assets.nhle.com/logos/nhl/svg/DAL_light.svg',
    conference: 'Western'
  },
  colorado: {
    id: 'colorado',
    name: 'Colorado Avalanche',
    abbreviation: 'COL',
    logo: 'https://assets.nhle.com/logos/nhl/svg/COL_light.svg',
    conference: 'Western'
  },
  vegas: {
    id: 'vegas',
    name: 'Vegas Golden Knights',
    abbreviation: 'VGK',
    logo: 'https://assets.nhle.com/logos/nhl/svg/VGK_light.svg',
    conference: 'Western'
  },
  minnesota: {
    id: 'minnesota',
    name: 'Minnesota Wild',
    abbreviation: 'MIN',
    logo: 'https://assets.nhle.com/logos/nhl/svg/MIN_light.svg',
    conference: 'Western'
  },
  losangeles: {
    id: 'losangeles',
    name: 'Los Angeles Kings',
    abbreviation: 'LAK',
    logo: 'https://assets.nhle.com/logos/nhl/svg/LAK_light.svg',
    conference: 'Western'
  },
  edmonton: {
    id: 'edmonton',
    name: 'Edmonton Oilers',
    abbreviation: 'EDM',
    logo: 'https://assets.nhle.com/logos/nhl/svg/EDM_light.svg',
    conference: 'Western'
  }
};

interface Pick {
  teamId: string;
  games: number;
}

interface Matchup {
  id: string;
  homeTeam: typeof teams.toronto;
  awayTeam: typeof teams.ottawa;
}

export default function PicksPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [matchups, setMatchups] = useState<Matchup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTeams, setSelectedTeams] = useState<{ [key: string]: string }>({});
  const [selectedGames, setSelectedGames] = useState<{ [key: string]: number }>({});
  const [submittedPicks, setSubmittedPicks] = useState<{ [key: string]: Pick }>({});
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
        const formattedMatchups = matchupsData.map(matchup => ({
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
        const picksMap: { [key: string]: Pick } = {};
        picksData.forEach((pick: any) => {
          picksMap[pick.matchup_id] = {
            teamId: pick.selected_team_id,
            games: pick.games,
          };
        });

        setMatchups(formattedMatchups);
        setSubmittedPicks(picksMap);
        setHasInitialPicks(picksData.length > 0);

        // Only initialize selected teams and games if picks exist
        if (picksData.length > 0) {
          const initialSelectedTeams: { [key: string]: string } = {};
          const initialSelectedGames: { [key: string]: number } = {};
          picksData.forEach((pick: any) => {
            initialSelectedTeams[pick.matchup_id] = pick.selected_team_id;
            initialSelectedGames[pick.matchup_id] = pick.games;
          });
          setSelectedTeams(initialSelectedTeams);
          setSelectedGames(initialSelectedGames);
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase, router]);

  const handleTeamSelect = (matchupId: string, teamId: string) => {
    if (hasInitialPicks && !editMode) return;
    setSelectedTeams((prev) => ({
      ...prev,
      [matchupId]: teamId,
    }));
  };

  const handleGamesSelect = (matchupId: string, games: number) => {
    if (hasInitialPicks && !editMode) return;
    setSelectedGames((prev) => ({
      ...prev,
      [matchupId]: games,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/sign-in');
        return;
      }

      // Validate that all matchups have selections
      const unselectedMatchups = matchups.filter(
        (matchup) => !selectedTeams[matchup.id] || !selectedGames[matchup.id]
      );

      if (unselectedMatchups.length > 0) {
        setError('Please make selections for all matchups');
        return;
      }

      if (editMode) {
        // Update existing picks
        for (const matchup of matchups) {
          const { error } = await supabase
            .from('picks')
            .update({
              selected_team_id: selectedTeams[matchup.id],
              games: selectedGames[matchup.id],
            })
            .eq('matchup_id', matchup.id)
            .eq('user_id', session.user.id);

          if (error) throw error;
        }
      } else {
        // Insert new picks
        const picks = matchups.map((matchup) => ({
          user_id: session.user.id,
          matchup_id: matchup.id,
          selected_team_id: selectedTeams[matchup.id],
          games: selectedGames[matchup.id],
        }));

        const { error } = await supabase.from('picks').insert(picks);
        if (error) throw error;
      }

      // After successful submission, set hasInitialPicks to true
      setHasInitialPicks(true);
      setEditMode(false);
      
      // Redirect to dashboard after successful submission
      router.push('/dashboard');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const hasSubmittedAllPicks = matchups.every((matchup) => submittedPicks[matchup.id]);

  return (
    <div className="space-y-8 p-8">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">Make Your Picks</h1>
        <p className="mt-2 text-sm text-gray-500">
          {!hasInitialPicks 
            ? 'Select the winning team and number of games for each playoff matchup.' 
            : editMode 
              ? 'Edit your picks for the playoff matchups.'
              : 'Your picks have been submitted. Click Edit Picks to make changes.'}
        </p>
      </div>

      <div className="space-y-8">
        {/* Eastern Conference */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Eastern Conference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchups
              .filter((matchup) => matchup.homeTeam.conference === 'Eastern')
              .map((matchup) => {
                const isLocked = !editMode && submittedPicks[matchup.id];
                const hasSelectedTeam = selectedTeams[matchup.id];
                return (
                  <div 
                    key={matchup.id} 
                    className={`bg-white rounded-lg shadow p-6 ${isLocked ? 'opacity-75' : ''}`}
                  >
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => handleTeamSelect(matchup.id, matchup.homeTeam.id)}
                          className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                            selectedTeams[matchup.id] === matchup.homeTeam.id
                              ? 'bg-blue-100'
                              : 'hover:bg-gray-100'
                          } ${isLocked ? 'cursor-default' : 'cursor-pointer'}`}
                          disabled={isLocked}
                        >
                          <img
                            src={matchup.homeTeam.logo}
                            alt={matchup.homeTeam.name}
                            className="h-16 w-16 object-contain"
                          />
                          <span className="mt-2 font-medium text-sm">{matchup.homeTeam.name}</span>
                        </button>

                        <span className="text-xl font-semibold">vs</span>

                        <button
                          onClick={() => handleTeamSelect(matchup.id, matchup.awayTeam.id)}
                          className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                            selectedTeams[matchup.id] === matchup.awayTeam.id
                              ? 'bg-blue-100'
                              : 'hover:bg-gray-100'
                          } ${isLocked ? 'cursor-default' : 'cursor-pointer'}`}
                          disabled={isLocked}
                        >
                          <img
                            src={matchup.awayTeam.logo}
                            alt={matchup.awayTeam.name}
                            className="h-16 w-16 object-contain"
                          />
                          <span className="mt-2 font-medium text-sm">{matchup.awayTeam.name}</span>
                        </button>
                      </div>

                      {hasSelectedTeam && (
                        <div className="flex justify-center items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Games:</span>
                          <div className="flex space-x-2">
                            {[4, 5, 6, 7].map((num) => (
                              <button
                                key={num}
                                onClick={() => handleGamesSelect(matchup.id, num)}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                                  ${selectedGames[matchup.id] === num 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLocked}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Western Conference */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Western Conference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {matchups
              .filter((matchup) => matchup.homeTeam.conference === 'Western')
              .map((matchup) => {
                const isLocked = !editMode && submittedPicks[matchup.id];
                const hasSelectedTeam = selectedTeams[matchup.id];
                return (
                  <div 
                    key={matchup.id} 
                    className={`bg-white rounded-lg shadow p-6 ${isLocked ? 'opacity-75' : ''}`}
                  >
                    <div className="flex flex-col space-y-4">
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => handleTeamSelect(matchup.id, matchup.homeTeam.id)}
                          className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                            selectedTeams[matchup.id] === matchup.homeTeam.id
                              ? 'bg-blue-100'
                              : 'hover:bg-gray-100'
                          } ${isLocked ? 'cursor-default' : 'cursor-pointer'}`}
                          disabled={isLocked}
                        >
                          <img
                            src={matchup.homeTeam.logo}
                            alt={matchup.homeTeam.name}
                            className="h-16 w-16 object-contain"
                          />
                          <span className="mt-2 font-medium text-sm">{matchup.homeTeam.name}</span>
                        </button>

                        <span className="text-xl font-semibold">vs</span>

                        <button
                          onClick={() => handleTeamSelect(matchup.id, matchup.awayTeam.id)}
                          className={`flex flex-col items-center p-4 rounded-lg transition-colors ${
                            selectedTeams[matchup.id] === matchup.awayTeam.id
                              ? 'bg-blue-100'
                              : 'hover:bg-gray-100'
                          } ${isLocked ? 'cursor-default' : 'cursor-pointer'}`}
                          disabled={isLocked}
                        >
                          <img
                            src={matchup.awayTeam.logo}
                            alt={matchup.awayTeam.name}
                            className="h-16 w-16 object-contain"
                          />
                          <span className="mt-2 font-medium text-sm">{matchup.awayTeam.name}</span>
                        </button>
                      </div>

                      {hasSelectedTeam && (
                        <div className="flex justify-center items-center space-x-2">
                          <span className="text-sm font-medium text-gray-700">Games:</span>
                          <div className="flex space-x-2">
                            {[4, 5, 6, 7].map((num) => (
                              <button
                                key={num}
                                onClick={() => handleGamesSelect(matchup.id, num)}
                                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors
                                  ${selectedGames[matchup.id] === num 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLocked}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        {hasSubmittedAllPicks && !editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Edit Picks
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={loading}
          >
            {editMode ? 'Save Changes' : 'Submit Picks'}
          </button>
        )}
      </div>
    </div>
  );
} 