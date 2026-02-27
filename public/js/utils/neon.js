import { CONFIG } from '../config/index.js';

async function query(sql, params = []) {
  const response = await fetch(CONFIG.NEON_HTTP_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${CONFIG.NEON_AUTH_HEADER}`,
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

export async function insertWaitlistEntry({ contactType, contactValue, language }) {
  try {
    await query(
      `INSERT INTO waitlist (contact_type, contact_value, language) VALUES ($1, $2, $3)`,
      [contactType, contactValue.trim().toLowerCase(), language]
    );
    return { success: true, duplicate: false };
  } catch (error) {
    if (error.message.includes('23505') || error.message.includes('unique')) {
      return { success: false, duplicate: true };
    }
    throw error;
  }
}

export async function keepAlive() {
  try {
    await query('SELECT 1', []);
    console.log('[Nomada] Neon keep-alive ping sent');
  } catch {
    // Silent fail
  }
}