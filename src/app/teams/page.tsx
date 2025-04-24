'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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
      { team: 'VGK', games: 7, matchupId: 'VGS-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
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
      { team: 'VGK', games: 5, matchupId: 'VGS-MIN' },
      { team: 'LAK', games: 6, matchupId: 'LA-EDM' }
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
      { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
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
      { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
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
      { team: 'VGK', games: 5, matchupId: 'VGS-MIN' },
      { team: 'LAK', games: 6, matchupId: 'LA-EDM' }
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
      { team: 'VGK', games: 6, matchupId: 'VGS-MIN' },
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
      { team: 'VGK', games: 7, matchupId: 'VGS-MIN' },
      { team: 'LAK', games: 7, matchupId: 'LA-EDM' }
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
      { team: 'VGK', games: 7, matchupId: 'VGS-MIN' },
      { team: 'LAK', games: 5, matchupId: 'LA-EDM' }
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
      { team: 'VGK', games: 5, matchupId: 'VGS-MIN' },
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
      { team: 'VGK', games: 5, matchupId: 'VGS-MIN' },
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
      { team: 'VGK', games: 5, matchupId: 'VGS-MIN' },
      { team: 'LAK', games: 7, matchupId: 'LA-EDM' }
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
      { team: 'WPG', games: 5, matchupId: 'WPG-STL' },
      { team: 'COL', games: 5, matchupId: 'DAL-COL' }
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
    'VGK': 'Vegas Golden Knights',
    'MIN': 'Minnesota Wild',
    'LAK': 'Los Angeles Kings',
    'EDM': 'Edmonton Oilers'
  };
  return teamNames[abbreviation] || abbreviation;
};

function TeamsList({ initialExpandedMember }: { initialExpandedMember: string | null }) {
  const [expandedMember, setExpandedMember] = useState<string | null>(initialExpandedMember);

  const toggleMember = (memberName: string) => {
    setExpandedMember(expandedMember === memberName ? null : memberName);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teamMembers.map((member) => (
        <div key={member.name} className="bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-md overflow-hidden">
          <button
            onClick={() => toggleMember(member.name)}
            className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-400/30 dark:hover:bg-gray-600/30 transition-colors"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{member.name}</h2>
            <svg
              className={`w-5 h-5 text-gray-700 dark:text-gray-300 transform transition-transform ${
                expandedMember === member.name ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedMember === member.name && (
            <div className="px-6 pb-4">
              <div className="space-y-3">
                {member.picks.map((pick, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-200/70 backdrop-blur-sm rounded-lg p-3">
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
                    <span className="text-sm text-gray-700">in {pick.games}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function TeamsContent() {
  const searchParams = useSearchParams();
  const member = searchParams.get('member');
  
  return <TeamsList initialExpandedMember={member} />;
}

export default function TeamsPage() {
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Team Members & Picks</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <TeamsContent />
        </Suspense>
      </div>
    </div>
  );
} 