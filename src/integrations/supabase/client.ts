import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xiqtrxvjhbaptujwmwlh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpcXRyeHZqaGJhcHR1andtd2xoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwNzg1OTYsImV4cCI6MjA4NDY1NDU5Nn0.4GGv27u6WJOe7mnwr84H7uHW5Lpzi_Xtv42OmQfbnDc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
