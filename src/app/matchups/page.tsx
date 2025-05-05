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
  round: 'First' | 'Second';
}

interface TeamMemberPick {
  team: string;
  games: number;
  matchupId: string;
}

interface TeamMember {
  name: string;
  picks: TeamMemberPick[];
}

interface CompletedMatchup {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  winner: string;
  games: number;
  round: 'First' | 'Second';
  conference: 'Eastern' | 'Western';
}

const teamColors: { [key: string]: { primary: string; secondary: string } } = {
  'Toronto Maple Leafs': { primary: '#00205B', secondary: '#FFFFFF' },
  'Ottawa Senators': { primary: '#C52032', secondary: '#000000' },
  'Tampa Bay': { primary: '#002868', secondary: '#FFFFFF' },
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
  // First Round
  { id: 'TOR-OTT', homeTeam: 'Toronto Maple Leafs', awayTeam: 'Ottawa Senators', conference: 'Eastern', round: 'First' },
  { id: 'TBL-FLA', homeTeam: 'Tampa Bay', awayTeam: 'Florida Panthers', conference: 'Eastern', round: 'First' },
  { id: 'WSH-MTL', homeTeam: 'Washington Capitals', awayTeam: 'Montreal Canadiens', conference: 'Eastern', round: 'First' },
  { id: 'CAR-NJD', homeTeam: 'Carolina Hurricanes', awayTeam: 'New Jersey Devils', conference: 'Eastern', round: 'First' },
  { id: 'WPG-STL', homeTeam: 'Winnipeg Jets', awayTeam: 'St. Louis Blues', conference: 'Western', round: 'First' },
  { id: 'DAL-COL', homeTeam: 'Dallas Stars', awayTeam: 'Colorado Avalanche', conference: 'Western', round: 'First' },
  { id: 'VGK-MIN', homeTeam: 'Vegas Golden Knights', awayTeam: 'Minnesota Wild', conference: 'Western', round: 'First' },
  { id: 'LA-EDM', homeTeam: 'Los Angeles Kings', awayTeam: 'Edmonton Oilers', conference: 'Western', round: 'First' },
  
  // Second Round
  { id: 'TOR-FLA', homeTeam: 'Toronto Maple Leafs', awayTeam: 'Florida Panthers', conference: 'Eastern', round: 'Second' },
  { id: 'WSH-CAR', homeTeam: 'Washington Capitals', awayTeam: 'Carolina Hurricanes', conference: 'Eastern', round: 'Second' },
  { id: 'WPG-DAL', homeTeam: 'Winnipeg Jets', awayTeam: 'Dallas Stars', conference: 'Western', round: 'Second' },
  { id: 'VGK-EDM', homeTeam: 'Vegas Golden Knights', awayTeam: 'Edmonton Oilers', conference: 'Western', round: 'Second' }
];

const completedMatchups: CompletedMatchup[] = [
  {
    id: 'TOR-OTT',
    homeTeam: 'Toronto Maple Leafs',
    awayTeam: 'Ottawa Senators',
    homeScore: 4,
    awayScore: 2,
    winner: 'TOR',
    games: 6,
    round: 'First',
    conference: 'Eastern'
  },
  {
    id: 'CAR-NJD',
    homeTeam: 'Carolina Hurricanes',
    awayTeam: 'New Jersey Devils',
    homeScore: 4,
    awayScore: 1,
    winner: 'CAR',
    games: 5,
    round: 'First',
    conference: 'Eastern'
  },
  {
    id: 'WSH-MTL',
    homeTeam: 'Washington Capitals',
    awayTeam: 'Montreal Canadiens',
    homeScore: 4,
    awayScore: 1,
    winner: 'WSH',
    games: 5,
    round: 'First',
    conference: 'Eastern'
  },
  {
    id: 'TBL-FLA',
    homeTeam: 'Tampa Bay',
    awayTeam: 'Florida Panthers',
    homeScore: 1,
    awayScore: 4,
    winner: 'FLA',
    games: 5,
    round: 'First',
    conference: 'Eastern'
  }
];

const westernCompletedMatchups: CompletedMatchup[] = [
  {
    id: 'VGK-MIN',
    homeTeam: 'Vegas Golden Knights',
    awayTeam: 'Minnesota Wild',
    homeScore: 4,
    awayScore: 2,
    winner: 'VGK',
    games: 6,
    round: 'First',
    conference: 'Western'
  },
  {
    id: 'LA-EDM',
    homeTeam: 'Los Angeles Kings',
    awayTeam: 'Edmonton Oilers',
    homeScore: 2,
    awayScore: 4,
    winner: 'EDM',
    games: 6,
    round: 'First',
    conference: 'Western'
  },
  {
    id: 'WPG-STL',
    homeTeam: 'Winnipeg Jets',
    awayTeam: 'St. Louis Blues',
    homeScore: 4,
    awayScore: 3,
    winner: 'WPG',
    games: 7,
    round: 'First',
    conference: 'Western'
  },
  {
    id: 'DAL-COL',
    homeTeam: 'Dallas Stars',
    awayTeam: 'Colorado Avalanche',
    homeScore: 4,
    awayScore: 3,
    winner: 'DAL',
    games: 7,
    round: 'First',
    conference: 'Western'
  }
];

const teamMembers: TeamMember[] = [
  {
    name: 'GMA',
    picks: [
      { team: 'TOR', games: 7, matchupId: 'TOR-OTT' },
      { team: 'FLA', games: 6, matchupId: 'TBL-FLA' },
      { team: 'WSH', games: 7, matchupId: 'WSH-MTL' },
      { team: 'CAR', games: 6, matchupId: 'CAR-NJD' },
      { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
      { team: 'DAL', games: 7, matchupId: 'DAL-COL' },
      { team: 'VGK', games: 7, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 5, matchupId: 'VGK-MIN' },
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
      { team: 'MIN', games: 6, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 5, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 7, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 7, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 5, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 5, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 5, matchupId: 'VGK-MIN' },
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
      { team: 'VGK', games: 5, matchupId: 'VGK-MIN' },
      { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
      { team: 'COL', games: 5, matchupId: 'DAL-COL' }
    ]
  }
];

export { teamMembers };

const getTeamAbbreviation = (teamName: string): string => {
  const abbreviations: { [key: string]: string } = {
    'Toronto Maple Leafs': 'TOR',
    'Ottawa Senators': 'OTT',
    'Tampa Bay': 'TBL',
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
    'TBL': 'Tampa Bay',
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
  return `linear-gradient(135deg, ${home.primary}55 0%, ${home.secondary}44 25%, ${away.primary}55 75%, ${away.secondary}44 100%)`;
};

const MatchupResult = ({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  winner,
  games,
  picks
}: {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  winner: string;
  games: number;
  picks: Pick[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const homeTeamColors = teamColors[homeTeam];
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div 
        className="p-4 cursor-pointer relative overflow-hidden"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          background: `linear-gradient(135deg, ${homeTeamColors?.primary}55 0%, ${homeTeamColors?.secondary}44 25%, ${homeTeamColors?.primary}55 100%)`
        }}
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2 flex-1 min-w-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full p-1 flex-shrink-0">
              <Image
                src={getTeamLogo(homeTeam)}
                alt={homeTeam}
                fill
                className="object-contain"
              />
            </div>
            <span className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100 truncate">
              {homeTeam}
            </span>
          </div>
          <div className="text-lg font-bold text-black dark:text-white">
            {homeScore} - {awayScore}
          </div>
          <div className="flex items-center space-x-2 flex-1 min-w-0 justify-end">
            <span className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100 truncate text-right">
              {awayTeam}
            </span>
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full p-1 flex-shrink-0">
              <Image
                src={getTeamLogo(awayTeam)}
                alt={awayTeam}
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4">
          <div className="space-y-2">
            {picks.map((pick, index) => {
              const isCorrectTeam = pick.selectedTeam === winner;
              const isCorrectGames = isCorrectTeam && pick.games === games;
              
              return (
                <div 
                  key={index} 
                  className={`flex flex-col text-xs sm:text-sm p-2 rounded shadow-sm ${
                    isCorrectGames
                      ? 'bg-green-100/90'
                      : isCorrectTeam
                        ? 'bg-blue-100/90'
                        : 'bg-white/90'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="relative w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full p-0.5">
                        <Image
                          src={getTeamLogo(getFullTeamName(pick.selectedTeam))}
                          alt={pick.selectedTeam}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium text-gray-900">{pick.name}</span>
                    </div>
                    <span className="text-gray-600">in {pick.games}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default function DashboardPage() {
  const [selectedMatchup, setSelectedMatchup] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">NHL Playoff Pool 2025</h1>
      
      <div className="space-y-8">
        {/* Second Round */}
        <div className="border-b pb-8">
          <h2 className="text-2xl font-bold mb-6">Second Round</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Eastern Conference</h3>
              <div className="space-y-4">
                {matchups
                  .filter(matchup => 
                    matchup.conference === 'Eastern' && 
                    matchup.round === 'Second'
                  )
                  .map((matchup) => (
                    <div 
                      key={matchup.id} 
                      className={`rounded-lg shadow-sm transition-all duration-200 overflow-hidden matchup-gradient ${
                        selectedMatchup === matchup.id ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : 'hover:shadow-md'
                      }`}
                      style={{
                        background: getMatchupGradient(matchup.homeTeam, matchup.awayTeam)
                      }}
                      onClick={() => setSelectedMatchup(selectedMatchup === matchup.id ? null : matchup.id)}
                    >
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full p-1 flex-shrink-0">
                              <Image
                                src={getTeamLogo(matchup.homeTeam)}
                                alt={matchup.homeTeam}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100 truncate">
                              {matchup.homeTeam}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 flex-1 min-w-0 justify-end">
                            <span className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100 truncate text-right">
                              {matchup.awayTeam}
                            </span>
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full p-1 flex-shrink-0">
                              <Image
                                src={getTeamLogo(matchup.awayTeam)}
                                alt={matchup.awayTeam}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Western Conference</h3>
              <div className="space-y-4">
                {matchups
                  .filter(matchup => 
                    matchup.conference === 'Western' && 
                    matchup.round === 'Second'
                  )
                  .map((matchup) => (
                    <div 
                      key={matchup.id} 
                      className={`rounded-lg shadow-sm transition-all duration-200 overflow-hidden matchup-gradient ${
                        selectedMatchup === matchup.id ? 'ring-2 ring-indigo-500 dark:ring-indigo-400' : 'hover:shadow-md'
                      }`}
                      style={{
                        background: getMatchupGradient(matchup.homeTeam, matchup.awayTeam)
                      }}
                      onClick={() => setSelectedMatchup(selectedMatchup === matchup.id ? null : matchup.id)}
                    >
                      <div className="p-3 sm:p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full p-1 flex-shrink-0">
                              <Image
                                src={getTeamLogo(matchup.homeTeam)}
                                alt={matchup.homeTeam}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100 truncate">
                              {matchup.homeTeam}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2 flex-1 min-w-0 justify-end">
                            <span className="font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100 truncate text-right">
                              {matchup.awayTeam}
                            </span>
                            <div className="relative w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full p-1 flex-shrink-0">
                              <Image
                                src={getTeamLogo(matchup.awayTeam)}
                                alt={matchup.awayTeam}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* First Round */}
        <div>
          <h2 className="text-2xl font-bold mb-6">First Round</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Eastern Conference</h3>
              <div className="space-y-4">
                {completedMatchups
                  .filter(matchup => matchup.conference === 'Eastern' && matchup.round === 'First')
                  .map((matchup) => (
                    <MatchupResult
                      key={matchup.id}
                      homeTeam={matchup.homeTeam}
                      awayTeam={matchup.awayTeam}
                      homeScore={matchup.homeScore}
                      awayScore={matchup.awayScore}
                      winner={matchup.winner}
                      games={matchup.games}
                      picks={getPicksForMatchup(matchup.id)}
                    />
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Western Conference</h3>
              <div className="space-y-4">
                {westernCompletedMatchups
                  .filter(matchup => matchup.round === 'First')
                  .map((matchup) => (
                    <MatchupResult
                      key={matchup.id}
                      homeTeam={matchup.homeTeam}
                      awayTeam={matchup.awayTeam}
                      homeScore={matchup.homeScore}
                      awayScore={matchup.awayScore}
                      winner={matchup.winner}
                      games={matchup.games}
                      picks={getPicksForMatchup(matchup.id)}
                    />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}