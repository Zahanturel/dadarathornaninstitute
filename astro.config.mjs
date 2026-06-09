import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://zahanturel.github.io',
  base: '/dadarathornaninstitute',
  integrations: [tailwind()],
  output: 'static',
});
