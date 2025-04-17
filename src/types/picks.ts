export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
  conference: 'Eastern' | 'Western';
}

export interface Matchup {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  round: number;
}

export interface Pick {
  id?: string;
  userId: string;
  matchupId: string;
  selectedTeamId: string;
  games: number;
  createdAt?: string;
}

export interface UserPick {
  userName: string;
  selectedTeam: Team;
  games: number;
} 