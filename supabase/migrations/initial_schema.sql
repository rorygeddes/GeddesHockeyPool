-- Create teams enum type
create type team_id as enum (
  'toronto', 'ottawa', 'tampabay', 'florida',
  'washington', 'montreal', 'carolina', 'newjersey',
  'winnipeg', 'stlouis', 'dallas', 'colorado',
  'vegas', 'minnesota', 'losangeles', 'edmonton'
);

-- Create matchups table
create table public.matchups (
  id uuid default uuid_generate_v4() primary key,
  home_team_id team_id not null,
  away_team_id team_id not null,
  round integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create picks table
create table public.picks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  matchup_id uuid references public.matchups not null,
  selected_team_id team_id not null,
  games integer not null check (games between 4 and 7),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, matchup_id)
);

-- Insert initial matchups
insert into public.matchups (home_team_id, away_team_id, round)
values
  ('toronto', 'ottawa', 1),
  ('tampabay', 'florida', 1),
  ('washington', 'montreal', 1),
  ('carolina', 'newjersey', 1),
  ('winnipeg', 'stlouis', 1),
  ('dallas', 'colorado', 1),
  ('vegas', 'minnesota', 1),
  ('losangeles', 'edmonton', 1);

-- Set up row level security
alter table public.matchups enable row level security;
alter table public.picks enable row level security;

-- Matchups policies
create policy "Matchups are viewable by everyone"
  on public.matchups for select
  using (true);

-- Picks policies
create policy "Users can insert their own picks"
  on public.picks for insert
  with check (auth.uid() = user_id);

create policy "Users can view all picks"
  on public.picks for select
  using (true);

create policy "Users can update their own picks"
  on public.picks for update
  using (auth.uid() = user_id);

-- Create indexes
create index idx_picks_user_id on public.picks(user_id);
create index idx_picks_matchup_id on public.picks(matchup_id);
create index idx_matchups_round on public.matchups(round); 