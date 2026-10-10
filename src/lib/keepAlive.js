/**
 * Keep-Alive Module for Supabase
 * Prevents the free tier Supabase project from going inactive
 * by making a lightweight query every 30 minutes
 */

import { supabase, isSupabaseConfigured } from './supabase';

// Check every 30 minutes (1800000 ms)
const KEEP_ALIVE_INTERVAL = 30 * 60 * 1000;

/**
 * Performs a lightweight health check query
 * This keeps the Supabase project active
 */
const performHealthCheck = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return;
  }

  try {
    // Query the reviews table (lightest query possible)
    // This is non-intrusive and just checks if the connection works
    await supabase
      .from('reviews')
      .select('id', { count: 'exact', head: true })
      .limit(1);

    console.log('✅ Supabase keep-alive ping successful');
  } catch (error) {
    // Silently fail - this is just a background check
    console.warn('⚠️ Keep-alive check failed:', error.message);
  }
};

/**
 * Initialize the keep-alive mechanism
 * Call this once when the app starts (in App.jsx or main.jsx)
 */
export const initializeKeepAlive = () => {
  if (!isSupabaseConfigured) {
    console.log('ℹ️ Supabase not configured - keep-alive skipped');
    return;
  }

  // Run the first check immediately
  performHealthCheck();

  // Then run every 30 minutes
  setInterval(performHealthCheck, KEEP_ALIVE_INTERVAL);

  console.log('✅ Supabase keep-alive initialized (every 30 minutes)');
};
