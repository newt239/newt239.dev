<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";

import { timeline } from "~/libs/timeline";

import type { TimelineItem } from "~/libs/timeline";

const years = computed(() => {
  const grouped = new Map<number, TimelineItem[]>();
  for (const item of [...timeline].sort((a, b) => b.start.localeCompare(a.start))) {
    const year = Number(item.start.slice(0, 4));
    const yearItems = grouped.get(year);
    if (yearItems) {
      yearItems.push(item);
    } else {
      grouped.set(year, [item]);
    }
  }
  return [...grouped].map(([year, yearItems]) => ({ year, items: yearItems }));
});
</script>

<template>
  <div class="timeline">
    <h2 v-colorful-heading class="category-title" lang="en">Timeline</h2>
    <div class="timeline-body">
      <div v-for="year in years" :key="year.year" class="year-section">
        <div class="year-header">
          <h3 class="year-text"><time :datetime="String(year.year)">{{ year.year }}</time></h3>
        </div>
        <div class="year-items">
          <component
            :is="item.src ? 'a' : 'div'"
            v-for="item in year.items"
            :key="item.title"
            :href="item.src || undefined"
            :target="item.src ? '_blank' : undefined"
            :rel="item.src ? 'noopener noreferrer' : undefined"
            class="timeline-item"
            :class="{ 'has-link': !!item.src }"
          >
            <span class="item-term">
              <time :datetime="item.start">{{ Number(item.start.slice(5)) }}月</time><template v-if="item.end === 'present'">〜現在</template><template v-else-if="item.end">〜<time :datetime="item.end">{{ Number(item.end.slice(5)) }}月</time></template>
            </span>
            <div class="item-content">
              <span class="item-title">{{ item.title }}<IconExternalLink v-if="item.src" :size="14" class="external-icon" /></span>
              <p v-if="item.description" class="item-description">{{ item.description }}</p>
            </div>
          </component>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-body {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.year-header {
  display: flex;
  gap: 0.75rem;
  align-items: baseline;
  padding: 0 0 0.5rem;
}

.year-text {
  padding: 0;
  margin: 0;
  font-size: var(--font-size-title);
  font-weight: 800;
  color: rgb(var(--text));
}

.year-items {
  container-type: inline-size;
  overflow: hidden;
  background: rgb(var(--surface));
  border-radius: var(--radius-md);
}

/* 1 件でも折り返す幅ならセクション全体を縦積みにして、行ごとの体裁がばらつかないようにする */
.timeline-item {
  display: flex;
  gap: 1rem;
  align-items: baseline;
  padding: 0.75rem 1.25rem;
  color: rgb(var(--text));
  text-decoration: none;
  transition: var(--transition);

  @container (max-width: 16em) {
    & {
      flex-direction: column;
      gap: 0.25rem;
      align-items: stretch;
    }
  }

  &:not(:last-child) {
    border-bottom: var(--border-width-hairline) solid rgb(var(--border));
  }

  &.has-link {
    cursor: pointer;

    /* 親の .year-items が overflow: hidden なので外側に描くとリングが完全に隠れる */
    &:focus-visible {
      outline-offset: calc(var(--focus-ring-offset) * -1);
    }

    .item-title {
      color: rgb(var(--accent));
      text-decoration: underline;
      text-decoration-style: dashed;
      text-underline-offset: 0.25rem;
    }

    @media (hover: hover) {
      &:hover {
        background: rgb(var(--surface));

        .item-title {
          text-decoration-color: transparent;
          opacity: var(--hover-opacity);
        }
      }
    }

    @media (hover: none) {
      &:active {
        background: rgb(var(--surface));
      }
    }
  }

}

.item-term {
  flex-shrink: 0;
  min-width: min(5rem, 40%);
  font-size: 0.75rem;
  color: rgb(var(--text-muted));
  white-space: nowrap;
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.item-title {
  font-size: 1rem;
  font-weight: 800;
  line-height: var(--line-height-tight);
  overflow-wrap: anywhere;
  transition: var(--transition);

  .external-icon {
    width: 0.9em;
    height: 0.9em;
    margin-left: 0.2em;
    vertical-align: -0.15em;
  }
}

.item-description {
  margin: 0;
  font-size: 0.75rem;
  line-height: var(--line-height-tight);
  color: rgb(var(--text-muted));
}
</style>
