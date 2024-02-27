// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/content", "@nuxt/image"],
  css: ["@/assets/styles/main.css"],
  content: {
    highlight: {
      theme: "github-dark",
      preload: ["diff", "ts", "js", "css", "sql", "xml", "json"],
    },
  },
  app: {
    head: {
      title: "newt239",
      htmlAttrs: {
        lang: "ja",
      },
      meta: [
        {
          name: "theme-color",
          content: "#0099ff",
        },
        {
          name: "description",
          content: "newt239's portfolio site",
        },
        { property: "og:title", content: "newt239.dev" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "newt239.dev" },
        {
          property: "og:description",
          content: "newt239's portfolio site",
        },
        { property: "og:image", content: "https://newt239.dev/og-image.webp" },
        { property: "og:url", content: "https://newt239.dev" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:title", content: "newt239.dev" },
        {
          property: "twitter:description",
          content: "newt239's portfolio site",
        },
        {
          property: "twitter:image",
          content: "https://newt239.dev/og-image.webp",
        },
        { property: "twitter:site", content: "@newt239" },
        { property: "twitter:creator", content: "@newt239" },
        { property: "twitter:domain", content: "newt239.dev" },
      ],
      link: [{ rel: "icon", type: "image/svg+xml", href: "/logo.svg" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  experimental: {
    viewTransition: true,
  },
});
