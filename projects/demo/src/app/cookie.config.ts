import { CookieConsentOptions } from '@notiz/cookie-monster';

export const cookieConfig: CookieConsentOptions = {
  title: 'Wir verwenden Cookies 🍪',
  message: `Wir verwenden Cookies, um Inhalte zu personalisieren und die Zugriffe auf unsere Website zu analysieren. Mehr Informationen zu den verwendeten Cookies erhalten Sie in unserer Datenschutzerklärung.`,
  links: [
    { label: 'Datenschutzerklärung', url: 'http://localhost.4200/privacy' },
    { label: 'Impressum', url: 'http://localhost.4200/imprint' },
  ],
  acceptAllLabel: 'Alle akzeptieren',
  acceptSelectionLabel: 'Auswahl akzeptieren',
  showMoreLabel: 'Mehr Optionen',
  showLessLabel: 'Weniger anzeigen',
  cookies: {
    necessary: {
      title: 'Notwendige Cookies',
      label:
        'Diese Cookies werden benötigt, damit die Seite korrekt funktioniert.',
      value: true,
      disabled: true,
    },
    functional: {
      title: 'Funktionale Cookies',
      label:
        'Functional cookies make it possible to save information that changes the way the website appears or acts.',
    },
    statistics: {
      title: 'Statistik',
      label:
        'Statistical cookies help the website owner understand how visitors interact with the website by collecting and reporting information.',
    },
    marketing: {
      title: 'Marketing',
      label:
        'Marketing- / Ziel-Cookies werden normalerweise verwendet, um Ihnen Anzeigen anzuzeigen, die Ihren Interessen entsprechen. Wenn Sie eine andere Website besuchen, wird das Cookie Ihres Browsers erkannt und ausgewählte Anzeigen werden Ihnen basierend auf den in diesem Cookie gespeicherten Informationen angezeigt (Art. 6 Abs. 1 S. 1 a) DSGVO).',
    },
  },
};
