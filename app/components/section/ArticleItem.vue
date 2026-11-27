<script setup lang="ts">
import { IconBook2, IconExternalLink } from "@tabler/icons-vue";

import { articleSite } from "~/lib/articles";

const props = defineProps<{
  title: string;
  url: string;
  date: string;
  headingLevel?: "h2" | "h3";
}>();

const site = computed(() => articleSite(props.url));

const formattedDate = computed(() =>
  new Date(props.date).toLocaleDateString("ja-JP", { dateStyle: "long", timeZone: "UTC" })
);
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    class="article-card surface-card"
    :aria-label="`${title} - ${site.name} ${formattedDate}（外部サイト）`"
  >
    <div class="article-card-body">
      <component
        :is="headingLevel ?? 'h3'"
      >
        {{ title }}
        <IconExternalLink class="external-icon" aria-hidden="true" />
      </component>
    </div>
    <div class="article-card-footer">
      <div class="site-info">
        <BrandLogo v-if="site.logo" :logo="site.logo" :logo-on-dark="site.logoOnDark" :size="24" />
        <IconBook2 v-else :size="24" aria-hidden="true" />
        <span class="site-name">{{ site.name }}</span>
      </div>
      <time class="article-date" :datetime="date">{{ formattedDate }}</time>
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

  /* subgrid のままだと ::after が 3 つ目のグリッドアイテムとして入り崩れる */
  @media print {
    display: block;
    break-inside: avoid;

    &::after {
      display: block;
      padding: 0 1rem 0.75rem;
    }
  }
}

.site-info {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}

.site-name {
  font-size: 0.875rem;
  color: oklch(var(--text-muted));
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

    .external-icon {
      margin-left: var(--external-link-icon-gap-heading);
      color: oklch(var(--text-muted));
    }
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
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  color: oklch(var(--text-muted));
}
</style>
