<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";
import type { WorksCollectionItem } from "@nuxt/content";

defineProps<{
  works: Pick<WorksCollectionItem, "path" | "title" | "images" | "description">[];
}>();
</script>

<template>
  <div v-show="works.length !== 0" class="work-list">
    <h2 v-colorful-heading class="category-title" lang="en">Works</h2>
    <div class="card-grid">
      <WorkItem v-for="(work, index) in works" :key="work.path" :work="work" :priority="index === 0" />
      <NuxtLink to="/works" class="see-all-card surface-card">
        <span>
          すべての作品を見る
          <IconChevronRight aria-hidden="true" />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.category-title {
  view-transition-name: work-category-name;
}
</style>
