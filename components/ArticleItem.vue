<script setup lang="ts">
import { IconBook2, IconExternalLink } from "@tabler/icons-vue";

import { articleSite } from "~/libs/articles";

const props = defineProps<{
  title: string;
  url: string;
  date: string;
  headingLevel?: "h2" | "h3";
}>();

const transitionKey = computed(
  () => `article-${props.url.replace(/^https?:\/\//, "").replace(/[^a-zA-Z0-9_-]/g, "-")}`
);

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
    :style="`view-transition-name: ${transitionKey}-card;`"
  >
    <div class="article-card-body">
      <component
        :is="headingLevel ?? 'h3'"
        :style="`view-transition-name: ${transitionKey}-title;`"
      >
        {{ title }}
        <IconExternalLink class="external-icon" aria-hidden="true" />
      </component>
    </div>
    <div class="article-card-footer">
      <div class="site-info">
        <template v-if="site.icon && site.iconOnDark">
          <NuxtImg :src="site.icon" alt="" width="24" height="24" class="site-icon-light" />
          <NuxtImg :src="site.iconOnDark" alt="" width="24" height="24" class="site-icon-dark" />
        </template>
        <NuxtImg v-else-if="site.icon" :src="site.icon" alt="" width="24" height="24" />
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
  view-transition-class: list-card;

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

.site-icon-dark {
  display: none;
}

@media screen {
  :root[data-theme-tone="dark"] .site-icon-light {
    display: none;
  }

  :root[data-theme-tone="dark"] .site-icon-dark {
    display: revert;
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-theme-tone="light"]) .site-icon-light {
      display: none;
    }

    :root:not([data-theme-tone="light"]) .site-icon-dark {
      display: revert;
    }
  }
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
