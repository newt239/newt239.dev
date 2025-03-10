// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/image", "@nuxtjs/color-mode", "@nuxt/eslint"],
  css: ["@/assets/styles/main.css"],

  content: {
    highlight: {
      theme: "github-light",
      preload: ["diff", "ts", "js", "css", "sql", "xml", "json"],
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: "ja",
      },
      meta: [
        { name: "theme-color", content: "#0099ff" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "newt239.dev" },
        { property: "og:image", content: "https://newt239.dev/og-image.webp" },
        { property: "og:url", content: "https://newt239.dev" },
        { property: "og:locale", content: "ja_JP" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:site", content: "@newt239" },
        { property: "twitter:creator", content: "@newt239" },
        { property: "twitter:domain", content: "newt239.dev" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
      script: [
        {
          src: "https://use.typekit.net/uel8jnk.js",
        },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },

  colorMode: {
    preference: "light",
    fallback: "light",
  },

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: "2024-07-15",
});