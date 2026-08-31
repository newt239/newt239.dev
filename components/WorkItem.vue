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
    <NuxtImg class="work-card-thumbnail" :src="`/images/${thumbnail?.src}`" alt=""
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
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: rgb(var(--text));
  background: rgb(var(--surface));
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-md);
  transition: var(--transition);
  view-transition-class: list-card;

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
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  pointer-events: none;
  object-fit: cover;
  border-radius: var(--radius-md) var(--radius-md) 0 0;
  view-transition-class: work-thumb;
  -webkit-touch-callout: none;
}

.work-card-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem 1rem 1rem;

  :is(h2, h3) {
    width: auto;
    padding: 0;
    margin: 0;
    font-size: 1.25rem;
    font-weight: 800;
    line-height: var(--line-height-tight);
    color: rgb(var(--text));
    overflow-wrap: anywhere;
    view-transition-class: list-title;
    text-box: normal;
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
  display: -webkit-box;
  flex: 1;
  margin: 0;
  overflow: hidden;
  -webkit-line-clamp: 2;
  font-size: 1rem;
  line-height: var(--line-height-tight);
  color: rgb(var(--text-muted));
  -webkit-box-orient: vertical;
}

</style>
