'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import MatchupDetails from '@/components/MatchupDetails';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
  conference: 'Eastern' | 'Western';
}

interface Pick {
  userName: string;
  selectedTeam: Team;
  games: number;
}

interface MatchupWithPicks {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  round: number;
  picks: Pick[];
}

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

export default function DashboardPage() {
  const router = useRouter();
  const [matchups, setMatchups] = useState<MatchupWithPicks[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMatchup, setSelectedMatchup] = useState<MatchupWithPicks | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        router.push('/sign-in');
        return null;
      }
      return user;
    };

    const fetchMatchupsAndPicks = async () => {
      try {
        const user = await checkUser();
        if (!user) return;

        // First, fetch matchups
        const { data: matchupsData, error: matchupsError } = await supabase
          .from('matchups')
          .select('*')
          .order('round');

        if (matchupsError) throw matchupsError;

        // Then, fetch picks for each matchup
        const picksPromises = matchupsData.map(matchup =>
          supabase
            .from('picks')
            .select(`
              id,
              user_id,
              selected_team_id,
              games,
              users (
                id,
                email
              )
            `)
            .eq('matchup_id', matchup.id)
        );

        const picksResults = await Promise.all(picksPromises);
        
        // Combine matchups with their picks
        const formattedMatchups: MatchupWithPicks[] = matchupsData.map((matchup, index) => {
          const picksData = picksResults[index].data || [];
          return {
            id: matchup.id,
            homeTeam: teams[matchup.home_team_id],
            awayTeam: teams[matchup.away_team_id],
            round: matchup.round,
            picks: picksData.map((pick) => ({
              userName: pick.users?.email?.split('@')[0] || 'Unknown',
              selectedTeam: teams[pick.selected_team_id],
              games: pick.games,
            })),
          };
        });

        setMatchups(formattedMatchups);
      } catch (err) {
        console.error('Error fetching matchups and picks:', err);
        setError('Failed to load matchups and picks');
      } finally {
        setLoading(false);
      }
    };

    fetchMatchupsAndPicks();
  }, [supabase, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
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

  const easternMatchups = matchups.filter(
    (matchup) => matchup.homeTeam.conference === 'Eastern'
  );

  const westernMatchups = matchups.filter(
    (matchup) => matchup.homeTeam.conference === 'Western'
  );

  return (
    <div className="space-y-8 p-8">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">Playoff Picks Dashboard</h1>
        <p className="mt-2 text-sm text-gray-500">
          View all submitted picks for the playoff matchups. Click on a matchup to see detailed picks.
        </p>
      </div>

      <div className="space-y-8">
        {/* Eastern Conference */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Eastern Conference</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {easternMatchups.map((matchup) => (
              <div 
                key={matchup.id} 
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedMatchup(matchup)}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <img src={matchup.homeTeam.logo} alt={matchup.homeTeam.name} className="h-12 w-12" />
                    <span className="text-xl font-semibold">vs</span>
                    <img src={matchup.awayTeam.logo} alt={matchup.awayTeam.name} className="h-12 w-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  {matchup.picks.length > 0 ? (
                    <p className="text-gray-600 text-center">{matchup.picks.length} pick{matchup.picks.length !== 1 ? 's' : ''} submitted</p>
                  ) : (
                    <p className="text-gray-500 text-center py-2">No picks submitted yet</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Western Conference */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Western Conference</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {westernMatchups.map((matchup) => (
              <div 
                key={matchup.id} 
                className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedMatchup(matchup)}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <img src={matchup.homeTeam.logo} alt={matchup.homeTeam.name} className="h-12 w-12" />
                    <span className="text-xl font-semibold">vs</span>
                    <img src={matchup.awayTeam.logo} alt={matchup.awayTeam.name} className="h-12 w-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  {matchup.picks.length > 0 ? (
                    <p className="text-gray-600 text-center">{matchup.picks.length} pick{matchup.picks.length !== 1 ? 's' : ''} submitted</p>
                  ) : (
                    <p className="text-gray-500 text-center py-2">No picks submitted yet</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedMatchup && (
        <MatchupDetails
          isOpen={!!selectedMatchup}
          onClose={() => setSelectedMatchup(null)}
          homeTeam={selectedMatchup.homeTeam}
          awayTeam={selectedMatchup.awayTeam}
          picks={selectedMatchup.picks}
        />
      )}
    </div>
  );
} 