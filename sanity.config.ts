import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const projectId =
  (typeof process !== 'undefined' && process.env?.PUBLIC_SANITY_PROJECT_ID) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_PROJECT_ID) ||
  'f7gdk3pr';

const dataset =
  (typeof process !== 'undefined' && process.env?.PUBLIC_SANITY_DATASET) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_SANITY_DATASET) ||
  'production';

export default defineConfig({
  name: 'default',
  title: 'Marabout Fabo Babassa Studio',

  projectId,
  dataset,

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
