export interface User {
  id: string;
  email: string;
  name: string;
  isCommissioner?: boolean;
}

export interface League {
  id: string;
  name: string;
  commissionerId: string;
  season: string;
  isActive: boolean;
  members: LeagueMember[];
}

export interface LeagueMember {
  id: string;
  userId: string;
  leagueId: string;
  status: 'pending' | 'approved' | 'rejected';
  user: User;
}

export interface PlayoffMatchup {
  id: string;
  round: number;
  homeTeam: Team;
  awayTeam: Team;
  homeTeamScore?: number;
  awayTeamScore?: number;
  winner?: Team;
  status: 'upcoming' | 'in_progress' | 'completed';
}

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  conference: 'Eastern' | 'Western';
  division: string;
  logo: string;
}

export interface UserPick {
  id: string;
  userId: string;
  matchupId: string;
  selectedTeamId: string;
  points?: number;
  matchup: PlayoffMatchup;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  totalPoints: number;
  correctPicks: number;
  rank: number;
} 