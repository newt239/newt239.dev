export default defineNuxtPlugin((nuxtApp) => {
  const observer = import.meta.client
    ? new IntersectionObserver(
        (entries) => {
          const shown = entries
            .filter((entry) => entry.isIntersecting)
            .toSorted(
              (a, b) =>
                a.boundingClientRect.top - b.boundingClientRect.top ||
                a.boundingClientRect.left - b.boundingClientRect.left
            );
          for (const [index, entry] of shown.entries()) {
            const el = entry.target as HTMLElement;
            el.style.setProperty("--reveal-order", String(index));
            el.dataset.reveal = "shown";
            observer?.unobserve(el);
          }
        },
        { rootMargin: "0px 0px -10% 0px" }
      )
    : undefined;

  // クラスだと動的な :class の再描画で消えるため data 属性で状態を持つ
  nuxtApp.vueApp.directive<HTMLElement>("reveal", {
    mounted(el) {
      el.dataset.reveal ??= "";
      observer?.observe(el);
    },
    unmounted(el) {
      observer?.unobserve(el);
    },
    getSSRProps() {
      return { "data-reveal": "" };
    },
  });
});
