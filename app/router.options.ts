import type { RouterConfig } from "@nuxt/schema";
import { useNuxtApp } from "#app/nuxt";
import { useRouter } from "#app/composables/router";
import { START_LOCATION } from "vue-router";

const hashScrollMarginTop = (hash: string) => {
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return 0;
  return (
    (Number.parseFloat(getComputedStyle(el).scrollMarginTop) || 0) +
    (Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0)
  );
};

export default <RouterConfig>{
  scrollBehavior: (to, from, savedPosition) => {
    const nuxtApp = useNuxtApp();
    const router = useRouter();

    const position = () => {
      if (savedPosition) return savedPosition;
      if (to.hash) return { el: to.hash, top: hashScrollMarginTop(to.hash) };
      return { left: 0, top: 0 };
    };

    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) return savedPosition ?? { left: 0, top: 0 };
      if (to.hash) return { el: to.hash, top: hashScrollMarginTop(to.hash) };
      return false;
    }

    const scrollToTop =
      typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (scrollToTop === false) return false;
    if (from === START_LOCATION) return position();

    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce("page:loading:end", () => {
        const resolvePosition = () =>
          resolve(router.currentRoute.value.fullPath === to.fullPath ? position() : false);

        const transitionPromise = nuxtApp["~transitionPromise"] as Promise<void> | undefined;
        if (transitionPromise) {
          transitionPromise.then(() => requestAnimationFrame(resolvePosition));
          return;
        }
        resolvePosition();
      });
    });
  },
};
