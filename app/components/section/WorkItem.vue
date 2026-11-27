<script setup lang="ts">
import type { WorksCollectionItem } from "@nuxt/content";

defineProps<{
  work: Pick<WorksCollectionItem, "path" | "title" | "images" | "description">;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}>();
</script>

<template>
  <NuxtLink
    :to="work.path"
    class="thumb-card surface-card"
  >
    <NuxtImg
      class="thumb-card-image"
      :src="`/images/${work.images[0].src}`"
      alt=""
      :loading="priority ? 'eager' : undefined"
      :fetchpriority="priority ? 'high' : undefined"
      sizes="sm:100vw md:50vw lg:400px"
    />
    <div class="thumb-card-body">
      <component
        :is="headingLevel ?? 'h3'"
        class="thumb-card-title"
      >
        {{ work.title }}
      </component>
      <p class="thumb-card-text line-clamp">{{ work.description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.thumb-card-text {
  flex: 1;
}
</style>
