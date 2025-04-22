'use client';

import { useState } from 'react';
import Image from 'next/image';
import { teams } from '@/lib/teams';

interface Pick {
  name: string;
  selectedTeam: string;
  games: number;
}

interface Matchup {
  id: string;
  homeTeam: string;
  awayTeam: string;
  conference: 'Eastern' | 'Western';
}

const teamColors: { [key: string]: { primary: string; secondary: string } } = {
  'Toronto Maple Leafs': { primary: '#00205B', secondary: '#FFFFFF' },
  'Ottawa Senators': { primary: '#C52032', secondary: '#000000' },
  'Tampa Bay Lightning': { primary: '#002868', secondary: '#FFFFFF' },
  'Florida Panthers': { primary: '#C8102E', secondary: '#041E42' },
  'Washington Capitals': { primary: '#C8102E', secondary: '#041E42' },
  'Montreal Canadiens': { primary: '#AF1E2D', secondary: '#192168' },
  'Carolina Hurricanes': { primary: '#CC0000', secondary: '#000000' },
  'New Jersey Devils': { primary: '#CE1126', secondary: '#000000' },
  'Winnipeg Jets': { primary: '#041E42', secondary: '#004C97' },
  'St. Louis Blues': { primary: '#002F87', secondary: '#FCB514' },
  'Dallas Stars': { primary: '#006847', secondary: '#8F8F8C' },
  'Colorado Avalanche': { primary: '#6F263D', secondary: '#236192' },
  'Vegas Golden Knights': { primary: '#B4975A', secondary: '#333F42' },
  'Minnesota Wild': { primary: '#A6192E', secondary: '#154734' },
  'Los Angeles Kings': { primary: '#111111', secondary: '#A2AAAD' },
  'Edmonton Oilers': { primary: '#041E42', secondary: '#FF4C00' }
};

const matchups: Matchup[] = [
  { id: 'TOR-OTT', homeTeam: 'Toronto Maple Leafs', awayTeam: 'Ottawa Senators', conference: 'Eastern' },
  { id: 'TBL-FLA', homeTeam: 'Tampa Bay Lightning', awayTeam: 'Florida Panthers', conference: 'Eastern' },
  { id: 'WSH-MTL', homeTeam: 'Washington Capitals', awayTeam: 'Montreal Canadiens', conference: 'Eastern' },
  { id: 'CAR-NJD', homeTeam: 'Carolina Hurricanes', awayTeam: 'New Jersey Devils', conference: 'Eastern' },
  { id: 'WPG-STL', homeTeam: 'Winnipeg Jets', awayTeam: 'St. Louis Blues', conference: 'Western' },
  { id: 'DAL-COL', homeTeam: 'Dallas Stars', awayTeam: 'Colorado Avalanche', conference: 'Western' },
  { id: 'VGS-MIN', homeTeam: 'Vegas Golden Knights', awayTeam: 'Minnesota Wild', conference: 'Western' },
  { id: 'LA-EDM', homeTeam: 'Los Angeles Kings', awayTeam: 'Edmonton Oilers', conference: 'Western' }
];

const teamMembers = [
  {
    name: 'GMA',
    picks: [
      { team: 'TOR', games: 7, matchupId: 'TOR-OTT' },
      { team: 'FLA', games: 6, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 7, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
      { team: 'DAL', games: 7, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 7, matchupId: 'VGS-MIN' },
      { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Fiona',
    picks: [
      { team: 'TOR', games: 7, matchupId: 'TOR-OTT' },
      { team: 'FLA', games: 6, matchupId: 'TBL-FLA' },
      { team: 'MTL', games: 7, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
      { team: 'COL', games: 6, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 6, matchupId: 'VGS-MIN' },
      { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Claire',
    picks: [
      { team: 'OTT', games: 5, matchupId: 'TOR-OTT' },
      { team: 'FLA', games: 6, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 4, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
      { team: 'COL', games: 6, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 6, matchupId: 'VGS-MIN' },
      { team: 'EDM', games: 6, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Noah',
    picks: [
      { team: 'TOR', games: 6, matchupId: 'TOR-OTT' },
      { team: 'FLA', games: 6, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 6, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 5, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
      { team: 'COL', games: 5, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 6, matchupId: 'VGS-MIN' },
      { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Cooper',
    picks: [
      { team: 'TOR', games: 6, matchupId: 'TOR-OTT' },
      { team: 'TBL', games: 7, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 6, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 6, matchupId: 'WPG-STL' },
      { team: 'COL', games: 6, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 5, matchupId: 'VGS-MIN' },
      { team: 'LA', games: 6, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Rayna',
    picks: [
      { team: 'TOR', games: 6, matchupId: 'TOR-OTT' },
      { team: 'TBL', games: 7, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 5, matchupId: 'CAR-NJD' },
      { team: 'STL', games: 7, matchupId: 'WPG-STL' },
      { team: 'COL', games: 7, matchupId: 'DAL-COL' },
      { team: 'MIN', games: 6, matchupId: 'VGS-MIN' },
      { team: 'EDM', games: 6, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Rory',
    picks: [
      { team: 'OTT', games: 7, matchupId: 'TOR-OTT' },
      { team: 'TBL', games: 7, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 6, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 5, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 7, matchupId: 'WPG-STL' },
      { team: 'COL', games: 7, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 6, matchupId: 'VGS-MIN' },
      { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Grady',
    picks: [
      { team: 'OTT', games: 7, matchupId: 'TOR-OTT' },
      { team: 'FLA', games: 7, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 6, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
      { team: 'COL', games: 6, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 6, matchupId: 'VGS-MIN' },
      { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Crosby',
    picks: [
      { team: 'OTT', games: 6, matchupId: 'TOR-OTT' },
      { team: 'TBL', games: 6, matchupId: 'TBL-FLA' },
      { team: 'MTL', games: 6, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 7, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 6, matchupId: 'WPG-STL' },
      { team: 'DAL', games: 7, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 6, matchupId: 'VGS-MIN' },
      { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Bow',
    picks: [
      { team: 'OTT', games: 6, matchupId: 'TOR-OTT' },
      { team: 'TBL', games: 6, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 5, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
      { team: 'COL', games: 6, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 5, matchupId: 'VGS-MIN' },
      { team: 'LA', games: 6, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Jill',
    picks: [
      { team: 'OTT', games: 7, matchupId: 'TOR-OTT' },
      { team: 'FLA', games: 7, matchupId: 'TBL-FLA' },
      { team: 'MTL', games: 6, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 4, matchupId: 'WPG-STL' },
      { team: 'COL', games: 6, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 6, matchupId: 'VGS-MIN' },
      { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Jordan',
    picks: [
      { team: 'OTT', games: 7, matchupId: 'TOR-OTT' },
      { team: 'TBL', games: 7, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 4, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 6, matchupId: 'WPG-STL' },
      { team: 'COL', games: 6, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 7, matchupId: 'VGS-MIN' },
      { team: 'LA', games: 7, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Grant',
    picks: [
      { team: 'TOR', games: 6, matchupId: 'TOR-OTT' },
      { team: 'FLA', games: 7, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 6, matchupId: 'WPG-STL' },
      { team: 'COL', games: 6, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 7, matchupId: 'VGS-MIN' },
      { team: 'LA', games: 5, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Dave',
    picks: [
      { team: 'TOR', games: 6, matchupId: 'TOR-OTT' },
      { team: 'FLA', games: 6, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 7, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 6, matchupId: 'WPG-STL' },
      { team: 'DAL', games: 6, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 5, matchupId: 'VGS-MIN' },
      { team: 'EDM', games: 7, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Rhonda',
    picks: [
      { team: 'OTT', games: 7, matchupId: 'TOR-OTT' },
      { team: 'TBL', games: 6, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
      { team: 'DAL', games: 6, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 5, matchupId: 'VGS-MIN' },
      { team: 'EDM', games: 6, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Tina',
    picks: [
      { team: 'OTT', games: 6, matchupId: 'TOR-OTT' },
      { team: 'FLA', games: 6, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
      { team: 'NJD', games: 7, matchupId: 'CAR-NJD' },
      { team: 'STL', games: 6, matchupId: 'WPG-STL' },
      { team: 'COL', games: 7, matchupId: 'DAL-COL' },
      { team: 'VGS', games: 5, matchupId: 'VGS-MIN' },
      { team: 'LA', games: 7, matchupId: 'LA-EDM' }
    ]
  },
  {
    name: 'Bird',
    picks: [
      { team: 'TOR', games: 5, matchupId: 'TOR-OTT' },
      { team: 'CAR', games: 5, matchupId: 'CAR-NJD' },
      { team: 'TBL', games: 6, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 5, matchupId: 'WSH-MTL' },
      { team: 'EDM', games: 6, matchupId: 'LA-EDM' },
      { team: 'VGK', games: 5, matchupId: 'VGS-MIN' },
      { team: 'COL', games: 5, matchupId: 'DAL-COL' },
      { team: 'WPG', games: 5, matchupId: 'WPG-STL' }
    ]
  }
];

export default function DashboardPage() {
  const [selectedMatchup, setSelectedMatchup] = useState<string | null>(null);

  const getTeamAbbreviation = (teamName: string): string => {
    const abbreviations: { [key: string]: string } = {
      'Toronto Maple Leafs': 'TOR',
      'Ottawa Senators': 'OTT',
      'Tampa Bay Lightning': 'TBL',
      'Florida Panthers': 'FLA',
      'Washington Capitals': 'WSH',
      'Montreal Canadiens': 'MTL',
      'Carolina Hurricanes': 'CAR',
      'New Jersey Devils': 'NJD',
      'Winnipeg Jets': 'WPG',
      'St. Louis Blues': 'STL',
      'Dallas Stars': 'DAL',
      'Colorado Avalanche': 'COL',
      'Vegas Golden Knights': 'VGK',
      'Minnesota Wild': 'MIN',
      'Los Angeles Kings': 'LAK',
      'Edmonton Oilers': 'EDM'
    };
    return abbreviations[teamName] || '';
  };

  const getTeamLogo = (teamName: string) => {
    const abbreviation = getTeamAbbreviation(teamName);
    const teamKey = Object.keys(teams).find(
      key => teams[key].abbreviation === abbreviation
    );
    if (!teamKey || !teams[teamKey].logo) {
      console.warn(`No logo found for team: ${teamName}`);
      return '/placeholder-logo.png'; // You might want to add a placeholder logo
    }
    return teams[teamKey].logo;
  };

  const getFullTeamName = (abbreviation: string): string => {
    const teamNames: { [key: string]: string } = {
      'TOR': 'Toronto Maple Leafs',
      'OTT': 'Ottawa Senators',
      'TBL': 'Tampa Bay Lightning',
      'FLA': 'Florida Panthers',
      'WSH': 'Washington Capitals',
      'MTL': 'Montreal Canadiens',
      'CAR': 'Carolina Hurricanes',
      'NJD': 'New Jersey Devils',
      'WPG': 'Winnipeg Jets',
      'STL': 'St. Louis Blues',
      'DAL': 'Dallas Stars',
      'COL': 'Colorado Avalanche',
      'VGK': 'Vegas Golden Knights',
      'VGS': 'Vegas Golden Knights', // For backward compatibility
      'MIN': 'Minnesota Wild',
      'LAK': 'Los Angeles Kings',
      'LA': 'Los Angeles Kings',  // For backward compatibility
      'EDM': 'Edmonton Oilers'
    };
    return teamNames[abbreviation] || abbreviation;
  };

  const getPicksForMatchup = (matchupId: string): Pick[] => {
    return teamMembers
      .map(member => ({
        name: member.name,
        pick: member.picks.find(p => p.matchupId === matchupId)
      }))
      .filter(item => item.pick)
      .map(item => ({
        name: item.name,
        selectedTeam: item.pick!.team,
        games: item.pick!.games
      }));
  };

  const getMatchupGradient = (homeTeam: string, awayTeam: string) => {
    const home = teamColors[homeTeam];
    const away = teamColors[awayTeam];
    return `linear-gradient(135deg, ${home.primary}22 0%, ${home.secondary}22 25%, ${away.primary}22 75%, ${away.secondary}22 100%)`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="border-b border-gray-200 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Playoff Picks Dashboard</h1>
          <p className="mt-2 text-sm text-gray-500">
            Tap a matchup to view all picks. Tap again to collapse.
          </p>
        </div>

        <div className="mt-6 space-y-6">
          {/* Eastern Conference */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Eastern Conference</h2>
            <div className="space-y-3">
              {matchups
                .filter(matchup => matchup.conference === 'Eastern')
                .map((matchup) => (
                  <div 
                    key={matchup.id} 
                    className={`rounded-lg shadow-sm transition-all duration-200 overflow-hidden ${
                      selectedMatchup === matchup.id ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
                    }`}
                    style={{
                      background: getMatchupGradient(matchup.homeTeam, matchup.awayTeam)
                    }}
                    onClick={() => setSelectedMatchup(selectedMatchup === matchup.id ? null : matchup.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full p-1">
                            <Image
                              src={getTeamLogo(matchup.homeTeam)}
                              alt={matchup.homeTeam}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="font-medium text-sm sm:text-base text-gray-900">{matchup.homeTeam}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">vs</span>
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-sm sm:text-base text-gray-900">{matchup.awayTeam}</span>
                          <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full p-1">
                            <Image
                              src={getTeamLogo(matchup.awayTeam)}
                              alt={matchup.awayTeam}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                      {selectedMatchup === matchup.id && (
                        <div className="mt-4 space-y-2 bg-white/90 rounded-md p-3">
                          {getPicksForMatchup(matchup.id).map((pick, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between text-sm p-2 rounded bg-white/80"
                            >
                              <span className="font-medium">{pick.name}</span>
                              <div className="flex items-center space-x-2">
                                <div className="relative w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full p-0.5">
                                  <Image
                                    src={getTeamLogo(getFullTeamName(pick.selectedTeam))}
                                    alt={pick.selectedTeam}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <span className="text-gray-600">in {pick.games}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Western Conference */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Western Conference</h2>
            <div className="space-y-3">
              {matchups
                .filter(matchup => matchup.conference === 'Western')
                .map((matchup) => (
                  <div 
                    key={matchup.id} 
                    className={`rounded-lg shadow-sm transition-all duration-200 overflow-hidden ${
                      selectedMatchup === matchup.id ? 'ring-2 ring-indigo-500' : 'hover:shadow-md'
                    }`}
                    style={{
                      background: getMatchupGradient(matchup.homeTeam, matchup.awayTeam)
                    }}
                    onClick={() => setSelectedMatchup(selectedMatchup === matchup.id ? null : matchup.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full p-1">
                            <Image
                              src={getTeamLogo(matchup.homeTeam)}
                              alt={matchup.homeTeam}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span className="font-medium text-sm sm:text-base text-gray-900">{matchup.homeTeam}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-600">vs</span>
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-sm sm:text-base text-gray-900">{matchup.awayTeam}</span>
                          <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full p-1">
                            <Image
                              src={getTeamLogo(matchup.awayTeam)}
                              alt={matchup.awayTeam}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                      {selectedMatchup === matchup.id && (
                        <div className="mt-4 space-y-2 bg-white/90 rounded-md p-3">
                          {getPicksForMatchup(matchup.id).map((pick, index) => (
                            <div 
                              key={index} 
                              className="flex items-center justify-between text-sm p-2 rounded bg-white/80"
                            >
                              <span className="font-medium">{pick.name}</span>
                              <div className="flex items-center space-x-2">
                                <div className="relative w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full p-0.5">
                                  <Image
                                    src={getTeamLogo(getFullTeamName(pick.selectedTeam))}
                                    alt={pick.selectedTeam}
                                    fill
                                    className="object-contain"
                                  />
                                </div>
                                <span className="text-gray-600">in {pick.games}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 