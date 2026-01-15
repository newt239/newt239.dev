<template>
  <NuxtLayout>
    <NuxtLoadingIndicator class="loading-indicator" />
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
.loading-indicator {
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
}

/* Vue transitions are disabled when View Transitions API is available (see middleware/disable-vue-transitions.global.ts) */
@supports not (view-transition-name: none) {
  .page-enter-active,
  .page-leave-active {
    transition: all 0.5s;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    filter: blur(1rem);
  }
}
</style>
