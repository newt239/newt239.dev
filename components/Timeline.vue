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
  align-items: baseline;
  gap: 0.75rem;
  padding: 0 0 0.5rem;
}

.year-text {
  font-size: var(--font-size-title);
  font-weight: 800;
  color: rgb(var(--text));
  padding: 0;
  margin: 0;
}

.year-items {
  background: rgb(var(--surface));
  border-radius: var(--radius-md);
  overflow: hidden;
  container-type: inline-size;
}

/* 1 件でも折り返す幅ならセクション全体を縦積みにして、行ごとの体裁がばらつかないようにする */
.timeline-item {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.75rem 1.25rem;

  @container (max-width: 16em) {
    & {
      flex-direction: column;
      align-items: stretch;
      gap: 0.25rem;
    }
  }
  color: rgb(var(--text));
  text-decoration: none;
  transition: var(--transition);

  &:not(:last-child) {
    border-bottom: var(--border-width-hairline) solid rgb(var(--border));
  }

  &.has-link {
    cursor: pointer;

    /* 親の .year-items が overflow: hidden なので外側に描くとリングが完全に隠れる */
    &:focus-visible {
      outline-offset: -2px;
    }

    .item-title {
      color: rgb(var(--accent));
      text-decoration: underline;
      text-underline-offset: 0.25rem;
      text-decoration-style: dashed;
    }

    @media (hover: hover) {
      &:hover {
        background: rgb(var(--surface));

        .item-title {
          opacity: var(--hover-opacity);
          text-decoration-color: transparent;
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
  font-size: 0.875rem;
  color: rgb(var(--text-muted));
  white-space: nowrap;
  min-width: min(5rem, 40%);
  flex-shrink: 0;
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.item-title {
  overflow-wrap: anywhere;
  font-weight: 600;
  font-size: 1rem;
  line-height: var(--line-height-tight);
  transition: var(--transition);

  .external-icon {
    width: 0.9em;
    height: 0.9em;
    vertical-align: -0.15em;
    margin-left: 0.2em;
  }
}

.item-description {
  margin: 0;
  font-size: 0.875rem;
  line-height: var(--line-height-tight);
  color: rgb(var(--text-muted));
}
</style>
