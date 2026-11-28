<script lang="ts" setup>
import { siteUrl } from "~/lib/constants";

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
.page-leave-active {
  animation: page-leave var(--page-leave-duration) var(--page-leave-easing) forwards;
}

@keyframes page-leave {
  to {
    opacity: 0;
    translate: 0 calc(var(--reveal-distance) * -0.5);
  }
}
</style>
