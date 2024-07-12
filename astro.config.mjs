import { defineConfig } from 'astro/config';
import storyblok from '@storyblok/astro';
import { loadEnv } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';

const env = loadEnv('', process.cwd(), 'STORYBLOK');


// https://astro.build/config
export default defineConfig({
  ...(env.STORYBLOK_ENV === 'development' && {
    vite: {
      plugins: [basicSsl()],
      server: {
        https: true
      }
    }
  }),
  integrations: [storyblok({
    accessToken: env.STORYBLOK_TOKEN,
    bridge: env.STORYBLOK_IS_PREVIEW === 'yes',
    components: {
      page: 'storyblok/Page',
      feature: 'storyblok/Feature',
      grid: 'storyblok/Grid',
      teaser: 'storyblok/Teaser',
      config: 'storyblok/Config',
      hero: 'storyblok/Hero',
      'popular-articles': 'storyblok/PopularArticles',
      'all-articles': 'storyblok/AllArticles',
      article: 'storyblok/Article'
    }
  }), tailwind()],
  output: env.STORYBLOK_IS_PREVIEW === 'yes' ? 'server' : 'static',
  adapter: vercel()
});
