'use client';

import { useState } from 'react';
import MatchupCard from '@/components/MatchupCard';
import { useRouter } from 'next/navigation';

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

const playoffMatchups = [
  // Eastern Conference
  { homeTeam: teams.toronto, awayTeam: teams.ottawa },
  { homeTeam: teams.tampabay, awayTeam: teams.florida },
  { homeTeam: teams.washington, awayTeam: teams.montreal },
  { homeTeam: teams.carolina, awayTeam: teams.newjersey },
  // Western Conference
  { homeTeam: teams.winnipeg, awayTeam: teams.stlouis },
  { homeTeam: teams.dallas, awayTeam: teams.colorado },
  { homeTeam: teams.vegas, awayTeam: teams.minnesota },
  { homeTeam: teams.losangeles, awayTeam: teams.edmonton },
];

interface Pick {
  teamId: string;
  games: number;
}

export default function PicksPage() {
  const router = useRouter();
  const [picks, setPicks] = useState<Record<number, Pick>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePickTeam = (matchupIndex: number, teamId: string) => {
    setPicks((prev) => ({
      ...prev,
      [matchupIndex]: {
        teamId,
        games: prev[matchupIndex]?.games || 0,
      },
    }));
  };

  const handlePickGames = (matchupIndex: number, games: number) => {
    setPicks((prev) => ({
      ...prev,
      [matchupIndex]: {
        teamId: prev[matchupIndex]?.teamId || '',
        games,
      },
    }));
  };

  const handleSubmit = async () => {
    // Validate that all picks have both team and games selected
    const allMatchups = [...easternMatchups, ...westernMatchups];
    const isValid = allMatchups.every((_, index) => {
      const pick = picks[index];
      return pick && pick.teamId && pick.games > 0;
    });

    if (!isValid) {
      alert('Please make all picks and select number of games for each series.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/picks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ picks }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit picks');
      }

      // Redirect to dashboard after successful submission
      router.push('/dashboard');
    } catch (error) {
      console.error('Error submitting picks:', error);
      alert('Failed to submit picks. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const easternMatchups = playoffMatchups.filter(
    (matchup) => matchup.homeTeam.conference === 'Eastern'
  );

  const westernMatchups = playoffMatchups.filter(
    (matchup) => matchup.homeTeam.conference === 'Western'
  );

  return (
    <div className="space-y-8">
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold leading-tight text-gray-900">Make Your Picks</h1>
        <p className="mt-2 text-sm text-gray-500">
          Select the team you think will win each series and in how many games.
        </p>
      </div>

      <div className="space-y-8">
        {/* Eastern Conference */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Eastern Conference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {easternMatchups.map((matchup, index) => (
              <MatchupCard
                key={index}
                homeTeam={matchup.homeTeam}
                awayTeam={matchup.awayTeam}
                onPickTeam={(teamId) => handlePickTeam(index, teamId)}
                onPickGames={(games) => handlePickGames(index, games)}
                selectedTeamId={picks[index]?.teamId}
                selectedGames={picks[index]?.games}
              />
            ))}
          </div>
        </div>

        {/* Western Conference */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Western Conference</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {westernMatchups.map((matchup, index) => (
              <MatchupCard
                key={index + easternMatchups.length}
                homeTeam={matchup.homeTeam}
                awayTeam={matchup.awayTeam}
                onPickTeam={(teamId) => handlePickTeam(index + easternMatchups.length, teamId)}
                onPickGames={(games) => handlePickGames(index + easternMatchups.length, games)}
                selectedTeamId={picks[index + easternMatchups.length]?.teamId}
                selectedGames={picks[index + easternMatchups.length]?.games}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`px-6 py-3 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white'
          }`}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </div>
          ) : (
            'Submit Picks'
          )}
        </button>
      </div>
    </div>
  );
} 