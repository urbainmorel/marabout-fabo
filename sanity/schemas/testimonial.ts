import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Avis & Témoignages',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Nom ou Initiales du client',
      type: 'string',
      description: 'Ex: Céline M., Marc D., Fatou S.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Localisation / Ville',
      type: 'string',
      description: 'Ex: Paris 15e, Lyon, Marseille, Bordeaux, Bruxelles',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Note sur 5',
      type: 'number',
      description: 'Note attribuée (de 1 à 5 étoiles)',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: 'text',
      title: 'Contenu du témoignage',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'serviceType',
      title: 'Type de prestation concernée',
      type: 'string',
      options: {
        list: [
          { title: 'Retour Affectif', value: 'Retour Affectif' },
          { title: 'Voyance & Médiumnité', value: 'Voyance & Médiumnité' },
          { title: 'Désenvoûtement & Protection', value: 'Désenvoûtement & Protection' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date du témoignage',
      type: 'string',
      description: 'Format affiché (ex: 14 Janvier 2026 ou Janvier 2026)',
      validation: (Rule) => Rule.required(),
      initialValue: () => {
        const months = [
          'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
          'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        const now = new Date();
        return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
      },
    }),
    defineField({
      name: 'verified',
      title: 'Avis client vérifié',
      type: 'boolean',
      description: 'Cocher pour afficher le badge "Avis Vérifié WhatsApp"',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      author: 'author',
      location: 'location',
      rating: 'rating',
      serviceType: 'serviceType',
    },
    prepare({ author, location, rating, serviceType }) {
      const stars = typeof rating === 'number' ? '⭐'.repeat(Math.max(1, Math.min(5, rating))) : '';
      return {
        title: `${author || 'Client'} ${stars ? `(${stars})` : ''}`,
        subtitle: [serviceType, location].filter(Boolean).join(' • '),
      };
    },
  },
});
