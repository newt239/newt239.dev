const splitTextNodes = (root: HTMLElement) => {
  let index = 0;
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
      span.style.setProperty("--char-index", String(index));
      index += 1;
      fragment.appendChild(span);
    }
    node.parentNode?.replaceChild(fragment, node);
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  const observer = import.meta.client
    ? new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.add("is-visible");
            observer?.unobserve(entry.target);
          }
        },
        { threshold: 0.3 }
      )
    : undefined;

  nuxtApp.vueApp.directive<HTMLElement>("colorful-heading", {
    mounted(el) {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const label = el.textContent?.trim() ?? "";
      splitTextNodes(el);
      if (label) el.setAttribute("aria-label", label);
      el.classList.add("colorful-heading");

      observer?.observe(el);
    },
    unmounted(el) {
      observer?.unobserve(el);
    },
    getSSRProps() {
      return { class: "colorful-heading" };
    },
  });
});
