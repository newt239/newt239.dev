// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  app: {
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
});
