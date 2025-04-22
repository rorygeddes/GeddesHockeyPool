'use client';

import Image from 'next/image';
import { teams } from '@/lib/teams';

interface Pick {
  team: string;
  games: number;
  matchupId: string;
}

interface TeamMember {
  name: string;
  picks: Pick[];
}

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
  }
];

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
    'Vegas Golden Knights': 'VGS',
    'Minnesota Wild': 'MIN',
    'Los Angeles Kings': 'LA',
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
    return '/placeholder-logo.png';
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
    'VGS': 'Vegas Golden Knights',
    'MIN': 'Minnesota Wild',
    'LA': 'Los Angeles Kings',
    'EDM': 'Edmonton Oilers'
  };
  return teamNames[abbreviation] || abbreviation;
};

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Team Members & Picks</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">{member.name}</h2>
              <div className="space-y-3">
                {member.picks.map((pick, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-8 h-8 bg-white rounded-full p-1">
                        <Image
                          src={getTeamLogo(getFullTeamName(pick.team))}
                          alt={pick.team}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        {getFullTeamName(pick.team)}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">in {pick.games}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 