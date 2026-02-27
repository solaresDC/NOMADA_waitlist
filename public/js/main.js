/**
 * Nomada Waitlist — Main Entry Point
 */

import { CONFIG } from './config/index.js';
import { t } from './i18n/translations.js';
import { getLanguage, saveLanguage } from './utils/storage.js';
import { detectInputType, validateEmail, validateInstagram, normalizeInstagram } from './utils/validation.js';
import { insertWaitlistEntry, keepAlive } from './utils/neon.js';

// ── State ──────────────────────────────────────────
let lang = getLanguage();
if (!CONFIG.SUPPORTED_LANGUAGES.includes(lang)) lang = CONFIG.DEFAULT_LANGUAGE;

// ── DOM references ─────────────────────────────────
const langBtn        = document.getElementById('lang-btn');
const langBtnLabel   = document.getElementById('lang-btn-label');
const langDropdown   = document.getElementById('lang-dropdown');
const langOptions    = document.querySelectorAll('.lang-option');

const emailInput     = document.getElementById('email-input');
const emailGhost     = document.getElementById('email-ghost');
const emailError     = document.getElementById('email-error');

const instaInput     = document.getElementById('insta-input');
const instaGhost     = document.getElementById('insta-ghost');
const instaError     = document.getElementById('insta-error');

const submitBtn      = document.getElementById('submit-btn');

const modalOverlay   = document.getElementById('modal-overlay');
const modalTitle     = document.getElementById('modal-title');
const modalMessage   = document.getElementById('modal-message');
const modalCloseBtn  = document.getElementById('modal-close-btn');

// Text nodes that need translation
const translatableEls = document.querySelectorAll('[data-i18n]');

// ── Render ─────────────────────────────────────────
function applyTranslations() {
  translatableEls.forEach(el => {
    const key = el.dataset.i18n;
    el.textContent = t(lang, key);
  });
  langBtnLabel.textContent = t(lang, 'languageLabel');
  document.documentElement.lang = lang;
}

// Mark active lang option
function updateActiveLangOption() {
  langOptions.forEach(opt => {
    opt.classList.toggle('is-active', opt.dataset.lang === lang);
  });
}

applyTranslations();
updateActiveLangOption();

// ── Language Switcher ──────────────────────────────
function toggleDropdown(open) {
  langDropdown.classList.toggle('is-open', open);
  langBtn.setAttribute('aria-expanded', String(open));
}

langBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isOpen = langDropdown.classList.contains('is-open');
  toggleDropdown(!isOpen);
});

langOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    lang = opt.dataset.lang;
    saveLanguage(lang);
    applyTranslations();
    updateActiveLangOption();
    toggleDropdown(false);
    // Clear any visible errors when switching language
    clearErrors();
  });
});

document.addEventListener('click', () => toggleDropdown(false));

// ── Input ghost hints ──────────────────────────────
emailInput.addEventListener('input', () => {
  const val = emailInput.value;
  const show = val.length > 0;
  emailGhost.textContent = t(lang, 'ghostSure');
  emailGhost.classList.toggle('is-visible', show);
  emailError.textContent = '';
  emailInput.classList.remove('has-error');
});

instaInput.addEventListener('input', () => {
  const val = instaInput.value;
  const show = val.length > 0;
  instaGhost.textContent = t(lang, 'ghostInstagram');
  instaGhost.classList.toggle('is-visible', show);
  instaError.textContent = '';
  instaInput.classList.remove('has-error');
});

// ── Validation helpers ─────────────────────────────
function clearErrors() {
  emailError.textContent = '';
  instaError.textContent = '';
  emailInput.classList.remove('has-error');
  instaInput.classList.remove('has-error');
}

function showEmailError(msgKey) {
  emailError.textContent = t(lang, msgKey);
  emailInput.classList.add('has-error');
}

function showInstaError(msgKey) {
  instaError.textContent = t(lang, msgKey);
  instaInput.classList.add('has-error');
}

// ── Form submission ────────────────────────────────
submitBtn.addEventListener('click', async () => {
  clearErrors();

  const emailVal = emailInput.value.trim();
  const instaVal = instaInput.value.trim();

  // Determine which field was filled
  let contactType = null;
  let contactValue = null;

  if (emailVal && instaVal) {
    // Both filled — prefer email but show a note
    showInstaError('errorEmpty'); // simple: ask them to pick one
    return;
  }

  if (!emailVal && !instaVal) {
    showEmailError('errorEmpty');
    return;
  }

  if (emailVal) {
    const result = validateEmail(emailVal);
    if (!result.valid) {
      showEmailError('errorInvalidEmail');
      return;
    }
    contactType = 'email';
    contactValue = emailVal;
  } else {
    const result = validateInstagram(instaVal);
    if (!result.valid) {
      showInstaError(result.error === 'invalidInstagram' ? 'errorInvalidInstagram' : 'errorEmpty');
      return;
    }
    contactType = 'instagram';
    contactValue = normalizeInstagram(instaVal);
  }

  // Disable button while submitting
  submitBtn.disabled = true;
  submitBtn.textContent = '...';

  try {
    const { success, duplicate } = await insertWaitlistEntry({ contactType, contactValue, language: lang });

    if (duplicate) {
      if (contactType === 'email') showEmailError('errorDuplicate');
      else showInstaError('errorDuplicate');
      return;
    }

    if (success) {
      openModal();
    }
  } catch (err) {
    console.error('[Nomada] Submit error:', err);
    if (contactType === 'email') showEmailError('errorGeneral');
    else showInstaError('errorGeneral');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = t(lang, 'submitButton');
  }
});

// ── Modal ──────────────────────────────────────────
function openModal() {
  modalTitle.textContent = t(lang, 'successTitle');
  modalMessage.textContent = t(lang, 'successMessage');
  modalCloseBtn.textContent = t(lang, 'successClose');
  modalOverlay.classList.add('is-open');
  // Reset form
  emailInput.value = '';
  instaInput.value = '';
  emailGhost.classList.remove('is-visible');
  instaGhost.classList.remove('is-visible');
}

modalCloseBtn.addEventListener('click', () => {
  modalOverlay.classList.remove('is-open');
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) modalOverlay.classList.remove('is-open');
});

// ── Neon Keep-Alive Cron ───────────────────────────
// Runs immediately on page load, then every 5 minutes
keepAlive();
setInterval(keepAlive, CONFIG.KEEPALIVE_INTERVAL_MS);