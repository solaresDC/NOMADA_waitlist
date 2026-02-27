/**
 * Storage utilities — wraps localStorage safely
 */

const LANG_KEY = 'nomada_lang';

export function getLanguage() {
  try {
    return localStorage.getItem(LANG_KEY) || 'en';
  } catch {
    return 'en';
  }
}

export function saveLanguage(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch {
    // Storage unavailable — fail silently
  }
}