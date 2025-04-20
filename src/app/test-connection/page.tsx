'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestConnection() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [matchups, setMatchups] = useState<any[]>([]);

  useEffect(() => {
    async function testConnection() {
      try {
        // Test the connection by fetching matchups
        const { data, error } = await supabase
          .from('matchups')
          .select('*');

        if (error) {
          console.error('Supabase error:', error);
          setStatus('error');
          return;
        }

        setMatchups(data || []);
        setStatus('connected');
      } catch (error) {
        console.error('Connection error:', error);
        setStatus('error');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Connection Status:</h2>
        <div className={`inline-flex items-center px-4 py-2 rounded-full ${
          status === 'loading' ? 'bg-yellow-100 text-yellow-800' :
          status === 'connected' ? 'bg-green-100 text-green-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status === 'loading' ? '🔄 Testing connection...' :
           status === 'connected' ? '✅ Connected to Supabase' :
           '❌ Connection Error'}
        </div>
      </div>

      {status === 'connected' && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Matchups Found: {matchups.length}</h2>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="divide-y divide-gray-200">
              {matchups.map((matchup) => (
                <div key={matchup.id} className="p-4">
                  <p className="text-gray-700">
                    {matchup.home_team_id} vs {matchup.away_team_id} (Round {matchup.round})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">
            Failed to connect to Supabase. Please check your environment variables and database configuration.
          </p>
        </div>
      )}
    </div>
  );
} 