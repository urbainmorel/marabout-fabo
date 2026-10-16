import fs from 'node:fs';
import path from 'node:path';
import { createClient } from '@sanity/client';
import { BLOG_POSTS } from '../src/data/postsData.js';

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID || 'f7gdk3pr';
const dataset = process.env.PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('❌ SANITY_WRITE_TOKEN manquant dans le fichier .env');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2025-02-01',
  useCdn: false,
});

async function uploadAllImages() {
  console.log(`🚀 Démarrage du téléversement des médias vers Sanity Cloud (${projectId}/${dataset})...`);

  // Cache des assets déjà uploadés par nom de fichier
  const existingAssets = await client.fetch<Array<{ _id: string; originalFilename: string }>>(
    '*[_type == "sanity.imageAsset"] { _id, originalFilename }'
  );
  const assetMap = new Map<string, string>();
  for (const a of existingAssets) {
    if (a.originalFilename) assetMap.set(a.originalFilename, a._id);
  }
  console.log(`ℹ️ ${assetMap.size} asset(s) déjà présent(s) dans Sanity.`);

  // 1. Téléversement et liaison des images principales pour les 20 articles de blog
  console.log('\n📸 1/2 : Téléversement et assignation des images des 20 articles de blog...');
  let linkedCount = 0;

  for (const post of BLOG_POSTS) {
    if (!post.image) continue;

    const relPath = post.image.replace(/^\//, ''); // e.g. "images/marabout-fabo-babassa-retour-affectif-paris.webp"
    const filePath = path.join(process.cwd(), 'public', relPath);
    const filename = path.basename(filePath);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Fichier image introuvable : ${filePath}`);
      continue;
    }

    let assetId = assetMap.get(filename);

    if (!assetId) {
      console.log(`   ⬆️ Téléversement de : ${filename}...`);
      try {
        const stream = fs.createReadStream(filePath);
        const asset = await client.assets.upload('image', stream, {
          filename,
          contentType: filename.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
        });
        assetId = asset._id;
        assetMap.set(filename, assetId);
        console.log(`      ✓ Asset créé : ${assetId}`);
      } catch (err: any) {
        console.error(`      ❌ Erreur téléversement ${filename}:`, err?.message || err);
        continue;
      }
    }

    // Assigner mainImage au post dans Sanity
    try {
      await client
        .patch(`post-${post.slug}`)
        .set({
          mainImage: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: assetId,
            },
            alt: post.imageAlt || post.title,
          },
        })
        .commit();
      linkedCount++;
      console.log(`   ✓ Image liée à l'article : ${post.title.substring(0, 45)}...`);
    } catch (err: any) {
      console.error(`   ❌ Échec liaison article ${post.slug}:`, err?.message || err);
    }
  }

  // 2. Téléversement de l'ensemble des médias du dossier public/images dans la médiathèque globale
  console.log('\n📁 2/2 : Téléversement des autres images du cabinet vers la Médiathèque Sanity...');
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (fs.existsSync(imagesDir)) {
    const files = fs.readdirSync(imagesDir).filter((f) => /\.(webp|png|jpe?g)$/i.test(f));
    let libraryCount = 0;

    for (const file of files) {
      if (assetMap.has(file)) continue; // déjà uploadé

      const fullPath = path.join(imagesDir, file);
      try {
        const stream = fs.createReadStream(fullPath);
        const asset = await client.assets.upload('image', stream, {
          filename: file,
          contentType: file.endsWith('.webp') ? 'image/webp' : 'image/jpeg',
        });
        assetMap.set(file, asset._id);
        libraryCount++;
        console.log(`   ✓ Ajouté à la médiathèque [${libraryCount}] : ${file}`);
      } catch (err: any) {
        console.warn(`   ⚠️ Erreur sur ${file}:`, err?.message || err);
      }
    }
    console.log(`   ✓ ${libraryCount} nouveau(x) fichier(s) ajouté(s) à la médiathèque globale.`);
  }

  console.log('\n🎉 SUCCÈS : Tous les médias sont synchronisés et visibles dans Sanity Studio !');
}

uploadAllImages().catch((e) => {
  console.error('Erreur globale :', e);
  process.exit(1);
});
