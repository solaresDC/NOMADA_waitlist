/**
 * Input validation utilities
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_DOMAIN_REGEX = /@(gmail|hotmail|yahoo|outlook|icloud|live|msn|aol)\./i;

/**
 * Detect whether input looks like an email or Instagram handle
 * @param {string} value
 * @returns {'email' | 'instagram' | 'unknown'}
 */
export function detectInputType(value) {
  const trimmed = value.trim();
  if (trimmed.includes('@') && trimmed.includes('.') && EMAIL_REGEX.test(trimmed)) {
    return 'email';
  }
  if (trimmed.startsWith('@') || (!trimmed.includes('@') && !trimmed.includes('.'))) {
    return 'instagram';
  }
  return 'unknown';
}

/**
 * Validate email format
 * @param {string} value
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateEmail(value) {
  const trimmed = value.trim();
  if (!EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: 'invalidEmail' };
  }
  return { valid: true };
}

/**
 * Validate Instagram handle
 * Rejects anything that looks like an email domain (gmail, hotmail etc)
 * @param {string} value
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateInstagram(value) {
  const trimmed = value.trim().replace(/^@/, '');
  // If it has an @ inside it's being typed as email-style but without a dot — check for email domains
  if (EMAIL_DOMAIN_REGEX.test('@' + trimmed)) {
    return { valid: false, error: 'invalidInstagram' };
  }
  if (trimmed.length < 1) {
    return { valid: false, error: 'empty' };
  }
  return { valid: true };
}

/**
 * Normalize Instagram handle — ensures it starts with @
 * @param {string} value
 * @returns {string}
 */
export function normalizeInstagram(value) {
  const trimmed = value.trim();
  return trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
}