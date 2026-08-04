export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    return;
  }

  if (!document.startViewTransition) {
    to.meta.pageTransition = { name: "page", mode: "out-in" };
  }

  useSeoMeta({
    title: "newt239.dev",
    ogTitle: "newt239.dev",
    description: "newt239's portfolio site",
    ogDescription: "newt239's portfolio site",
    ogImage: {
      url: "https://newt239.dev/og-image-2026.webp",
      alt: "newt239.dev",
    },
    twitterImage: {
      url: "https://newt239.dev/og-image-2026.webp",
      alt: "newt239.dev",
    },
  });
});
