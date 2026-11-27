<script setup lang="ts">
const main = useTemplateRef<HTMLElement>("main");

if (import.meta.client) {
  const nuxtApp = useNuxtApp();
  const router = useRouter();

  const unregister = nuxtApp.hook("page:finish", () => {
    if (nuxtApp.isHydrating) return;
    const { hash } = router.currentRoute.value;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : main.value;
    target?.focus({ preventScroll: true });
  });

  onUnmounted(unregister);
}
</script>

<template>
  <div>
    <div class="loading-screen" aria-hidden="true">
      <img src="/icon.webp" alt="" width="56" height="56" class="loading-screen-icon">
    </div>
    <NuxtLoadingIndicator class="loading-indicator" />
    <a class="skip-link" href="#main-content">本文へスキップ</a>
    <Header v-reveal />
    <main id="main-content" ref="main" tabindex="-1" class="wrapper">
      <slot />
    </main>
    <Footer v-reveal />
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: grid;
  place-items: center;
  background-color: oklch(var(--bg));
  transition:
    opacity var(--loading-screen-fade-duration) var(--transition-easing),
    visibility var(--loading-screen-fade-duration);

  @media (scripting: none) {
    display: none;
  }

  @media print {
    display: none;
  }
}

:root.is-font-settled .loading-screen {
  visibility: hidden;
  opacity: 0;
}

.loading-screen-icon {
  border-radius: var(--radius-round);
  animation:
    loading-screen-fade-in var(--loading-screen-fade-duration) var(--loading-screen-delay) backwards,
    loading-screen-bounce var(--loading-screen-bounce-duration) var(--transition-easing) infinite alternate;
}

@keyframes loading-screen-fade-in {
  from {
    opacity: 0;
  }
}

@keyframes loading-screen-bounce {
  to {
    translate: 0 calc(var(--reveal-distance) * -0.5);
  }
}

.loading-indicator {
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }

  @media print {
    display: none;
  }
}

.wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;

  @media print {
    min-height: auto;
  }
}

#main-content:focus {
  outline: none;
}

.skip-link {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 200;
  padding: 0.5rem 1rem;
  color: oklch(var(--text));
  background-color: oklch(var(--bg));
  border: var(--border-width) solid oklch(var(--text));
  border-radius: var(--radius-sm);
  translate: 0 -200%;
  transition: var(--transition);
}

.skip-link:focus {
  translate: 0 0;
}

@media print {
  .skip-link {
    display: none;
  }
}
</style>
