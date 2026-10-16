import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Article de Blog SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre H1 de l’article',
      type: 'string',
      validation: (Rule) => Rule.required().max(85),
    }),
    defineField({
      name: 'slug',
      title: 'Slug URL (ex: retour-affectif-rapide-comment-ca-marche)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title SEO (< 75 caractères)',
      type: 'string',
      validation: (Rule) => Rule.required().max(75),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description SEO (130-170 caractères)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().min(120).max(175),
    }),
    defineField({
      name: 'focusKeyword',
      title: 'Mot-clé principal ciblé',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      options: {
        list: [
          { title: 'Retour Affectif & Amour', value: 'retour-affectif' },
          { title: 'Voyance & Médiumnité', value: 'voyance-medium' },
          { title: 'Désenvoûtement, Protection & Chance', value: 'protection-chance' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Extrait d’accroche (Affiché sur les cartes du blog)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(250),
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale (WebP avec texte ALT SEO)',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif (ALT SEO)',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'whatsappCtaText',
      title: 'Message WhatsApp pré-rempli spécifique à cet article',
      type: 'string',
      initialValue: 'Bonjour Marabout Fabo Babassa, je viens de lire votre article et j’aimerais votre aide pour ma situation...',
    }),
    defineField({
      name: 'body',
      title: 'Contenu de l’article (Portable Text)',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
    }),
  ],
});
