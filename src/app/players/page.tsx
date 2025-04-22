'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import { teams } from '@/lib/teams';

interface PlayerPick {
  matchup_id: string;
  selected_team_id: string;
  games: number;
}

interface Player {
  id: string;
  email: string;
  picks: PlayerPick[];
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        // Fetch all users (players)
        const { data: usersData, error: usersError } = await supabase
          .from('profiles')
          .select('*');

        if (usersError) throw usersError;

        // Fetch all picks for all users
        const { data: picksData, error: picksError } = await supabase
          .from('picks')
          .select('*');

        if (picksError) throw picksError;

        // Organize picks by user
        const formattedPlayers = usersData.map(user => ({
          id: user.id,
          email: user.email?.split('@')[0] || 'Unknown',
          picks: picksData.filter(pick => pick.user_id === user.id)
        }));

        setPlayers(formattedPlayers);
      } catch (err) {
        console.error('Error fetching players:', err);
        setError('Failed to load players');
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, [supabase]);

  const renderPlayerPicks = (player: Player) => {
    return (
      <div className="space-y-4">
        {player.picks.map((pick) => {
          const team = teams[pick.selected_team_id];
          return (
            <div key={pick.matchup_id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <div className="relative w-12 h-12">
                <Image
                  src={team.logo}
                  alt={team.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <p className="font-medium">{team.name}</p>
                <p className="text-sm text-gray-500">in {pick.games} games</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Players</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <div
              key={player.id}
              className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedPlayer(selectedPlayer?.id === player.id ? null : player)}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">{player.email}</h2>
              {selectedPlayer?.id === player.id && renderPlayerPicks(player)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 