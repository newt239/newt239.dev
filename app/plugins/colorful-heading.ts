type ColorfulHeadingEl = HTMLElement & {
  __colorfulHeadingObserver?: IntersectionObserver;
};

const splitTextNodes = (root: HTMLElement, counter: { index: number }) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let current = walker.nextNode();
  while (current) {
    textNodes.push(current as Text);
    current = walker.nextNode();
  }

  for (const node of textNodes) {
    const text = node.nodeValue ?? "";
    if (text.trim().length === 0) continue;

    const fragment = document.createDocumentFragment();
    for (const char of Array.from(text)) {
      if (char === " " || char === "　") {
        fragment.appendChild(document.createTextNode(char));
        continue;
      }
      const span = document.createElement("span");
      span.className = "colorful-heading__char";
      span.ariaHidden = "true";
      span.textContent = char;
      span.style.setProperty("--char-index", String(counter.index));
      counter.index += 1;
      fragment.appendChild(span);
    }
    node.parentNode?.replaceChild(fragment, node);
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive<ColorfulHeadingEl>("colorful-heading", {
    mounted(el) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const label = el.textContent?.trim() ?? "";
      splitTextNodes(el, { index: 0 });
      if (label) el.setAttribute("aria-label", label);
      el.classList.add("colorful-heading");

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add("is-visible");
              observer.unobserve(el);
            }
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
      el.__colorfulHeadingObserver = observer;
    },
    unmounted(el) {
      el.__colorfulHeadingObserver?.disconnect();
    },
    getSSRProps() {
      return { class: "colorful-heading" };
    },
  });
});
