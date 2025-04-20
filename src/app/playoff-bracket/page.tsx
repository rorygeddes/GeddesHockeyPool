'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
  seed?: string;
  score?: number;
}

interface Matchup {
  id: string;
  round: number;
  homeTeam: Team;
  awayTeam: Team;
}

const teams = {
  toronto: {
    id: 'toronto',
    name: 'Toronto Maple Leafs',
    abbreviation: 'TOR',
    logo: 'https://assets.nhle.com/logos/nhl/svg/TOR_light.svg',
    seed: 'D1'
  },
  ottawa: {
    id: 'ottawa',
    name: 'Ottawa Senators',
    abbreviation: 'OTT',
    logo: 'https://assets.nhle.com/logos/nhl/svg/OTT_light.svg',
    seed: 'WC1'
  },
  tampabay: {
    id: 'tampabay',
    name: 'Tampa Bay Lightning',
    abbreviation: 'TBL',
    logo: 'https://assets.nhle.com/logos/nhl/svg/TBL_light.svg',
    seed: 'D2'
  },
  florida: {
    id: 'florida',
    name: 'Florida Panthers',
    abbreviation: 'FLA',
    logo: 'https://assets.nhle.com/logos/nhl/svg/FLA_light.svg',
    seed: 'D3'
  },
  washington: {
    id: 'washington',
    name: 'Washington Capitals',
    abbreviation: 'WSH',
    logo: 'https://assets.nhle.com/logos/nhl/svg/WSH_light.svg',
    seed: 'D1'
  },
  montreal: {
    id: 'montreal',
    name: 'Montreal Canadiens',
    abbreviation: 'MTL',
    logo: 'https://assets.nhle.com/logos/nhl/svg/MTL_light.svg',
    seed: 'WC2'
  },
  carolina: {
    id: 'carolina',
    name: 'Carolina Hurricanes',
    abbreviation: 'CAR',
    logo: 'https://assets.nhle.com/logos/nhl/svg/CAR_light.svg',
    seed: 'D2'
  },
  newjersey: {
    id: 'newjersey',
    name: 'New Jersey Devils',
    abbreviation: 'NJD',
    logo: 'https://assets.nhle.com/logos/nhl/svg/NJD_light.svg',
    seed: 'D3'
  },
  winnipeg: {
    id: 'winnipeg',
    name: 'Winnipeg Jets',
    abbreviation: 'WPG',
    logo: 'https://assets.nhle.com/logos/nhl/svg/WPG_light.svg',
    seed: 'D1'
  },
  stlouis: {
    id: 'stlouis',
    name: 'St. Louis Blues',
    abbreviation: 'STL',
    logo: 'https://assets.nhle.com/logos/nhl/svg/STL_light.svg',
    seed: 'WC2'
  },
  dallas: {
    id: 'dallas',
    name: 'Dallas Stars',
    abbreviation: 'DAL',
    logo: 'https://assets.nhle.com/logos/nhl/svg/DAL_light.svg',
    seed: 'D2'
  },
  colorado: {
    id: 'colorado',
    name: 'Colorado Avalanche',
    abbreviation: 'COL',
    logo: 'https://assets.nhle.com/logos/nhl/svg/COL_light.svg',
    seed: 'D3'
  },
  vegas: {
    id: 'vegas',
    name: 'Vegas Golden Knights',
    abbreviation: 'VGK',
    logo: 'https://assets.nhle.com/logos/nhl/svg/VGK_light.svg',
    seed: 'D1'
  },
  minnesota: {
    id: 'minnesota',
    name: 'Minnesota Wild',
    abbreviation: 'MIN',
    logo: 'https://assets.nhle.com/logos/nhl/svg/MIN_light.svg',
    seed: 'WC1'
  },
  losangeles: {
    id: 'losangeles',
    name: 'Los Angeles Kings',
    abbreviation: 'LAK',
    logo: 'https://assets.nhle.com/logos/nhl/svg/LAK_light.svg',
    seed: 'D2'
  },
  edmonton: {
    id: 'edmonton',
    name: 'Edmonton Oilers',
    abbreviation: 'EDM',
    logo: 'https://assets.nhle.com/logos/nhl/svg/EDM_light.svg',
    seed: 'D3'
  }
};

const MatchupCard = ({ matchup, round }: { matchup: Matchup; round: number }) => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-700 w-[280px]">
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-3 flex-1">
            <img src={matchup.homeTeam.logo} alt={matchup.homeTeam.name} className="w-8 h-8" />
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">{matchup.homeTeam.seed}</span>
              <span className="text-white">{matchup.homeTeam.abbreviation}</span>
            </div>
          </div>
          <span className="text-white text-lg font-bold">{matchup.homeTeam.score || 0}</span>
        </div>
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-3 flex-1">
            <img src={matchup.awayTeam.logo} alt={matchup.awayTeam.name} className="w-8 h-8" />
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">{matchup.awayTeam.seed}</span>
              <span className="text-white">{matchup.awayTeam.abbreviation}</span>
            </div>
          </div>
          <span className="text-white text-lg font-bold">{matchup.awayTeam.score || 0}</span>
        </div>
      </div>
    </div>
  );
};

const BracketConnector = () => (
  <div className="flex items-center h-full">
    <div className="w-8 h-full border-r-2 border-gray-600"></div>
  </div>
);

const EmptyMatchup = () => (
  <div className="bg-gray-800/50 rounded-lg overflow-hidden shadow-lg border border-gray-700/50 w-[280px] h-[100px]"></div>
);

export default function PlayoffBracket() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [matchups, setMatchups] = useState<Matchup[]>([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const mockMatchups = [
          {
            id: '1',
            round: 1,
            homeTeam: teams.toronto,
            awayTeam: teams.ottawa,
          },
          {
            id: '2',
            round: 1,
            homeTeam: teams.tampabay,
            awayTeam: teams.florida,
          },
          {
            id: '3',
            round: 1,
            homeTeam: teams.washington,
            awayTeam: teams.montreal,
          },
          {
            id: '4',
            round: 1,
            homeTeam: teams.carolina,
            awayTeam: teams.newjersey,
          },
          {
            id: '5',
            round: 1,
            homeTeam: teams.winnipeg,
            awayTeam: teams.stlouis,
          },
          {
            id: '6',
            round: 1,
            homeTeam: teams.dallas,
            awayTeam: teams.colorado,
          },
          {
            id: '7',
            round: 1,
            homeTeam: teams.vegas,
            awayTeam: teams.minnesota,
          },
          {
            id: '8',
            round: 1,
            homeTeam: teams.losangeles,
            awayTeam: teams.edmonton,
          },
        ];

        setMatchups(mockMatchups);
      } catch (err) {
        setError('Failed to fetch playoff data');
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const easternMatchups = matchups.filter(
    (matchup) => matchup.homeTeam.id === 'toronto' || matchup.homeTeam.id === 'tampabay' || 
                 matchup.homeTeam.id === 'washington' || matchup.homeTeam.id === 'carolina'
  );

  const westernMatchups = matchups.filter(
    (matchup) => matchup.homeTeam.id === 'winnipeg' || matchup.homeTeam.id === 'dallas' || 
                 matchup.homeTeam.id === 'vegas' || matchup.homeTeam.id === 'losangeles'
  );

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Stanley Cup Playoffs 2025</h1>
          <p className="text-gray-400">First Round Matchups</p>
        </div>

        <div className="flex justify-between">
          {/* Eastern Conference */}
          <div className="w-1/2 pr-4">
            <h2 className="text-2xl font-bold text-white mb-8">Eastern Conference</h2>
            <div className="relative">
              {/* Round 1 */}
              <div className="space-y-16">
                {easternMatchups.map((matchup) => (
                  <MatchupCard key={matchup.id} matchup={matchup} round={1} />
                ))}
              </div>
              
              {/* Round 2 */}
              <div className="absolute top-[12%] left-[300px] space-y-[180px]">
                <EmptyMatchup />
                <EmptyMatchup />
              </div>

              {/* Conference Final */}
              <div className="absolute top-[33%] left-[600px]">
                <EmptyMatchup />
              </div>

              {/* Connecting Lines */}
              <div className="absolute top-[60px] left-[280px] h-[100px] w-[20px] border-t-2 border-r-2 border-gray-600"></div>
              <div className="absolute top-[160px] left-[280px] h-[100px] w-[20px] border-b-2 border-r-2 border-gray-600"></div>
              <div className="absolute top-[300px] left-[280px] h-[100px] w-[20px] border-t-2 border-r-2 border-gray-600"></div>
              <div className="absolute top-[400px] left-[280px] h-[100px] w-[20px] border-b-2 border-r-2 border-gray-600"></div>
              
              <div className="absolute top-[160px] left-[580px] h-[180px] w-[20px] border-t-2 border-r-2 border-gray-600"></div>
              <div className="absolute top-[340px] left-[580px] h-[180px] w-[20px] border-b-2 border-r-2 border-gray-600"></div>
            </div>
          </div>

          {/* Stanley Cup Final */}
          <div className="flex flex-col items-center justify-center -mx-4">
            <Image
              src="https://assets.nhle.com/logos/nhl/svg/stanley_cup_playoffs.svg"
              alt="Stanley Cup Playoffs"
              width={200}
              height={200}
              className="opacity-50 mb-8"
            />
            <EmptyMatchup />
          </div>

          {/* Western Conference */}
          <div className="w-1/2 pl-4">
            <h2 className="text-2xl font-bold text-white mb-8">Western Conference</h2>
            <div className="relative">
              {/* Round 1 */}
              <div className="space-y-16">
                {westernMatchups.map((matchup) => (
                  <MatchupCard key={matchup.id} matchup={matchup} round={1} />
                ))}
              </div>

              {/* Round 2 */}
              <div className="absolute top-[12%] right-[300px] space-y-[180px]">
                <EmptyMatchup />
                <EmptyMatchup />
              </div>

              {/* Conference Final */}
              <div className="absolute top-[33%] right-[600px]">
                <EmptyMatchup />
              </div>

              {/* Connecting Lines */}
              <div className="absolute top-[60px] right-[280px] h-[100px] w-[20px] border-t-2 border-l-2 border-gray-600"></div>
              <div className="absolute top-[160px] right-[280px] h-[100px] w-[20px] border-b-2 border-l-2 border-gray-600"></div>
              <div className="absolute top-[300px] right-[280px] h-[100px] w-[20px] border-t-2 border-l-2 border-gray-600"></div>
              <div className="absolute top-[400px] right-[280px] h-[100px] w-[20px] border-b-2 border-l-2 border-gray-600"></div>
              
              <div className="absolute top-[160px] right-[580px] h-[180px] w-[20px] border-t-2 border-l-2 border-gray-600"></div>
              <div className="absolute top-[340px] right-[580px] h-[180px] w-[20px] border-b-2 border-l-2 border-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 