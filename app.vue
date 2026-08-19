<script lang="ts" setup>
const route = useRoute();
const canonicalPath = computed(() => route.path.replace(/\/+$/, "") || "/");

useHead({
  link: [{ rel: "canonical", href: () => `https://newt239.dev${canonicalPath.value}` }],
});

useSeoMeta({
  ogUrl: () => `https://newt239.dev${canonicalPath.value}`,
});
</script>

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
