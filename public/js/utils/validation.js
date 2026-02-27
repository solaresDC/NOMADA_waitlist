/**
 * Input validation utilities
 */

// ✅ Defined at the top so ALL functions can use it
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL_DOMAIN_REGEX = /@(gmail|hotmail|yahoo|outlook|icloud|live|msn|aol)\./i;

/**
 * Detect whether input looks like an email or Instagram handle
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
 */
export function validateEmail(value) {
  const trimmed = value.trim();
  if (!trimmed || !EMAIL_REGEX.test(trimmed)) {
    return { valid: false, error: 'invalidEmail' };
  }
  return { valid: true };
}

/**
 * Validate Instagram handle
 */
export function validateInstagram(value) {
  const trimmed = value.trim().replace(/^@/, '');
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
 */
export function normalizeInstagram(value) {
  const trimmed = value.trim();
  return trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
}