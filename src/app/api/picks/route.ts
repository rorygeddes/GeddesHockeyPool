import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

interface Pick {
  teamId: string;
  games: number;
}

interface PicksPayload {
  picks: Record<string, Pick>;
}

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
    // Get the current user first
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) {
      console.error('Auth error:', userError);
      return NextResponse.json({ error: 'Authentication failed' }, { status: 401 });
    }
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Parse request body
    const { picks } = await request.json() as PicksPayload;
    if (!picks || Object.keys(picks).length === 0) {
      return NextResponse.json({ error: 'No picks provided' }, { status: 400 });
    }

    // Format picks for insertion
    const picksToInsert = Object.entries(picks).map(([matchupId, pick]) => ({
      user_id: user.id,
      matchup_id: matchupId,
      selected_team_id: pick.teamId,
      games: pick.games,
    }));

    // Insert all picks
    const { data, error } = await supabase
      .from('picks')
      .upsert(picksToInsert)
      .select();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to save picks to database' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    
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

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch picks' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ data });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
} 