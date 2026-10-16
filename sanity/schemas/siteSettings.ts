import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Configuration du Site',
  type: 'document',
  fields: [
    defineField({
      name: 'brandTitle',
      title: 'Titre de la marque / Titre du Marabout',
      type: 'string',
      description: 'Nom ou titre honorifique complet (ex: Grand Marabout Voyant Médium Africain)',
      validation: (Rule) => Rule.required(),
      initialValue: 'Grand Marabout Voyant Médium Africain',
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Téléphone (Affichage public)',
      type: 'string',
      description: 'Format affiché aux visiteurs (ex: 06 76 19 75 85)',
      validation: (Rule) => Rule.required(),
      initialValue: '06 76 19 75 85',
    }),
    defineField({
      name: 'phoneIntl',
      title: 'Téléphone (Format International)',
      type: 'string',
      description: 'Format international pour les liens d’appel tel: (ex: +33 6 76 19 75 85)',
      validation: (Rule) => Rule.required(),
      initialValue: '+33 6 76 19 75 85',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Numéro WhatsApp direct',
      type: 'string',
      description: 'Numéro international sans signe + ni espaces (ex: 33676197585)',
      validation: (Rule) =>
        Rule.required()
          .regex(/^[0-9]+$/, { name: 'chiffres uniquement' })
          .error('Veuillez renseigner uniquement des chiffres (ex: 33676197585)'),
      initialValue: '33676197585',
    }),
    defineField({
      name: 'location',
      title: 'Localisation / Ville principale',
      type: 'string',
      description: 'Ville et pays du cabinet (ex: Paris, France)',
      validation: (Rule) => Rule.required(),
      initialValue: 'Paris, France',
    }),
    defineField({
      name: 'address',
      title: 'Adresse ou région du cabinet',
      type: 'string',
      description: 'Adresse physique ou zone géographique (ex: Paris, Île-de-France)',
      initialValue: 'Paris, Île-de-France',
    }),
    defineField({
      name: 'openingHours',
      title: "Horaires d'ouverture / Disponibilité",
      type: 'string',
      description: 'Disponibilité des consultations (ex: 08:00 - 23:00 (7j/7))',
      validation: (Rule) => Rule.required(),
      initialValue: '08:00 - 23:00 (7j/7)',
    }),
    defineField({
      name: 'defaultMetaDescription',
      title: 'Meta Description SEO par défaut',
      type: 'text',
      rows: 3,
      description: 'Description globale pour les moteurs de recherche (120-175 caractères recommandés)',
      validation: (Rule) => Rule.required().min(80).max(220),
      initialValue:
        "Spécialiste du retour affectif rapide et du retour de l'être aimé à Paris et à distance. Marabout Fabo Babassa, grand voyant médium sérieux : couple, fidélité, désenvoûtement. Contact WhatsApp : 06 76 19 75 85.",
    }),
  ],
  preview: {
    select: {
      title: 'brandTitle',
      subtitle: 'location',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Configuration du Site',
        subtitle: subtitle ? `Cabinet : ${subtitle}` : 'Réglages globaux',
      };
    },
  },
});
