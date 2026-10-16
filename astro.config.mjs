import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import sanity from '@sanity/astro';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const projectId = env.PUBLIC_SANITY_PROJECT_ID || process.env.PUBLIC_SANITY_PROJECT_ID || 'f7gdk3pr';
const dataset = env.PUBLIC_SANITY_DATASET || process.env.PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  site: 'https://www.marabout-fabo.com',
  output: 'static',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
  integrations: [
    react(),
    tailwind(),
    sitemap(),
    sanity({
      projectId,
      dataset,
      useCdn: false,
      apiVersion: '2025-02-01',
      studioBasePath: '/studio',
    }),
  ],
});
