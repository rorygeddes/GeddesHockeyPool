export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
  conference: 'Eastern' | 'Western';
}

export const teams: { [key: string]: Team } = {
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