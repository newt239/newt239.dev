// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  ssr: true,
  target: "static",
  modules: ["@nuxt/content"],
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
        { property: "og:title", content: "newt239" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "newt239" },
        {
          property: "og:description",
          content: "newt239のポートフォリオサイト",
        },
        { property: "og:image", content: "https://newt239.dev/og-image.webp" },
        { property: "og:url", content: "https://newt239.dev" },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:title", content: "newt239" },
        {
          property: "twitter:description",
          content: "newt239のポートフォリオサイト",
        },
        {
          property: "twitter:image",
          content: "https://newt239.dev/og-image.webp",
        },
        { property: "twitter:site", content: "@newt239" },
        { property: "twitter:creator", content: "@newt239" },
        { property: "twitter:domain", content: "newt239.dev" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
        { rel: "canonical", href: "https://newt239.dev" },
      ],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["@/assets/styles/main.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/assets/styles/_variables.scss';",
        },
      },
    },
  },
});
