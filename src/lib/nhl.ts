const NHL_API_BASE = 'https://statsapi.web.nhl.com/api/v1';

export async function getPlayoffScores() {
  try {
    const response = await fetch(`${NHL_API_BASE}/tournaments/playoffs`);
    if (!response.ok) throw new Error('Failed to fetch playoff data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching playoff scores:', error);
    throw error;
  }
}

export async function getGameScores(gameIds: string[]) {
  try {
    const gamePromises = gameIds.map(gameId =>
      fetch(`${NHL_API_BASE}/game/${gameId}/feed/live`).then(res => res.json())
    );
    const games = await Promise.all(gamePromises);
    return games;
  } catch (error) {
    console.error('Error fetching game scores:', error);
    throw error;
  }
} 