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

const TeamLogo = ({ src, alt, size }: { src: string; alt: string; size: number }) => {
  return (
    <div className={`relative w-${size} h-${size} flex items-center justify-center`}>
      <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse" />
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        className="relative object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/nhl-shield.svg'; // Fallback to NHL shield if team logo fails
        }}
      />
    </div>
  );
};

const MatchupCard = ({ matchup, isSmall = false }: { matchup?: Matchup; isSmall?: boolean }) => {
  if (!matchup) {
    return (
      <div className={`bg-white rounded-lg overflow-hidden border border-gray-200 ${
        isSmall ? 'h-[80px] w-[240px]' : 'h-[100px] w-[280px]'
      }`} />
    );
  }

  const logoSize = isSmall ? 24 : 32;

  return (
    <div className={`bg-white rounded-lg overflow-hidden border border-gray-200 ${
      isSmall ? 'w-[240px]' : 'w-[280px]'
    }`}>
      <div className="p-4 space-y-4">
        {/* Home Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src={matchup.homeTeam.logo}
                alt={matchup.homeTeam.name}
                width={logoSize}
                height={logoSize}
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm font-medium">{matchup.homeTeam.seed}</span>
              <span className="text-gray-900 font-semibold">{matchup.homeTeam.abbreviation}</span>
            </div>
          </div>
          <span className="text-gray-900 font-bold tabular-nums">{matchup.homeTeam.score || 0}</span>
        </div>
        {/* Away Team */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8">
              <Image
                src={matchup.awayTeam.logo}
                alt={matchup.awayTeam.name}
                width={logoSize}
                height={logoSize}
                className="object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm font-medium">{matchup.awayTeam.seed}</span>
              <span className="text-gray-900 font-semibold">{matchup.awayTeam.abbreviation}</span>
            </div>
          </div>
          <span className="text-gray-900 font-bold tabular-nums">{matchup.awayTeam.score || 0}</span>
        </div>
      </div>
    </div>
  );
};

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

  const round1Eastern = matchups.slice(0, 4);
  const round1Western = matchups.slice(4, 8);

  return (
    <div className="min-h-screen bg-white px-4 py-8 flex justify-center items-start">
      <div className="max-w-[1800px] w-full">
        <div className="mb-16 text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="https://www.nhl.com/site-core/images/team/logo/NHL_dark.svg"
              alt="NHL Logo"
              width={100}
              height={40}
              className="object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Stanley Cup Playoffs 2025</h1>
          <p className="text-gray-500">Playoff Bracket</p>
        </div>

        <div className="grid grid-cols-[minmax(600px,_1fr)_auto_minmax(600px,_1fr)] gap-16 justify-center">
          {/* Eastern Conference */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">Eastern Conference</h2>
            <div className="relative">
              {/* Round 1 */}
              <div className="space-y-32">
                {round1Eastern.map((matchup, index) => (
                  <div key={matchup.id} className="relative">
                    <MatchupCard matchup={matchup} />
                    {index % 2 === 0 ? (
                      <div className="absolute left-[280px] top-[50px] w-[160px] h-[100px] border-t-2 border-r-2 border-gray-200" />
                    ) : (
                      <div className="absolute left-[280px] top-[-50px] w-[160px] h-[100px] border-b-2 border-r-2 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>

              {/* Round 2 */}
              <div className="absolute left-[440px] top-[75px] space-y-[320px]">
                {[0, 1].map((index) => (
                  <div key={index} className="relative">
                    <MatchupCard isSmall />
                    {index === 0 ? (
                      <div className="absolute left-[240px] top-[40px] w-[160px] h-[160px] border-t-2 border-r-2 border-gray-200" />
                    ) : (
                      <div className="absolute left-[240px] top-[-120px] w-[160px] h-[160px] border-b-2 border-r-2 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>

              {/* Conference Final */}
              <div className="absolute left-[840px] top-[235px]">
                <MatchupCard isSmall />
              </div>
            </div>
          </div>

          {/* Stanley Cup Final */}
          <div className="flex flex-col items-center justify-center mt-[320px]">
            <Image
              src="https://assets.nhle.com/logos/nhl/svg/stanley_cup_playoffs.svg"
              alt="Stanley Cup Playoffs"
              width={160}
              height={160}
              className="mb-8"
              priority
            />
            <MatchupCard isSmall />
          </div>

          {/* Western Conference */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">Western Conference</h2>
            <div className="relative">
              {/* Round 1 */}
              <div className="flex flex-col items-end space-y-32">
                {round1Western.map((matchup, index) => (
                  <div key={matchup.id} className="relative">
                    <div className="flex justify-end">
                      <MatchupCard matchup={matchup} />
                    </div>
                    {index % 2 === 0 ? (
                      <div className="absolute right-[280px] top-[50px] w-[160px] h-[100px] border-t-2 border-l-2 border-gray-200" />
                    ) : (
                      <div className="absolute right-[280px] top-[-50px] w-[160px] h-[100px] border-b-2 border-l-2 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>

              {/* Round 2 */}
              <div className="absolute right-[440px] top-[75px] space-y-[320px]">
                {[0, 1].map((index) => (
                  <div key={index} className="relative flex justify-end">
                    <MatchupCard isSmall />
                    {index === 0 ? (
                      <div className="absolute right-[240px] top-[40px] w-[160px] h-[160px] border-t-2 border-l-2 border-gray-200" />
                    ) : (
                      <div className="absolute right-[240px] top-[-120px] w-[160px] h-[160px] border-b-2 border-l-2 border-gray-200" />
                    )}
                  </div>
                ))}
              </div>

              {/* Conference Final */}
              <div className="absolute right-[840px] top-[235px] flex justify-end">
                <MatchupCard isSmall />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 