export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server || !document.startViewTransition) {
    return;
  }

  // Disable built-in Vue transitions
  to.meta.pageTransition = false;
  to.meta.layoutTransition = false;

  useSeoMeta({
    title: "newt239.dev",
    ogTitle: "newt239.dev",
    description: "newt239's portfolio site",
    ogDescription: "newt239's portfolio site",
    ogImage: {
      url: "https://newt239.dev/og-image.webp",
      alt: "newt239.devのイメージ画像",
    },
    twitterImage: {
      url: "https://newt239.dev/og-image.webp",
      alt: "newt239.devのイメージ画像",
    },
  });
});
