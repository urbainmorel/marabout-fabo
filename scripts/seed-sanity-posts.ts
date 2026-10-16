import { createClient } from '@sanity/client';
import { BLOG_POSTS } from '../src/data/postsData.js';

const projectId = process.env.SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.log(`
ℹ️ Information de Configuration Sanity :
Pour injecter les 20 articles directement dans votre projet Sanity Cloud :
1. Créez un projet sur https://www.sanity.io/
2. Définissez vos variables dans le fichier .env :
   SANITY_PROJECT_ID="votre_project_id"
   SANITY_DATASET="production"
   SANITY_WRITE_TOKEN="votre_token_avec_droits_d_ecriture"
3. Relancez la commande : npm run seed-sanity

Note : Le site web fonctionne déjà parfaitement grâce aux données enrichies intégrées dans src/data/postsData.ts !
`);
  process.exit(0);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-02-01',
  useCdn: false,
});

async function seedPosts() {
  console.log(`🚀 Début de l'injection des 20 articles dans Sanity (${projectId}/${dataset})...`);

  for (const post of BLOG_POSTS) {
    const doc = {
      _id: `post-${post.slug}`,
      _type: 'post',
      title: post.title,
      slug: {
        _type: 'slug',
        current: post.slug,
      },
      metaTitle: post.metaTitle,
      metaDescription: post.metaDescription,
      focusKeyword: post.focusKeyword,
      category: post.category,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      whatsappCtaText: post.whatsappCtaText,
      body: [
        {
          _key: 'b1',
          _type: 'block',
          children: [
            {
              _key: 's1',
              _type: 'span',
              text: post.content.replace(/##\s/g, '').replace(/>\s/g, ''),
            },
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
    };

    try {
      await client.createOrReplace(doc);
      console.log(`✓ Article injecté : ${post.title}`);
    } catch (err) {
      console.error(`✗ Erreur sur ${post.slug} :`, err);
    }
  }

  console.log('🎉 Cocon sémantique de 20 articles injecté avec succès dans Sanity CMS !');
}

seedPosts();
