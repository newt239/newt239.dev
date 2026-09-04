<script lang="ts" setup>
import { siteUrl } from "~/libs/site";

const route = useRoute();
const canonicalUrl = computed(() => `${siteUrl}${route.path.replace(/\/+$/, "") || "/"}`);

useHead({
  link: [{ rel: "canonical", href: canonicalUrl }],
});

useSeoMeta({
  ogUrl: canonicalUrl,
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
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
