'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { teams } from '@/lib/teams';

interface Pick {
  team: string;
  games: number;
  matchupId: string;
}

interface PlayerData {
  name: string;
  currentRank?: number;
  picks: {
    round1: Pick[];
    round2: Pick[];
    round3: Pick[];
    round4: Pick[];
  };
  pastStats?: {
    year: string;
    position: string;
    score: number;
    perfectPicks?: number;
    cupWinner?: string;
  }[];
  isNewPlayer?: boolean;
}

interface Matchup {
  id: string;
  homeTeam: string;
  awayTeam: string;
  conference: 'Eastern' | 'Western';
}

const matchups: Matchup[] = [
  { id: 'TOR-OTT', homeTeam: 'Toronto Maple Leafs', awayTeam: 'Ottawa Senators', conference: 'Eastern' },
  { id: 'TBL-FLA', homeTeam: 'Tampa Bay', awayTeam: 'Florida Panthers', conference: 'Eastern' },
  { id: 'WSH-MTL', homeTeam: 'Washington Capitals', awayTeam: 'Montreal Canadiens', conference: 'Eastern' },
  { id: 'CAR-NJD', homeTeam: 'Carolina Hurricanes', awayTeam: 'New Jersey Devils', conference: 'Eastern' },
  { id: 'WPG-STL', homeTeam: 'Winnipeg Jets', awayTeam: 'St. Louis Blues', conference: 'Western' },
  { id: 'DAL-COL', homeTeam: 'Dallas Stars', awayTeam: 'Colorado Avalanche', conference: 'Western' },
  { id: 'VGS-MIN', homeTeam: 'Vegas', awayTeam: 'Minnesota Wild', conference: 'Western' },
  { id: 'LA-EDM', homeTeam: 'Los Angeles Kings', awayTeam: 'Edmonton Oilers', conference: 'Western' }
];

const players: PlayerData[] = [
  {
    name: "GMA",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'Tor', games: 7, matchupId: 'TOR-OTT' },
        { team: 'Fla', games: 6, matchupId: 'TBL-FLA' },
        { team: 'Wsh', games: 7, matchupId: 'WSH-MTL' },
        { team: 'Car', games: 6, matchupId: 'CAR-NJD' },
        { team: 'Wpg', games: 5, matchupId: 'WPG-STL' },
        { team: 'Dal', games: 7, matchupId: 'DAL-COL' },
        { team: 'Vgk', games: 7, matchupId: 'VGS-MIN' },
        { team: 'Edm', games: 7, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2024", position: "1st", score: 18, perfectPicks: 6 }
    ]
  },
  {
    name: "Fiona",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'Tor', games: 7, matchupId: 'TOR-OTT' },
        { team: 'Fla', games: 6, matchupId: 'TBL-FLA' },
        { team: 'Mtl', games: 7, matchupId: 'WSH-MTL' },
        { team: 'Car', games: 6, matchupId: 'CAR-NJD' },
        { team: 'Wpg', games: 5, matchupId: 'WPG-STL' },
        { team: 'Col', games: 6, matchupId: 'DAL-COL' },
        { team: 'Vgk', games: 6, matchupId: 'VGS-MIN' },
        { team: 'Edm', games: 7, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2023", position: "3rd", score: 13, cupWinner: "VGK" }
    ]
  },
  {
    name: "Claire",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'Ott', games: 5, matchupId: 'TOR-OTT' },
        { team: 'Fla', games: 6, matchupId: 'TBL-FLA' },
        { team: 'Wsh', games: 5, matchupId: 'WSH-MTL' },
        { team: 'Car', games: 4, matchupId: 'CAR-NJD' },
        { team: 'Wpg', games: 5, matchupId: 'WPG-STL' },
        { team: 'Col', games: 6, matchupId: 'DAL-COL' },
        { team: 'Vgk', games: 6, matchupId: 'VGS-MIN' },
        { team: 'Edm', games: 6, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    isNewPlayer: true
  },
  {
    name: "Noah",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'TOR', games: 6, matchupId: 'TOR-OTT' },
        { team: 'FLA', games: 6, matchupId: 'TBL-FLA' },
        { team: 'WSH', games: 6, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 5, matchupId: 'CAR-NJD' },
        { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
        { team: 'COL', games: 5, matchupId: 'DAL-COL' },
        { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
        { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2024", position: "2nd", score: 17, perfectPicks: 6 },
      { year: "2019", position: "3rd", score: 8 }
    ]
  },
  {
    name: "Cooper",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'TOR', games: 6, matchupId: 'TOR-OTT' },
        { team: 'TBL', games: 7, matchupId: 'TBL-FLA' },
        { team: 'WSH', games: 6, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
        { team: 'WPG', games: 6, matchupId: 'WPG-STL' },
        { team: 'COL', games: 6, matchupId: 'DAL-COL' },
        { team: 'VGK', games: 5, matchupId: 'VGS-MIN' },
        { team: 'LAK', games: 6, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2018", position: "2nd", score: 10 },
      { year: "2017", position: "Last", score: 11 }
    ]
  },
  {
    name: "Rayna",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'TOR', games: 6, matchupId: 'TOR-OTT' },
        { team: 'TBL', games: 7, matchupId: 'TBL-FLA' },
        { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 5, matchupId: 'CAR-NJD' },
        { team: 'STL', games: 7, matchupId: 'WPG-STL' },
        { team: 'COL', games: 7, matchupId: 'DAL-COL' },
        { team: 'MIN', games: 6, matchupId: 'VGS-MIN' },
        { team: 'EDM', games: 6, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    isNewPlayer: true
  },
  {
    name: "Rory",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'OTT', games: 7, matchupId: 'TOR-OTT' },
        { team: 'TBL', games: 7, matchupId: 'TBL-FLA' },
        { team: 'WSH', games: 6, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 5, matchupId: 'CAR-NJD' },
        { team: 'WPG', games: 7, matchupId: 'WPG-STL' },
        { team: 'COL', games: 7, matchupId: 'DAL-COL' },
        { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
        { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2017", position: "2nd", score: 15 }
    ]
  },
  {
    name: "Grady",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'OTT', games: 7, matchupId: 'TOR-OTT' },
        { team: 'FLA', games: 7, matchupId: 'TBL-FLA' },
        { team: 'WSH', games: 6, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
        { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
        { team: 'COL', games: 6, matchupId: 'DAL-COL' },
        { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
        { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2024", position: "3rd", score: 17, perfectPicks: 5 }
    ]
  },
  {
    name: "Crosby",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'OTT', games: 6, matchupId: 'TOR-OTT' },
        { team: 'TBL', games: 6, matchupId: 'TBL-FLA' },
        { team: 'MTL', games: 6, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 7, matchupId: 'CAR-NJD' },
        { team: 'WPG', games: 6, matchupId: 'WPG-STL' },
        { team: 'DAL', games: 7, matchupId: 'DAL-COL' },
        { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
        { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2018", position: "Last", score: 6 }
    ]
  },
  {
    name: "Bow",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'OTT', games: 6, matchupId: 'TOR-OTT' },
        { team: 'TBL', games: 6, matchupId: 'TBL-FLA' },
        { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 5, matchupId: 'CAR-NJD' },
        { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
        { team: 'COL', games: 6, matchupId: 'DAL-COL' },
        { team: 'VGK', games: 5, matchupId: 'VGS-MIN' },
        { team: 'LAK', games: 6, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2023", position: "1st", score: 14, perfectPicks: 5 },
      { year: "2019", position: "2nd", score: 9 },
      { year: "2017", position: "1st", score: 16 }
    ]
  },
  {
    name: "Jill",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'OTT', games: 7, matchupId: 'TOR-OTT' },
        { team: 'FLA', games: 7, matchupId: 'TBL-FLA' },
        { team: 'MTL', games: 6, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
        { team: 'WPG', games: 4, matchupId: 'WPG-STL' },
        { team: 'COL', games: 6, matchupId: 'DAL-COL' },
        { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
        { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2018", position: "3rd", score: 9 }
    ]
  },
  {
    name: "Jordan",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'OTT', games: 7, matchupId: 'TOR-OTT' },
        { team: 'TBL', games: 7, matchupId: 'TBL-FLA' },
        { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 4, matchupId: 'CAR-NJD' },
        { team: 'WPG', games: 6, matchupId: 'WPG-STL' },
        { team: 'COL', games: 6, matchupId: 'DAL-COL' },
        { team: 'VGK', games: 7, matchupId: 'VGS-MIN' },
        { team: 'LAK', games: 7, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2018", position: "3rd", score: 9 }
    ]
  },
  {
    name: "Grant",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'TOR', games: 6, matchupId: 'TOR-OTT' },
        { team: 'FLA', games: 7, matchupId: 'TBL-FLA' },
        { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
        { team: 'WPG', games: 6, matchupId: 'WPG-STL' },
        { team: 'COL', games: 6, matchupId: 'DAL-COL' },
        { team: 'VGK', games: 7, matchupId: 'VGS-MIN' },
        { team: 'LA', games: 5, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2024", position: "Last", score: 7 },
      { year: "2023", position: "Last", score: 4 },
      { year: "2018", position: "1st", score: 13 }
    ]
  },
  {
    name: "Dave",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'TOR', games: 6, matchupId: 'TOR-OTT' },
        { team: 'FLA', games: 6, matchupId: 'TBL-FLA' },
        { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 7, matchupId: 'CAR-NJD' },
        { team: 'WPG', games: 6, matchupId: 'WPG-STL' },
        { team: 'DAL', games: 6, matchupId: 'DAL-COL' },
        { team: 'VGK', games: 5, matchupId: 'VGS-MIN' },
        { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2019", position: "1st", score: 10 },
      { year: "2017", position: "Last", score: 8 }
    ]
  },
  {
    name: "Rhonda",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'OTT', games: 7, matchupId: 'TOR-OTT' },
        { team: 'TBL', games: 6, matchupId: 'TBL-FLA' },
        { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
        { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
        { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
        { team: 'DAL', games: 6, matchupId: 'DAL-COL' },
        { team: 'VGK', games: 5, matchupId: 'VGS-MIN' },
        { team: 'EDM', games: 6, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2019", position: "Last", score: 1 }
    ]
  },
  {
    name: "Tina",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'Ott', games: 6, matchupId: 'TOR-OTT' },
        { team: 'Fla', games: 6, matchupId: 'TBL-FLA' },
        { team: 'Wsh', games: 5, matchupId: 'WSH-MTL' },
        { team: 'Njd', games: 7, matchupId: 'CAR-NJD' },
        { team: 'Stl', games: 6, matchupId: 'WPG-STL' },
        { team: 'Col', games: 7, matchupId: 'DAL-COL' },
        { team: 'Vgk', games: 5, matchupId: 'VGS-MIN' },
        { team: 'Lak', games: 7, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    isNewPlayer: true
  },
  {
    name: "Bird",
    currentRank: 0,
    picks: {
      round1: [
        { team: 'Tor', games: 5, matchupId: 'TOR-OTT' },
        { team: 'Tbl', games: 6, matchupId: 'TBL-FLA' },
        { team: 'Wsh', games: 5, matchupId: 'WSH-MTL' },
        { team: 'Car', games: 5, matchupId: 'CAR-NJD' },
        { team: 'Wpg', games: 5, matchupId: 'WPG-STL' },
        { team: 'Col', games: 5, matchupId: 'DAL-COL' },
        { team: 'Vgk', games: 5, matchupId: 'VGS-MIN' },
        { team: 'Lak', games: 6, matchupId: 'LA-EDM' }
      ],
      round2: [],
      round3: [],
      round4: []
    },
    pastStats: [
      { year: "2023", position: "2nd", score: 14, perfectPicks: 4 },
      { year: "2017", position: "3rd", score: 14 }
    ]
  }
];

function PlayerAvatar({ name }: { name: string }) {
  return (
    <div className="w-24 h-24 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center text-white text-3xl font-bold">
      {name[0]}
    </div>
  );
}

function RoundDropdown({ round, picks }: { round: string; picks: Pick[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const getTeamFullName = (team: string) => {
    // Convert abbreviation to team ID
    const teamId = Object.keys(teams).find(key => 
      teams[key].abbreviation.toLowerCase() === team.toLowerCase()
    );
    return teamId ? teams[teamId].name : team;
  };

  const getTeamLogo = (team: string) => {
    // Convert abbreviation to team ID
    const teamId = Object.keys(teams).find(key => 
      teams[key].abbreviation.toLowerCase() === team.toLowerCase()
    );
    
    if (!teamId || !teams[teamId]?.logo) {
      console.warn(`No logo found for team: ${team}`);
      return '/images/placeholder-logo.png';
    }
    return teams[teamId].logo;
  };

  return (
    <div className="border dark:border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <span className="font-medium text-gray-900 dark:text-white">{round}</span>
        <svg
          className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div className={`${isOpen ? 'block' : 'hidden'} p-4 bg-white dark:bg-gray-800`}>
        {picks.length > 0 ? (
          <div className="space-y-3">
            {picks.map((pick, index) => {
              const matchup = matchups.find(m => m.id === pick.matchupId);
              if (!matchup) return null;

              const teamFullName = getTeamFullName(pick.team);
              const logoUrl = getTeamLogo(pick.team);

              return (
                <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="relative w-8 h-8">
                      <Image
                        src={logoUrl}
                        alt={teamFullName}
                        fill
                        className="object-contain"
                        priority
                        unoptimized
                      />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{teamFullName}</span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">in {pick.games}</span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-center">No picks made yet</p>
        )}
      </div>
    </div>
  );
}

function PlayerProfile({ player }: { player: PlayerData }) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex flex-col items-center mb-6">
        <PlayerAvatar name={player.name} />
        <h2 className="text-2xl font-bold mt-4 text-gray-900 dark:text-white">{player.name}</h2>
        {player.currentRank && (
          <div className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Current Rank: {player.currentRank}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">2025 Playoff Picks</h3>
          <div className="space-y-3">
            <RoundDropdown round="Round 1" picks={player.picks.round1} />
            <RoundDropdown round="Round 2" picks={player.picks.round2} />
            <RoundDropdown round="Round 3" picks={player.picks.round3} />
            <RoundDropdown round="Round 4" picks={player.picks.round4} />
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Past Performance</h3>
          {player.isNewPlayer ? (
            <p className="text-gray-500 dark:text-gray-400">New Player for 2025</p>
          ) : player.pastStats ? (
            <div className="grid grid-cols-1 gap-3">
              {player.pastStats.map((stat) => (
                <div key={stat.year} className="bg-gray-50 dark:bg-gray-700 p-3 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 dark:text-gray-300">{stat.year}</span>
                    <div className="text-right">
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        Position: {stat.position}
                        {stat.perfectPicks && ` | Perfect Picks: ${stat.perfectPicks}`}
                      </span>
                      {stat.cupWinner && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Cup Winner: {stat.cupWinner}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No previous history</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PlayersPage() {
  const searchParams = useSearchParams();
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerData | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const memberName = searchParams.get('member');
    setSelectedPlayer(players.find(p => p.name === memberName) || players[0]);
  }, [searchParams]);

  if (!selectedPlayer) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-between"
        >
          <span>{selectedPlayer?.name || "Select Player"}</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${isMobileMenuOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isMobileMenuOpen && (
          <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
            {players.map((player) => (
              <button
                key={player.name}
                onClick={() => {
                  setSelectedPlayer(player);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              >
                {player.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="hidden lg:block w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Players</h2>
          <div className="space-y-2">
            {players.map((player) => (
              <button
                key={player.name}
                onClick={() => setSelectedPlayer(player)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedPlayer?.name === player.name
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {player.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1">
          {selectedPlayer && <PlayerProfile player={selectedPlayer} />}
        </div>
      </div>
    </div>
  );
}