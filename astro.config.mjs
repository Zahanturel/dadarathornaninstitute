import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://dadarathornaninstitute.org',
    integrations: [tailwind()],
    output: 'static',
    redirects: {
          '/help': '/donate',
    },
});
