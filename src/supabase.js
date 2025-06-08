import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bzsuoxgqjoknxkdxsqgr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6c3VveGdxam9rbnhrZHhzcWdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NTgxNTMsImV4cCI6MjA2MTIzNDE1M30.yjrvoWOXw2dUCqS1dDzejt44VJeiBy4_h_J-djwIf_A'

export const supabase = createClient(supabaseUrl, supabaseKey) 