-- First, delete existing data
DELETE FROM public.picks;
DELETE FROM public.matchups;

-- Insert fresh matchups
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