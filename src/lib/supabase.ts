import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type for subscriber
export interface Subscriber {
    id?: string
    email: string
    subscribed_at?: string
    source?: string
    gclid?: string
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    status?: string
}
