<script setup lang="ts">
export type WorkItemProps = {
  work: {
    path: string;
    title: string;
    images: { src: string; alt: string }[];
    description: string;
  };
  priority?: boolean;
  headingLevel?: "h2" | "h3";
};
const props = defineProps<WorkItemProps>();
const slug = computed(() => props.work.path.split('/')[2]);
const thumbnail = computed(() => props.work.images[0]);
const activeWorkSlug = useState<string | null>('active-work-slug', () => null);
</script>

<template>
  <NuxtLink :to="`/works/${slug}`" class="work-card" :class="{ 'is-transitioning': slug === activeWorkSlug }"
    :style="`view-transition-name: ${slug}-card;`">
    <NuxtImg class="work-card-thumbnail" :src="`/images/${thumbnail?.src}`" :alt="thumbnail?.alt"
      :style="`view-transition-name: ${slug}-img;`" :loading="priority ? 'eager' : undefined"
      :fetchpriority="priority ? 'high' : undefined" sizes="sm:100vw md:50vw lg:400px" />
    <div class="work-card-body">
      <component :is="props.headingLevel ?? 'h3'" :style="`view-transition-name: ${slug}-name;`">
        {{ props.work.title }}
      </component>
      <p class="work-card-description">{{ props.work.description }}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>
.work-card {
  view-transition-class: list-card;
  display: flex;
  flex-direction: column;
  color: rgb(var(--text));
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-md);
  overflow: hidden;
  background: rgb(var(--surface));
  transition: var(--transition);

  @media (hover: hover) {
    &:hover {
      border-color: rgb(var(--text));
    }
  }

  @media (hover: none) {
    &:active {
      border-color: rgb(var(--text));
    }
  }
}

.work-card-thumbnail {
  view-transition-class: work-thumb;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  -webkit-touch-callout: none;
  pointer-events: none;
}

.work-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 0.75rem 1rem 1rem;
  flex: 1;

  :is(h2, h3) {
    view-transition-class: list-title;
    width: auto;
    font-weight: 700;
    text-box: normal;
    margin: 0;
    padding: 0;
    font-size: 1.25rem;
    line-height: var(--line-height-tight);
    color: rgb(var(--text));
    overflow-wrap: anywhere;
  }
}

.work-card.is-transitioning {
  view-transition-class: list-card active-card;

  .work-card-thumbnail {
    view-transition-class: work-thumb active-thumb;
  }

  :is(h2, h3) {
    view-transition-class: list-title active-title;
  }
}

.work-card-description {
  margin: 0;
  color: rgb(var(--text-muted));
  font-size: 0.9375rem;
  line-height: var(--line-height-tight);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  flex: 1;
}

</style>
