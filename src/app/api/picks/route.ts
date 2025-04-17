import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    const { picks } = await request.json();
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    
    // Insert all picks in a transaction
    const { data, error } = await supabase
      .from('picks')
      .insert(
        Object.entries(picks).map(([matchupId, pick]: [string, any]) => ({
          user_id: user?.id,
          matchup_id: matchupId,
          selected_team_id: pick.teamId,
          games: pick.games,
        }))
      );

    if (error) throw error;
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error submitting picks:', error);
    return NextResponse.json(
      { error: 'Failed to submit picks' },
      { status: 500 }
    );
  }
}

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  
  try {
    // Get all picks with user and team information
    const { data, error } = await supabase
      .from('picks')
      .select(`
        *,
        users (
          id,
          name
        ),
        matchups (
          id,
          home_team_id,
          away_team_id,
          round
        )
      `);

    if (error) throw error;
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching picks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch picks' },
      { status: 500 }
    );
  }
} 