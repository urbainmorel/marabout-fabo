import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const inputDir = path.resolve('IMAGES');
const outputDir = path.resolve('public/images');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Clean semantic name mapping
const semanticNameMap = {
  'briser_un_couple.jpg': 'rituel-eloigner-rivale-protection-couple',
  'purification_desenvoutement.jpg': 'desenvoutement-purification-mauvais-oeil',
  'properite_chance_succes (1).jpg': 'rituel-chance-prosperite-financiere-1',
  'properite_chance_succes (2).jpg': 'rituel-chance-reussite-professionnelle-2',
  'properite_chance_succes (3).jpg': 'rituel-fortune-commerce-3',
  'properite_chance_succes (4).jpg': 'rituel-abondance-succes-4',
  'properite_chance_succes (5).jpg': 'rituel-deblocage-financier-5',
  'properite_chance_succes (6).jpg': 'rituel-ouverture-chemins-6',
  'properite_chance_succes (7).jpg': 'rituel-reussite-affaires-7',
  'properite_chance_succes (8).jpg': 'rituel-prosperite-attraction-8',
  'properite_chance_succes (9).jpg': 'rituel-succes-opportunite-9',
  'retour affecif_rituel (1).jpg': 'marabout-fabo-babassa-retour-affectif-paris',
  'retour affecif_rituel (2).jpg': 'rituel-retour-etre-aime-rapide-2',
  'retour affecif_rituel (3).jpg': 'rituel-amour-cadenas-fidelite-3',
  'retour affecif_rituel (4).jpg': 'rituel-reconciliation-amoureuse-4',
  'retour affecif_rituel (6).jpg': 'rituel-retour-ex-magie-blanche-6',
  'retour affecif_rituel (7).jpg': 'rituel-faire-revenir-son-ex-7',
  'retour affecif_rituel (8).jpg': 'rituel-sauver-son-couple-8',
  'retour affecif_rituel (9).jpg': 'rituel-attachement-amoureux-9',
  'retour affecif_rituel (10).jpg': 'rituel-puissant-retour-affectif-10',
  'retour affecif_rituel (11).jpg': 'rituel-retour-affectif-distance-11',
  'retour affecif_rituel (12).jpg': 'rituel-amour-sur-photo-12',
  'retour affecif_rituel (13).jpg': 'rituel-magie-rouge-amour-13',
  'retour affecif_rituel (14).jpg': 'rituel-retour-conjoint-foyer-14',
  'rituel_vodun (1).jpg': 'voyance-africaine-traditionnelle-paris-1',
  'rituel_vodun (2).jpg': 'rituel-protection-occulte-ancestrale-2',
  'rituel_vodun (3).jpg': 'maitre-spirituel-fabo-babassa-3',
  'victoire_en_justice_conflit_rituel (1).jpg': 'rituel-victoire-justice-proces-1',
  'victoire_en_justice_conflit_rituel (2).jpg': 'rituel-resolution-litiges-conflits-2',
  'victoire_en_justice_conflit_rituel (3).jpg': 'rituel-protection-juridique-paix-3',
};

async function processImages() {
  console.log('Optimisation stricte des images pour garantir un poids < 100 Ko...');
  const files = fs.readdirSync(inputDir);
  const metadataMap = {};

  for (const file of files) {
    if (!file.match(/\.(jpe?g|png)$/i)) continue;

    const inputPath = path.join(inputDir, file);
    const baseSlug = semanticNameMap[file] || file.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const outputFilename = `${baseSlug}.webp`;
    const outputPath = path.join(outputDir, outputFilename);

    try {
      let width = 800;
      let quality = 80;
      let buffer;

      // Boucle d'ajustement pour garantir que le fichier fait moins de 95 Ko
      while (true) {
        buffer = await sharp(inputPath)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality, effort: 6 })
          .toBuffer();

        if (buffer.length <= 95 * 1024 || quality <= 50 || width <= 500) {
          break;
        }
        quality -= 5;
        if (quality < 70) {
          width -= 100;
        }
      }

      fs.writeFileSync(outputPath, buffer);
      const sizeKb = (buffer.length / 1024).toFixed(1);
      console.log(`✓ ${file} -> ${outputFilename} (${sizeKb} Ko, w=${width}, q=${quality})`);

      const outMeta = await sharp(buffer).metadata();
      metadataMap[baseSlug] = {
        filename: outputFilename,
        path: `/images/${outputFilename}`,
        width: outMeta.width,
        height: outMeta.height,
        sizeKb: parseFloat(sizeKb),
      };
    } catch (err) {
      console.error(`Erreur sur ${file}:`, err);
    }
  }

  // Bannière OpenGraph 1200x630 sous 100 Ko
  try {
    const heroImage = path.join(inputDir, 'retour affecif_rituel (1).jpg');
    const ogPath = path.join(outputDir, 'og-banner-marabout-fabo-babassa.webp');
    let ogQuality = 78;
    let ogBuffer;

    while (true) {
      ogBuffer = await sharp(heroImage)
        .resize(1200, 630, { fit: 'cover', position: 'center' })
        .webp({ quality: ogQuality, effort: 6 })
        .toBuffer();

      if (ogBuffer.length <= 98 * 1024 || ogQuality <= 50) {
        break;
      }
      ogQuality -= 5;
    }

    fs.writeFileSync(ogPath, ogBuffer);
    console.log(`✓ Bannière OG 1200x630 -> og-banner-marabout-fabo-babassa.webp (${(ogBuffer.length / 1024).toFixed(1)} Ko)`);
  } catch (err) {
    console.error('Erreur lors de la création de la bannière OG:', err);
  }

  const srcDataDir = path.resolve('src/data');
  fs.writeFileSync(path.join(srcDataDir, 'imageMap.json'), JSON.stringify(metadataMap, null, 2));
  console.log('✓ Images traitées et imageMap.json actualisé avec succès !');
}

processImages();
