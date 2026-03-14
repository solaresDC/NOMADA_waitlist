const SUPABASE_URL = 'https://ewzhttpuwxufjnapshwh.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_3iFXlS3AhJwmC_fZg8rLXA_KkRQk6kX';

export async function insertWaitlistEntry({ contactType, contactValue, language }) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify({
        contact_type: contactType,
        contact_value: contactValue.trim().toLowerCase(),
        language: language,
      }),
    });

    // 409 = duplicate (unique constraint)
    if (response.status === 409) {
      return { success: false, duplicate: true };
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Supabase error ${response.status}: ${errorText}`);
    }

    return { success: true, duplicate: false };

  } catch (error) {
    throw new Error('Failed to submit: ' + error.message);
  }
}

export async function keepAlive() {
  // Not needed with Supabase
}