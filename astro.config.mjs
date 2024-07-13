import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

import react from "@astrojs/react";

export default defineConfig({
  site: 'https://craddock.org',
  integrations: [mdx(), sitemap(), tailwind(), react(), icon()],
  vite: {
    resolve: {
      alias: {
        '/images': '/images',
      }
    }
  }

});
