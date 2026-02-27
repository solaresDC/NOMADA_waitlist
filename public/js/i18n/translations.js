/**
 * Nomada Waitlist — Translations
 * English (default), Spanish, Portuguese
 */

export const translations = {
  en: {
    // Hero
    tagline: 'The first Latino party with open bar',
    headline: 'Think you ready to bring good old LATAM cover parties just like back home?',
    
    // Waitlist box
    joinWaitlist: 'Join waitlist',
    joinWithEmail: 'Join with email',
    or: 'or',
    instagramAccount: 'Instagram account',
    
    // Input placeholders
    emailPlaceholder: 'your@email.com',
    instagramPlaceholder: '@yourusername',
    
    // Ghost validation text
    ghostSure: 'Be sure it is right',
    ghostInstagram: 'Be sure it is right — and be ready to receive a follow request from @nomada, or set your account to public',
    
    // Submit button
    submitButton: 'Count me in',
    
    // Success popup
    successTitle: 'ARRRRECHO 🔥',
    successMessage: "You're in. We'll send you a link in March to get your ticket before anyone else. Only 300 spots — no venue, no time yet, but trust us: it's happening. Exclusive. Mysterious. Unforgettable. Details coming when it's time.",
    successClose: 'Close',
    
    // Errors
    errorEmpty: 'Please enter your email or Instagram handle',
    errorInvalidEmail: 'That doesn\'t look like a valid email',
    errorInvalidInstagram: 'Instagram handles cannot contain @gmail, @hotmail or other email domains',
    errorDuplicate: 'You\'re already on the list! 🎉',
    errorGeneral: 'Something went wrong. Please try again.',
    
    // Language switcher
    languageLabel: 'EN',
    
    // Footer
    footer: '© 2025 Nomada. Something is coming.',
  },
  
  es: {
    tagline: 'La primera fiesta latina con barra libre',
    headline: '¿Crees que estás listo para revivir las fiestas de LATAM como las de antes?',
    
    joinWaitlist: 'Únete a la lista',
    joinWithEmail: 'Únete con email',
    or: 'o',
    instagramAccount: 'Cuenta de Instagram',
    
    emailPlaceholder: 'tu@email.com',
    instagramPlaceholder: '@tunombre',
    
    ghostSure: 'Asegúrate de que esté bien escrito',
    ghostInstagram: 'Asegúrate de que esté bien — y prepárate para recibir una solicitud de seguimiento de @nomada, o pon tu cuenta en público',
    
    submitButton: 'Cuéntenme',
    
    successTitle: 'ARRRRECHO 🔥',
    successMessage: 'Ya estás adentro. En marzo te mandaremos el link para conseguir tu ticket antes que nadie. Solo 300 cupos — sin venue ni hora aún, pero confía: va a pasar. Exclusivo. Misterioso. Inolvidable. Los detalles llegarán a su tiempo.',
    successClose: 'Cerrar',
    
    errorEmpty: 'Por favor ingresa tu email o usuario de Instagram',
    errorInvalidEmail: 'Eso no parece un email válido',
    errorInvalidInstagram: 'Los usuarios de Instagram no pueden contener @gmail, @hotmail u otros dominios de email',
    errorDuplicate: '¡Ya estás en la lista! 🎉',
    errorGeneral: 'Algo salió mal. Por favor intenta de nuevo.',
    
    languageLabel: 'ES',
    
    footer: '© 2025 Nomada. Algo viene.',
  },
  
  pt: {
    tagline: 'A primeira festa latina com open bar',
    headline: 'Acha que está pronto para reviver as festas da LATAM do jeito que eram em casa?',
    
    joinWaitlist: 'Entrar na lista',
    joinWithEmail: 'Entrar com email',
    or: 'ou',
    instagramAccount: 'Conta do Instagram',
    
    emailPlaceholder: 'seu@email.com',
    instagramPlaceholder: '@seuusuario',
    
    ghostSure: 'Verifique se está correto',
    ghostInstagram: 'Verifique se está correto — e esteja pronto para receber uma solicitação de @nomada, ou deixe sua conta pública',
    
    submitButton: 'Conta comigo',
    
    successTitle: 'ARRRRECHO 🔥',
    successMessage: 'Você está dentro. Em março te mandaremos o link para pegar seu ingresso antes de todo mundo. Apenas 300 vagas — sem local ou horário ainda, mas confie: vai acontecer. Exclusivo. Misterioso. Inesquecível. Os detalhes chegarão no momento certo.',
    successClose: 'Fechar',
    
    errorEmpty: 'Por favor insira seu email ou usuário do Instagram',
    errorInvalidEmail: 'Isso não parece um email válido',
    errorInvalidInstagram: 'Usuários do Instagram não podem conter @gmail, @hotmail ou outros domínios de email',
    errorDuplicate: 'Você já está na lista! 🎉',
    errorGeneral: 'Algo deu errado. Por favor tente novamente.',
    
    languageLabel: 'PT',
    
    footer: '© 2025 Nomada. Algo está chegando.',
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