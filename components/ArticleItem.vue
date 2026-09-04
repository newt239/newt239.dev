<script setup lang="ts">
import { IconBook2 } from "@tabler/icons-vue";

import { articleSites } from "~/libs/articles";

interface Props {
  title: string;
  url: string;
  date: string;
  headingLevel?: "h2" | "h3";
}
const props = defineProps<Props>();

const transitionKey = computed(
  () => `article-${props.url.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9_-]/g, "-")}`
);

const site = computed(() => articleSites.find((item) => props.url.startsWith(item.prefix)));
</script>

<template>
  <a
    :href="props.url"
    target="_blank"
    rel="noopener noreferrer"
    class="article-card"
    :style="`view-transition-name: ${transitionKey}-card;`"
  >
    <div class="article-card-body">
      <component
        :is="props.headingLevel ?? 'h3'"
        :style="`view-transition-name: ${transitionKey}-title;`"
      >
        {{ props.title }}
      </component>
    </div>
    <div class="article-card-footer">
      <div class="site-info">
        <NuxtImg v-if="site?.icon" :src="site.icon" alt="" width="16" height="16" />
        <IconBook2 v-else :size="16" />
        <span class="site-name">{{ site?.name ?? "その他" }}</span>
      </div>
      <time class="article-date" :datetime="props.date">{{ props.date.replaceAll("-", "/") }}</time>
    </div>
  </a>
</template>

<style scoped>
.article-card {
  display: grid;
  grid-template-rows: subgrid;
  grid-row: span 2;
  gap: 0;
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

.site-info {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}

.site-name {
  font-size: 0.75rem;
  color: rgb(var(--text-muted));
}

.article-card-body {
  padding: 1rem 1rem 0.5rem;

  :is(h2, h3) {
    width: auto;
    padding: 0;
    margin: 0;
    font-size: 1rem;
    font-weight: 800;
    line-height: var(--line-height-tight);
    text-box: normal;
  }
}

.article-card-footer {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem min(1rem, 4%) 1rem;
}

.article-date {
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--text-muted));
}
</style>
