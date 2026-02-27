/**
 * Nomada Waitlist — Configuration
 * Neon HTTP API connection (browser-safe write-only role)
 */

export const CONFIG = {

  
  // Supported languages
  SUPPORTED_LANGUAGES: ['en', 'es', 'pt'],
  DEFAULT_LANGUAGE: 'en',
  
  // Keep-alive cron interval in milliseconds (5 minutes)
  KEEPALIVE_INTERVAL_MS: 5 * 60 * 1000,
  
  // Party details (used in copy)
  PARTY_MONTH: 'March',
  MAX_CAPACITY: 300,
};