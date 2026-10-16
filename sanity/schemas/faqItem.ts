import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'faqItem',
  title: 'Foire Aux Questions',
  type: 'document',
  orderings: [
    {
      title: "Ordre d'affichage croissant",
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  fields: [
    defineField({
      name: 'question',
      title: 'Question posée',
      type: 'string',
      description: 'Ex: En combien de temps agit un rituel de retour affectif ?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Réponse détaillée',
      type: 'text',
      rows: 4,
      description: 'Réponse claire, rassurante et explicative pour le consultant',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: "Ordre d'affichage (Position)",
      type: 'number',
      description: 'Numéro de position pour organiser l’ordre dans la page (ex: 1, 2, 3...)',
      validation: (Rule) => Rule.required().integer().positive(),
      initialValue: 1,
    }),
    defineField({
      name: 'category',
      title: 'Catégorie de la question',
      type: 'string',
      options: {
        list: [
          { title: 'Général', value: 'Général' },
          { title: 'Retour Affectif', value: 'Retour Affectif' },
          { title: 'Voyance', value: 'Voyance' },
          { title: 'Déroulement', value: 'Déroulement' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'Général',
    }),
  ],
  preview: {
    select: {
      question: 'question',
      category: 'category',
      order: 'order',
    },
    prepare({ question, category, order }) {
      return {
        title: typeof order === 'number' ? `#${order} - ${question || 'Question'}` : question || 'Question',
        subtitle: category ? `Catégorie : ${category}` : 'FAQ',
      };
    },
  },
});
