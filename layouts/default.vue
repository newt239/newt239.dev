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
    <NuxtLoadingIndicator class="loading-indicator" />
    <a class="skip-link" href="#main-content">本文へスキップ</a>
    <Header />
    <main id="main-content" ref="main" tabindex="-1" class="wrapper">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<style scoped>
.loading-indicator {
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
}

.wrapper {
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
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
  color: rgb(var(--text));
  background-color: rgb(var(--bg));
  border: var(--border-width) solid rgb(var(--text));
  border-radius: var(--radius-sm);
  translate: 0 -200%;
  transition: var(--transition);
}

.skip-link:focus {
  translate: 0 0;
}
</style>
