import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { teams } from '@/app/picks/page';

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Get all matchups with their picks
    const { data: matchupsData, error: matchupsError } = await supabase
      .from('matchups')
      .select(`
        id,
        home_team_id,
        away_team_id,
        round,
        picks (
          id,
          user_id,
          selected_team_id,
          games,
          users (
            id,
            name
          )
        )
      `);

    if (matchupsError) throw matchupsError;

    // Transform the data to match our frontend types
    const transformedMatchups = matchupsData.map((matchup) => ({
      id: matchup.id,
      homeTeam: teams[matchup.home_team_id],
      awayTeam: teams[matchup.away_team_id],
      round: matchup.round,
      picks: matchup.picks.map((pick) => ({
        userName: pick.users.name,
        selectedTeam: teams[pick.selected_team_id],
        games: pick.games,
      })),
    }));

    return NextResponse.json(transformedMatchups);
  } catch (error) {
    console.error('Error fetching matchups with picks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matchups with picks' },
      { status: 500 }
    );
  }
} 