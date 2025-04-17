# Geddes Hockey Pool

A web application for managing NHL playoff hockey pools, built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- View NHL playoff matchups with team logos
- Make picks for each series including number of games
- View all participants' picks in a dashboard
- Real-time updates using Supabase
- Conference-based organization of matchups
- Modern, responsive UI

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication)
- **Styling**: Tailwind CSS
- **Deployment**: Vercel (planned)

## Development

1. Clone the repository:
```bash
git clone https://github.com/rorygeddes/GeddesHockeyPool.git
cd GeddesHockeyPool
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

## Project Structure

- `/app` - Next.js app router pages and API routes
- `/components` - Reusable React components
- `/lib` - Utility functions and configurations
- `/types` - TypeScript type definitions
- `/supabase` - Supabase configurations and migrations

## Database Schema

The application uses the following main tables:

- `matchups` - Stores playoff matchups
- `picks` - Stores user picks for each matchup

## Contributing

This is a private project for the Geddes family hockey pool.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```