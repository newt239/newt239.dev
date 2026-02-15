<script setup lang="ts">
export type WorkItemProps = {
  work: {
    path: string;
    title: string;
    images: { src: string; alt: string }[];
    description: string;
  };
};
const props = defineProps<WorkItemProps>();
const slug = computed(() => props.work.path.split('/')[2]);
const thumbnail = computed(() => props.work.images[0]);
</script>

<template>
  <NuxtLink :to="`/works/${slug}`" class="work-card">
    <NuxtImg class="work-card-thumbnail" :src="`/images/${thumbnail?.src}`" :alt="thumbnail?.alt"
      :style="`view-transition-name: ${slug}-img;`" />
    <div class="work-card-body">
      <h3 :style="`view-transition-name: ${slug}-name;`">{{ props.work.title }}</h3>
      <p class="work-card-description">{{ props.work.description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.work-card {
  display: flex;
  flex-direction: column;
  color: rgb(var(--text));
  border-radius: 0.75rem;
  overflow: hidden;
  background: rgb(var(--surface));
  transition: background 0.2s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (hover: hover) {
    &:hover {
      background: rgb(var(--surface-hover));
    }
  }

  @media (hover: none) {
    &:active {
      background: rgb(var(--surface-hover));
    }
  }
}

.work-card-thumbnail {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  -webkit-touch-callout: none;
  pointer-events: none;
}

.work-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 0.75rem 1rem 1rem;
  flex: 1;

  h3 {
    margin: 0;
    padding: 0;
    font-size: 1.25rem;
    line-height: 1.5;
    color: rgb(var(--text));
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.work-card-description {
  margin: 0;
  color: rgb(var(--text-muted));
  font-size: 0.9375rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  flex: 1;
}

</style>
