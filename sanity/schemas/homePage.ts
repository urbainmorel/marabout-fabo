import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homePage',
  title: "Page d'Accueil",
  type: 'document',
  fieldsets: [
    { name: 'hero', title: '1. Section Hero (Haut de page)', options: { collapsible: true, collapsed: false } },
    { name: 'about', title: '2. Section À Propos & Présentation', options: { collapsible: true, collapsed: false } },
    { name: 'rituals', title: '3. Section Rituels d’Amour & Retour Affectif', options: { collapsible: true, collapsed: true } },
    { name: 'voyance', title: '4. Section Voyance, Protection & Désenvoûtement', options: { collapsible: true, collapsed: true } },
    { name: 'steps', title: '5. Section Déroulement d’une Consultation', options: { collapsible: true, collapsed: true } },
    { name: 'waHub', title: '6. Section Hub Contact WhatsApp', options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    // --- HERO SECTION ---
    defineField({
      name: 'heroBadge',
      title: 'Hero - Badge supérieur',
      type: 'string',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
      initialValue: 'Grand Marabout Voyant Médium Sérieux à Paris & à Distance – 7j/7',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero - Titre H1 principal',
      type: 'string',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
      initialValue: "Retour Affectif Rapide et Retour de l'Être Aimé avec le Marabout Fabo Babassa",
    }),
    defineField({
      name: 'heroLead',
      title: 'Hero - Texte d’introduction (Chapeau)',
      type: 'text',
      rows: 4,
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
      initialValue:
        "Vous souffrez d'une rupture amoureuse ? Votre conjoint(e) s'éloigne, vous a bloqué(e) ou vous a quitté(e) pour une autre personne ? Ne laissez pas le chagrin et le temps détruire votre bonheur. Spécialiste reconnu du retour affectif rapide, des travaux occultes d'amour et de la voyance médiumnique pure à Paris, le Marabout Fabo Babassa met son don héréditaire et ses rituels puissants à votre service pour faire revenir l'être aimé, sauver votre couple et débloquer votre vie.",
    }),
    defineField({
      name: 'heroCtaWaText',
      title: 'Hero - Texte du bouton WhatsApp CTA',
      type: 'string',
      fieldset: 'hero',
      validation: (Rule) => Rule.required(),
      initialValue: 'Exposer ma situation',
    }),

    // --- ABOUT SECTION ---
    defineField({
      name: 'aboutBadge',
      title: 'À Propos - Badge',
      type: 'string',
      fieldset: 'about',
      validation: (Rule) => Rule.required(),
      initialValue: 'À Propos du Marabout Fabo',
    }),
    defineField({
      name: 'aboutTitle',
      title: 'À Propos - Titre H2',
      type: 'string',
      fieldset: 'about',
      validation: (Rule) => Rule.required(),
      initialValue: 'Marabout Fabo Babassa : Un Grand Voyant Médium Sérieux et Honnête à Paris',
    }),
    defineField({
      name: 'aboutText1',
      title: 'À Propos - Paragraphe 1 (Mise en confiance & légitimité)',
      type: 'text',
      rows: 3,
      fieldset: 'about',
      validation: (Rule) => Rule.required(),
      initialValue:
        "Trouver un vrai marabout sérieux et honnête en France est aujourd'hui difficile face aux nombreuses fausses promesses sur internet. Je suis le Marabout Fabo Babassa, grand voyant médium et maître en sciences occultes traditionnelles africaines, installé à Paris.",
    }),
    defineField({
      name: 'aboutText2',
      title: 'À Propos - Paragraphe 2 (Don héréditaire & expertise)',
      type: 'text',
      rows: 3,
      fieldset: 'about',
      validation: (Rule) => Rule.required(),
      initialValue:
        "Issu d'une grande lignée d'initiés et de guérisseurs spirituels, j'exerce mon don de médiumnité et la pratique des rituels sacrés depuis de nombreuses années pour venir en aide aux femmes et aux hommes qui traversent des épreuves sentimentales, familiales ou professionnelles.",
    }),

    // --- RITUALS SECTION ---
    defineField({
      name: 'ritualsTitle',
      title: 'Rituels - Titre H2 de la section',
      type: 'string',
      fieldset: 'rituals',
      validation: (Rule) => Rule.required(),
      initialValue: 'Rituels d’Amour et Travaux Occultes de Haute Puissance',
    }),
    defineField({
      name: 'ritualsSubtitle',
      title: 'Rituels - Sous-titre / Descriptif d’introduction',
      type: 'text',
      rows: 3,
      fieldset: 'rituals',
      validation: (Rule) => Rule.required(),
      initialValue:
        'Découvrez les principaux rituels sacrés pratiqués au cabinet et à distance pour réconcilier les cœurs, sauver les couples et éloigner les rivales.',
    }),

    // --- VOYANCE & PROTECTION SECTION ---
    defineField({
      name: 'voyanceTitle',
      title: 'Voyance - Titre H2 de la section',
      type: 'string',
      fieldset: 'voyance',
      validation: (Rule) => Rule.required(),
      initialValue: 'Voyance Médiumnique, Désenvoûtement et Travaux Occultes',
    }),
    defineField({
      name: 'voyanceSubtitle',
      title: 'Voyance - Sous-titre / Descriptif d’introduction',
      type: 'text',
      rows: 3,
      fieldset: 'voyance',
      validation: (Rule) => Rule.required(),
      initialValue:
        'Au-delà du retour affectif, le Marabout Fabo Babassa vous accompagne à Paris et à distance pour lever tous les blocages invisibles qui freinent votre bonheur.',
    }),

    // --- STEPS SECTION ---
    defineField({
      name: 'stepsTitle',
      title: 'Déroulement - Titre H2 de la section',
      type: 'string',
      fieldset: 'steps',
      validation: (Rule) => Rule.required(),
      initialValue: 'Comment Fonctionne Votre Retour Affectif avec le Marabout Fabo Babassa ?',
    }),
    defineField({
      name: 'stepsSubtitle',
      title: 'Déroulement - Sous-titre / Descriptif d’introduction',
      type: 'text',
      rows: 3,
      fieldset: 'steps',
      validation: (Rule) => Rule.required(),
      initialValue:
        'Un protocole spirituel clair, rigoureux et transparent en 4 étapes pour rétablir l’amour et l’harmonie dans votre vie.',
    }),

    // --- WHATSAPP HUB SECTION ---
    defineField({
      name: 'waHubTitle',
      title: 'Hub WhatsApp - Titre H2 d’incitation',
      type: 'string',
      fieldset: 'waHub',
      validation: (Rule) => Rule.required(),
      initialValue: 'Contactez le Marabout Fabo sur WhatsApp',
    }),
    defineField({
      name: 'waHubSubtitle',
      title: 'Hub WhatsApp - Sous-titre d’incitation',
      type: 'text',
      rows: 3,
      fieldset: 'waHub',
      validation: (Rule) => Rule.required(),
      initialValue: 'Échangez directement et en toute confidentialité pour exposer votre situation sans jugement.',
    }),
  ],
  preview: {
    select: {
      title: 'heroTitle',
    },
    prepare({ title }) {
      return {
        title: "Page d'Accueil",
        subtitle: title || 'Hero, À Propos, Rituels, Voyance, Étapes & WhatsApp',
      };
    },
  },
});
