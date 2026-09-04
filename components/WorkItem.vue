<script setup lang="ts">
import type { WorksCollectionItem } from "@nuxt/content";

const props = defineProps<{
  work: Pick<WorksCollectionItem, "path" | "title" | "images" | "description">;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}>();
const slug = computed(() => props.work.path.split("/")[2] ?? "");
const activeWorkSlug = useState<string | null>("active-work-slug", () => null);
</script>

<template>
  <NuxtLink
    :to="work.path"
    class="thumb-card surface-card"
    :class="{ 'is-transitioning': slug === activeWorkSlug }"
    :style="`view-transition-name: ${slug}-card;`"
  >
    <NuxtImg
      class="thumb-card-image"
      :src="`/images/${work.images[0].src}`"
      alt=""
      :style="`view-transition-name: ${slug}-img;`"
      :loading="priority ? 'eager' : undefined"
      :fetchpriority="priority ? 'high' : undefined"
      sizes="sm:100vw md:50vw lg:400px"
    />
    <div class="thumb-card-body">
      <component
        :is="headingLevel ?? 'h3'"
        class="thumb-card-title"
        :style="`view-transition-name: ${slug}-name;`"
      >
        {{ work.title }}
      </component>
      <p class="thumb-card-text line-clamp">{{ work.description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.thumb-card {
  view-transition-class: list-card;
}

.thumb-card-image {
  view-transition-class: work-thumb;
}

.thumb-card-title {
  view-transition-class: list-title;
}

.thumb-card-text {
  flex: 1;
}

.thumb-card.is-transitioning {
  view-transition-class: list-card active-card;

  .thumb-card-image {
    view-transition-class: work-thumb active-thumb;
  }

  .thumb-card-title {
    view-transition-class: list-title active-title;
  }
}
</style>
