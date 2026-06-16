import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'YOUR_PROJECT_ID';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'technews-cms',
  title: 'TechNews CMS',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: [
      // schemas will be added here
    ],
  },
});
