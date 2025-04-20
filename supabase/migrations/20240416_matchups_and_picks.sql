-- First, delete existing matchups (if you want to start fresh)
DELETE FROM public.picks;
DELETE FROM public.matchups;

-- Insert matchups
INSERT INTO public.matchups (id, home_team_id, away_team_id, round)
VALUES 
  ('1e91f1c0-0000-4000-8000-000000000001', 'toronto', 'ottawa', 1),
  ('1e91f1c0-0000-4000-8000-000000000002', 'tampabay', 'florida', 1),
  ('1e91f1c0-0000-4000-8000-000000000003', 'washington', 'montreal', 1),
  ('1e91f1c0-0000-4000-8000-000000000004', 'carolina', 'newjersey', 1),
  ('1e91f1c0-0000-4000-8000-000000000005', 'winnipeg', 'stlouis', 1),
  ('1e91f1c0-0000-4000-8000-000000000006', 'dallas', 'colorado', 1),
  ('1e91f1c0-0000-4000-8000-000000000007', 'vegas', 'minnesota', 1),
  ('1e91f1c0-0000-4000-8000-000000000008', 'losangeles', 'edmonton', 1);

-- Drop the view if it exists
DROP VIEW IF EXISTS public.matchups_with_picks;

-- Create the view
CREATE VIEW public.matchups_with_picks AS
SELECT 
  m.id as matchup_id,
  m.home_team_id,
  m.away_team_id,
  m.round,
  p.id as pick_id,
  p.user_id,
  u.email as user_email,
  p.selected_team_id,
  p.games,
  p.created_at as pick_created_at
FROM public.matchups m
LEFT JOIN public.picks p ON m.id = p.matchup_id
LEFT JOIN auth.users u ON p.user_id = u.id
ORDER BY m.round, m.id, p.created_at; 