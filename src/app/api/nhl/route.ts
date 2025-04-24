import { NextResponse } from 'next/server';

async function fetchNHLData() {
  try {
    const response = await fetch('https://api-web.nhle.com/v1/standings/now');
    if (!response.ok) {
      throw new Error('Failed to fetch NHL data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching NHL data:', error);
    throw error;
  }
}

async function fetchPlayoffData() {
  try {
    const response = await fetch('https://api-web.nhle.com/v1/tournaments/playoffs');
    if (!response.ok) {
      throw new Error('Failed to fetch playoff data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching playoff data:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const [standings, playoffs] = await Promise.all([
      fetchNHLData(),
      fetchPlayoffData()
    ]);

    return NextResponse.json({
      standings,
      playoffs
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 