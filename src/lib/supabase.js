import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Supabase client, or null when env vars are missing.
 * Every caller must null-check and fall back gracefully
 * (localStorage demo mode) — never assume this exists.
 */
export const supabase =
  url && anonKey ? createClient(url, anonKey) : null

export const isSupabaseConfigured = Boolean(url && anonKey)
