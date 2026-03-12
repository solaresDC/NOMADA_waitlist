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

  // Update input placeholders
  document.querySelectorAll('[data-placeholder-i18n]').forEach(el => {
    el.placeholder = t(lang, el.dataset.placeholderI18n);
  });

  langBtnLabel.textContent = t(lang, 'languageLabel');
  document.documentElement.lang = lang;

  // FIX: if ghost hints are currently visible, re-render them in the new language immediately
  if (emailGhost.classList.contains('is-visible')) {
    emailGhost.textContent = t(lang, 'ghostSure');
  }
  if (instaGhost.classList.contains('is-visible')) {
    instaGhost.textContent = t(lang, 'ghostInstagram');
  }
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
    clearErrors();
  });
});

document.addEventListener('click', () => toggleDropdown(false));

// ── Instagram @ prefix logic ───────────────────────
// When user focuses the Instagram field, insert @ and keep cursor after it.
// The @ cannot be deleted — enforced on every input and keydown event.

instaInput.addEventListener('focus', () => {
  if (!instaInput.value.startsWith('@')) {
    instaInput.value = '@';
  }
  // Move cursor to end
  const len = instaInput.value.length;
  instaInput.setSelectionRange(len, len);
});

instaInput.addEventListener('keydown', (e) => {
  const val = instaInput.value;
  const cursorPos = instaInput.selectionStart;

  // Block Backspace / Delete if it would remove the @
  if ((e.key === 'Backspace' && cursorPos <= 1 && instaInput.selectionEnd <= 1) ||
      (e.key === 'Delete' && cursorPos === 0)) {
    e.preventDefault();
  }

  // Block selecting all and typing over it (would erase @)
  // Handled by the input listener below as a safety net
});

instaInput.addEventListener('input', () => {
  // Safety net — if @ was somehow removed, restore it
  if (!instaInput.value.startsWith('@')) {
    const restored = '@' + instaInput.value.replace(/^@*/, '');
    instaInput.value = restored;
    // Keep cursor at end
    instaInput.setSelectionRange(restored.length, restored.length);
  }

  const val = instaInput.value;
  const show = val.length > 1; // more than just the @
  instaGhost.textContent = t(lang, 'ghostInstagram');
  instaGhost.classList.toggle('is-visible', show);
  instaError.textContent = '';
  instaInput.classList.remove('has-error');
});

// ── Input ghost hints ──────────────────────────────
emailInput.addEventListener('input', () => {
  const val = emailInput.value;
  const show = val.length > 0;
  emailGhost.textContent = t(lang, 'ghostSure');
  emailGhost.classList.toggle('is-visible', show);
  emailError.textContent = '';
  emailInput.classList.remove('has-error');
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
  // Strip the leading @ before validation since normalizeInstagram adds it back
  const instaRaw = instaInput.value.trim();
  const instaVal = instaRaw === '@' ? '' : instaRaw.replace(/^@/, '');

  let contactType = null;
  let contactValue = null;

  if (emailVal && instaVal) {
    showInstaError('errorEmpty');
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
keepAlive();
setInterval(keepAlive, CONFIG.KEEPALIVE_INTERVAL_MS);