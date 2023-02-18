// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  ssr: true,
  target: "static",
  modules: ["@nuxt/content"],
  nitro: {
    preset: "service-worker",
  },
  app: {
    head: {
      title: "newt239",
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
  content: {
    highlight: {
      theme: "github-dark-dimmed",
    },
  },
});
