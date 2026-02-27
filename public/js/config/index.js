/**
 * Nomada Waitlist — Configuration
 * Neon HTTP API connection (browser-safe write-only role)
 */

export const CONFIG = {
  // Neon serverless HTTP endpoint — uses your limited write-only role
  // Format: https://ep-xxxx.region.aws.neon.tech/sql
  // We use Neon's HTTP API instead of a raw connection string
  NEON_HTTP_URL: 'https://ep-orange-mud-aj46zemt-pooler.c-3.us-east-2.aws.neon.tech/sql',
  
  // Base64-encoded "waitlist_writer:your_password" — encodes credentials for Basic Auth header
  // To generate: in browser console run: btoa('waitlist_writer:your_password')
  NEON_AUTH_HEADER: 'd2FpdGxpc3Rfd3JpdGVyOldhaXRMaXN0MiE=',
  
  // Database name (usually neondb unless you changed it)
  NEON_DB_NAME: 'neondb',
  
  // Supported languages
  SUPPORTED_LANGUAGES: ['en', 'es', 'pt'],
  DEFAULT_LANGUAGE: 'en',
  
  // Keep-alive cron interval in milliseconds (5 minutes)
  KEEPALIVE_INTERVAL_MS: 5 * 60 * 1000,
  
  // Party details (used in copy)
  PARTY_MONTH: 'March',
  MAX_CAPACITY: 300,
};