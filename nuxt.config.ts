import { readdirSync } from "node:fs";

// ライトボックスはクライアントでのみ描画されるため、変換なしの IPX ルートを明示的に prerender する
const originalImageRoutes = readdirSync("public/images").map(
  (file) => `/_ipx/_/images/${file}`
);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/sitemap", "@nuxt/content", "@nuxt/image", "@nuxt/eslint"],
  site: {
    url: "https://newt239.dev",
    name: "newt239.dev",
  },
  css: ["@/assets/styles/main.css"],
  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
      },
      meta: [
        { name: "theme-color", content: "#0099ff" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "newt239.dev" },
        { property: "og:image", content: "https://newt239.dev/og-image-2026.webp" },
        { property: "og:url", content: "https://newt239.dev" },
        { property: "og:locale", content: "ja_JP" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:site", content: "@newt239" },
        { property: "twitter:creator", content: "@newt239" },
        { property: "twitter:domain", content: "newt239.dev" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/icon.png" },
        { rel: "manifest", href: "/manifest.webmanifest" },
      ],
      noscript: [
        {
          innerHTML: "<style>.colorful-heading{opacity:1!important}</style>",
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
      routes: originalImageRoutes,
    },
  },

  content: {
    experimental: {
      sqliteConnector: "native",
    },
  },

  image: {
    domains: ["i.scdn.co"],
  },

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: "2024-07-15",
});
