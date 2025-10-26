// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: "https://ernesto.solathomas.com",
  base: "/",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [
    mdx(),
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          es: 'es'
        }
      },
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    }),
    react()
  ]
});