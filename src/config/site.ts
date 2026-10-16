export const SITE_CONFIG = {
  name: 'Marabout Fabo Babassa',
  brandTitle: 'Grand Marabout Voyant Médium Africain',
  headline: 'Retour Affectif Rapide & Voyance Médium à Paris',
  phoneDisplay: '06 76 19 75 85',
  phoneIntl: '+33 6 76 19 75 85',
  phoneHref: 'tel:+33676197585',
  whatsappNumber: '33676197585',
  siteUrl: 'https://www.marabout-fabo.com',
  location: 'Paris, France',
  addressLocality: 'Paris',
  addressRegion: 'Île-de-France',
  postalCountry: 'FR',
  openingHours: '08:00 - 23:00 (7j/7)',
  metaDescription:
    "Spécialiste du retour affectif rapide et du retour de l'être aimé à Paris et à distance. Marabout Fabo Babassa, grand voyant médium sérieux : couple, fidélité, désenvoûtement. Contact WhatsApp : 06 76 19 75 85.",

  whatsappUrls: {
    general:
      'https://wa.me/33676197585?text=Bonjour%20Marabout%20Fabo%20Babassa%2C%20je%20vous%20contacte%20depuis%20votre%20site%20internet%20car%20j%27ai%20besoin%20d%27une%20consultation%20confidentielle.',
    retourAffectif:
      'https://wa.me/33676197585?text=Bonjour%20Marabout%20Fabo%20Babassa%2C%20je%20souhaite%20votre%20aide%20pour%20un%20retour%20affectif%20rapide%20et%20faire%20revenir%20la%20personne%20que%20j%27aime.',
    rivale:
      'https://wa.me/33676197585?text=Bonjour%20Marabout%20Fabo%20Babassa%2C%20mon%20couple%20est%20en%20crise%20et%20j%27ai%20besoin%20d%27un%20rituel%20pour%20prot%C3%A9ger%20mon%20foyer%20et%20%C3%A9loigner%20les%20mauvaises%20influences.',
    voyance:
      'https://wa.me/33676197585?text=Bonjour%20Marabout%20Fabo%20Babassa%2C%20je%20voudrais%20faire%20une%20consultation%20de%20voyance%20et%20de%20d%C3%A9blocage%20spirituel.',
    desenvoutement:
      'https://wa.me/33676197585?text=Bonjour%20Marabout%20Fabo%20Babassa%2C%20j%27ai%20besoin%20d%27un%20d%C3%A9senvo%C3%BBtement%20puissant%20et%20d%27un%20d%C3%A9blocage%20de%20chance.',
  },

  getWhatsAppLink(customText?: string) {
    if (!customText) return this.whatsappUrls.general;
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(customText)}`;
  },
};
