import { readdirSync } from "node:fs";

import { shikiTheme } from "./libs/shiki-theme";
import { siteUrl } from "./libs/site";

// ライトボックスはクライアントでのみ描画されるため、変換なしの IPX ルートを明示的に prerender する
const originalImageRoutes = readdirSync("public/images").map(
  (file) => `/_ipx/_/images/${file}`
);

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/sitemap", "@nuxt/content", "@nuxt/image", "@nuxt/eslint"],
  site: {
    url: siteUrl,
    name: "newt239.dev",
  },
  css: ["@/assets/styles/main.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
      },
      title: "newt239.dev",
      meta: [
        { name: "theme-color", content: "#0099ff" },
        { name: "text-scale", content: "scale" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "newt239.dev" },
        { property: "og:title", content: "newt239.dev" },
        { property: "og:image", content: `${siteUrl}/og-image-2026.webp` },
        { property: "og:image:alt", content: "newt239.dev" },
        { property: "og:locale", content: "ja_JP" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:site", content: "@newt239" },
        { property: "twitter:creator", content: "@newt239" },
        { property: "twitter:domain", content: "newt239.dev" },
        { property: "twitter:image", content: `${siteUrl}/og-image-2026.webp` },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/icon.png" },
        { rel: "manifest", href: "/manifest.webmanifest" },
      ],
      noscript: [
        {
          innerHTML: "<style>.colorful-heading{color:inherit!important}</style>",
          tagPosition: "head",
        },
      ],
      script: [
        {
          src: "https://use.typekit.net/ylu0yhm.js",
          defer: true,
          onload: "Typekit.load({async:true})",
        },
      ],
    },
    pageTransition: false,
  },

  nitro: {
    compressPublicAssets: true,
    prerender: {
      autoSubfolderIndex: false,
      routes: originalImageRoutes,
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          theme: { default: shikiTheme },
        },
      },
    },
    experimental: {
      sqliteConnector: "native",
    },
  },

  image: {
    domains: ["i.scdn.co"],
  },

  vite: {
    $client: {
      build: {
        rollupOptions: {
          output: {
            manualChunks: (id: string) =>
              id.includes("@nuxtjs/mdc/dist/runtime/components/prose/") ? "prose" : undefined,
          },
        },
      },
    },
  },

  experimental: {
    viewTransition: true,
    defaults: {
      nuxtLink: {
        prefetchOn: { visibility: true, interaction: true },
      },
    },
  },

  compatibilityDate: "2024-07-15",
});
