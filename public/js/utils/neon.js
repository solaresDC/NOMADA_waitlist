/**
 * Neon HTTP API client
 * Connects directly from the browser using Neon's serverless HTTP API
 */

import { CONFIG } from '../config/index.js';

/**
 * Execute a SQL query against Neon via HTTP API
 * @param {string} sql - SQL query string
 * @param {Array} params - Parameterized query values
 * @returns {Promise<object>} Query result
 */
async function query(sql, params = []) {
  const response = await fetch(CONFIG.NEON_HTTP_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${CONFIG.NEON_AUTH_HEADER}`,
      'Neon-Connection-String': `postgresql://waitlist_writer@${new URL(CONFIG.NEON_HTTP_URL).hostname}/${CONFIG.NEON_DB_NAME}`,
    },
    body: JSON.stringify({
      query: sql,
      params: params,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Neon API error ${response.status}: ${errorText}`);
  }

  return response.json();
}

/**
 * Insert a new waitlist entry
 * @param {object} entry
 * @param {string} entry.contactType - 'email' or 'instagram'
 * @param {string} entry.contactValue - the actual email or handle
 * @param {string} entry.language - 'en', 'es', or 'pt'
 * @returns {Promise<{ success: boolean, duplicate: boolean }>}
 */
export async function insertWaitlistEntry({ contactType, contactValue, language }) {
  try {
    await query(
      `INSERT INTO waitlist (contact_type, contact_value, language) VALUES ($1, $2, $3)`,
      [contactType, contactValue.trim().toLowerCase(), language]
    );
    return { success: true, duplicate: false };
  } catch (error) {
    // PostgreSQL unique violation error code
    if (error.message.includes('23505') || error.message.includes('unique')) {
      return { success: false, duplicate: true };
    }
    throw error;
  }
}

/**
 * Keep-alive ping — runs a cheap query to prevent Neon from sleeping
 * @returns {Promise<void>}
 */
export async function keepAlive() {
  try {
    await query('SELECT 1', []);
    console.log('[Nomada] Neon keep-alive ping sent');
  } catch {
    // Silent fail — not critical
  }
}