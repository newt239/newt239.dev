export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) {
    return;
  }

  if (!document.startViewTransition) {
    to.meta.pageTransition = { name: "page", mode: "out-in" };
  }
});
