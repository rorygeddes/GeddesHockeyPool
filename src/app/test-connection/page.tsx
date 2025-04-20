'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface TestData {
  id: string;
  created_at: string;
}

export default function TestConnection() {
  const [data, setData] = useState<TestData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('test').select('*');
        if (error) throw error;
        setData(data || []);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    };

    fetchData();
  }, [supabase]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Test Connection</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
} 