import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.NEXT_SUPABASE_URL ?? "https://nkptjnpkjiavarhbrjes.supabase.co"
const supabaseAnonKey = import.meta.env.NEXT_SUPABASE_ANON_KEY ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rcHRqbnBramlhdmFyaGJyamVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMxODE4NjYsImV4cCI6MTk4ODc1Nzg2Nn0.CBKKQHhiG--E-16VwrODvTHdleyNiqzVdVCPk94TXik"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)