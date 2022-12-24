// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  ssr: false,
  nitro: {
    preset: "cloudflare_pages",
  },
  app: {
    head: {
      title: "newt239",
      link: [{ href: "logo.svg", type: "image/x-icon" }],
    },
    pageTransition: { name: "page", mode: "out-in" },
  },
  css: ["@/assets/styles/main.scss"],
  vite: {
    plugins: [],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/assets/styles/_variables.scss';",
        },
      },
    },
  },
  modules: ["@nuxt/content"],
  content: {
    api: {
      baseURL: "/api/works",
    },
    highlight: {
      theme: "github-dark-dimmed",
    },
  },
  generate: {
    routes: [
      "/works/score-watcher",
      "/works/quiz-flasher",
      "/works/ship-notify",
      "/works/look-inside-view",
    ],
  },
});
