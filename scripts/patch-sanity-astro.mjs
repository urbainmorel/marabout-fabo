import fs from 'node:fs';
import path from 'node:path';

const filesToPatch = [
  path.join('node_modules', '@sanity', 'astro', 'dist', 'sanity-astro.mjs'),
  path.join('node_modules', '@sanity', 'astro', 'dist', 'sanity-astro.js'),
];

let patchedCount = 0;

for (const filePath of filesToPatch) {
  if (!fs.existsSync(filePath)) continue;

  const content = fs.readFileSync(filePath, 'utf8');
  // Replaces the flawed Unix-only regex with a cross-platform regex matching both / and \
  const patched = content.replace(/\.replace\(\/\\\/package\\\.json\$\/,\s*""\)/g, '.replace(/[\\/\\\\]package\\.json$/, "")');

  if (patched !== content) {
    fs.writeFileSync(filePath, patched, 'utf8');
    patchedCount++;
    console.log(`[patch-sanity-astro] ✓ Corrigé avec succès : ${filePath}`);
  } else if (content.includes('[\\/\\\\]package\\.json$')) {
    console.log(`[patch-sanity-astro] Déjà corrigé : ${filePath}`);
  } else {
    console.warn(`[patch-sanity-astro] Motif non trouvé dans ${filePath}`);
  }
}

console.log(`[patch-sanity-astro] Patch terminé (${patchedCount} fichiers modifiés).`);
