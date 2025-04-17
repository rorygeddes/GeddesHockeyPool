import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tsnplafhddbeqbqlhywv.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzbnBsYWZoZGRiZXFicWxoeXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzQ3NTQsImV4cCI6MjA2MDQxMDc1NH0.Bf4OMhU-O4w4zcMUWkqOZMJzmSgEa_RAHmPhf2wmSlA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 