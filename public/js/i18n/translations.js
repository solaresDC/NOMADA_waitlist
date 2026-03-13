/**
 * Nomada Waitlist — Translations
 * English (default), Spanish, Portuguese
 */

export const translations = {
  en: {
    // Hero
    tagline: 'The first Latino party with open bar',
    headline: 'Something different is coming to Toronto.',
    season: 'Spring · 2026',
    scarcity: 'Limited · Subject to availability',
    spots: '300 spots',

    // Waitlist box
    joinWaitlist: 'I Want My Spot',
    joinWithEmail: 'With email',
    or: 'or',
    instagramAccount: 'With Instagram',

    // Input placeholders
    emailPlaceholder: 'your@email.com',
    instagramPlaceholder: '@yourusername',

    // Ghost validation text
    ghostSure: 'Be sure it\'s right',
    ghostInstagram: 'Be sure it\'s right — be ready to receive a message in your inbox from Nomada',

    // Submit button
    submitButton: 'Join The Waitlist',

    // Success modal
    successTitle: 'ARRRRECHO 🔥',
    successLine1: 'You\'re in!',
    successLine2: 'A link is coming your way in the coming days',
    successLine3: 'Tickets before the rest — You asked first',
    successLine4: '',
    successLine5: 'Welcome among the 300',
    successClose: 'See you soon',

    // Errors
    errorEmpty: 'Please enter your email or Instagram handle',
    errorInvalidEmail: 'That doesn\'t look like a valid email',
    errorInvalidInstagram: 'Instagram handles cannot contain @gmail, @hotmail or other email domains',
    errorDuplicate: 'You\'re already on the list! 🎉',
    errorGeneral: 'Something went wrong. Please try again.',

    // Language switcher
    languageLabel: 'EN',

    // Footer
    footer: '© 2026 Nomada. Something is coming.',
  },

  es: {
    // Hero
    tagline: 'La primera fiesta latina con barra libre',
    headline: 'Algo diferente está llegando a Toronto.',
    season: 'Primavera · 2026',
    scarcity: 'Cupo limitado · Sujeto a disponibilidad',
    spots: '300 lugares',

    // Waitlist box
    joinWaitlist: 'Quiero Mi Lugar',
    joinWithEmail: 'Con email',
    or: 'o',
    instagramAccount: 'Con Instagram',

    // Input placeholders
    emailPlaceholder: 'tu@email.com',
    instagramPlaceholder: '@tunombre',

    // Ghost validation text
    ghostSure: 'Asegúrese de que esté bien escrito',
    ghostInstagram: 'Asegúrese de que esté bien — prepárese para recibir un mensaje en su inbox de Nomada',

    // Submit button
    submitButton: 'Únete A La Lista',

    // Success modal
    successTitle: 'ARRRRECHO 🔥',
    successLine1: '¡Estás dentro!',
    successLine2: 'Un link llegará en los próximos días',
    successLine3: 'De los primeros en llegar — De los pocos en entrar',
    successLine4: '',
    successLine5: 'Bienvenido entre los 300',
    successClose: 'Nos vemos pronto',
    errorInvalidEmail: 'Eso no parece un email válido',
    errorInvalidInstagram: 'Los usuarios de Instagram no pueden contener @gmail, @hotmail u otros dominios de email',
    errorDuplicate: '¡Ya estás en la lista! 🎉',
    errorGeneral: 'Algo salió mal. Por favor intenta de nuevo.',

    // Language switcher
    languageLabel: 'ES',

    // Footer
    footer: '© 2026 Nomada. Algo viene.',
  },

  pt: {
    // Hero
    tagline: 'A primeira festa latina com open bar',
    headline: 'Algo diferente está chegando a Toronto.',
    season: 'Primavera · 2026',
    scarcity: 'Vagas limitadas · Sujeito a disponibilidade',
    spots: '300 vagas',

    // Waitlist box
    joinWaitlist: 'Quero Meu Lugar',
    joinWithEmail: 'Com email',
    or: 'ou',
    instagramAccount: 'Com Instagram',

    // Input placeholders
    emailPlaceholder: 'seu@email.com',
    instagramPlaceholder: '@seuusuario',

    // Ghost validation text
    ghostSure: 'Certifique-se de que está correto',
    ghostInstagram: 'Certifique-se de que está correto — esteja pronto para receber uma mensagem no seu inbox do Nomada',

    // Submit button
    submitButton: 'Entrar Na Lista',

    // Success modal
    successTitle: 'ARRRRECHO 🔥',
    successLine1: 'Você entrou!',
    successLine2: 'Um link chegará nos próximos dias',
    successLine3: 'Dos primeiros a chegar — Dos poucos a entrar',
    successLine4: '',
    successLine5: 'Bem-vindo entre os 300',
    successClose: 'Nos vemos em breve',
    errorInvalidEmail: 'Isso não parece um email válido',
    errorInvalidInstagram: 'Usuários do Instagram não podem conter @gmail, @hotmail ou outros domínios de email',
    errorDuplicate: 'Você já está na lista! 🎉',
    errorGeneral: 'Algo deu errado. Por favor tente novamente.',

    // Language switcher
    languageLabel: 'PT',

    // Footer
    footer: '© 2026 Nomada. Algo está chegando.',
  },
};

/**
 * Get a translation string
 * @param {string} lang - 'en' | 'es' | 'pt'
 * @param {string} key - key from translations object
 * @returns {string}
 */
export function t(lang, key) {
  return translations[lang]?.[key] ?? translations['en'][key] ?? key;
}