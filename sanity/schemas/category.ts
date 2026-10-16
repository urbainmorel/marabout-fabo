import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'category',
  title: 'Catégorie de Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la catégorie',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description SEO',
      type: 'text',
      rows: 3,
    }),
  ],
});
