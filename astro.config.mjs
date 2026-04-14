// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.vigiloncyber.com',
  output: 'static',
  adapter: vercel(),
  integrations: [sitemap()],
  trailingSlash: 'never',
});
