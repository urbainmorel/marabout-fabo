import { defineConfig } from 'sanity';
import { structureTool, type StructureBuilder } from 'sanity/structure';
import { media } from 'sanity-plugin-media';
import { schemaTypes } from './sanity/schemas';

const projectId =
  (typeof process !== 'undefined' && process.env?.PUBLIC_SANITY_PROJECT_ID) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_PROJECT_ID) ||
  'f7gdk3pr';

const dataset =
  (typeof process !== 'undefined' && process.env?.PUBLIC_SANITY_DATASET) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_DATASET) ||
  'production';

const SINGLETON_TYPES = new Set(['siteSettings', 'homePage']);

export default defineConfig({
  name: 'default',
  title: 'Marabout Fabo Babassa Studio',

  projectId,
  dataset,

  plugins: [
    media(),
    structureTool({
      structure: (S: StructureBuilder) =>
        S.list()
          .title('Gestion du Cabinet')
          .items([
            // ⚙️ Singleton Configuration du Site
            S.listItem()
              .title('⚙️ Configuration du Site')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
                  .title('Configuration du Site')
              ),

            // 🏠 Singleton Page d'Accueil
            S.listItem()
              .title("🏠 Page d'Accueil")
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePage')
                  .title("Page d'Accueil")
              ),

            S.divider(),

            // 📝 Articles de Blog & 🏷️ Catégories
            S.documentTypeListItem('post').title('📝 Articles de Blog'),
            S.documentTypeListItem('category').title('🏷️ Catégories'),

            S.divider(),

            // ⭐ Avis & Témoignages & ❓ FAQ
            S.documentTypeListItem('testimonial').title('⭐ Avis & Témoignages'),
            S.documentTypeListItem('faqItem').title('❓ Foire Aux Questions'),

            // Filtrer les types personnalisés futurs pour ne jamais exposer les singletons en doublon
            ...S.documentTypeListItems().filter((listItem) => {
              const id = listItem.getId();
              return (
                id !== undefined &&
                !SINGLETON_TYPES.has(id) &&
                !['post', 'category', 'testimonial', 'faqItem'].includes(id)
              );
            }),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Masquer les singletons des templates de création standard pour éviter les doublons
    templates: (templates) =>
      templates.filter(({ schemaType }) => !SINGLETON_TYPES.has(schemaType)),
  },

  document: {
    // Empêcher la création de nouvelles instances de singletons depuis l'action globale "+"
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter(
          (templateItem) => !SINGLETON_TYPES.has(templateItem.templateId)
        );
      }
      return prev;
    },
    // Verrouiller la suppression, dépublication et duplication sur les singletons
    actions: (prev, { schemaType }) => {
      if (SINGLETON_TYPES.has(schemaType)) {
        return prev.filter(
          ({ action }) => action !== 'duplicate' && action !== 'unpublish' && action !== 'delete'
        );
      }
      return prev;
    },
  },
});
