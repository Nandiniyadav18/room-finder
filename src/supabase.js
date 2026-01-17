
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.https://hztwiucwdizxonzoketx.supabase.co
const supabaseAnonKey = import.meta.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6dHdpdWN3ZGl6eG9uem9rZXR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzODkzODgsImV4cCI6MjA4Mzk2NTM4OH0.jCgg0jDjqm627-5lEWyCWIzV2pz4L-QiRbYuC9VGdmU

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
