import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

export default defineConfig({
    site: 'https://www.oralequip.com',
    integrations: [react(), sitemap()],
    vite: {
        plugins: [tailwindcss()],
    },
    output: 'static',
    adapter: vercel(),
    image: {
        domains: ['images.unsplash.com'],
    },
});
