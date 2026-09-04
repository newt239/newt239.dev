<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";

import { timeline, type TimelineItem } from "~/libs/timeline";

const years: { year: number; items: TimelineItem[] }[] = [];
for (const item of timeline.toSorted((a, b) => b.start.localeCompare(a.start))) {
  const year = Number(item.start.slice(0, 4));
  const last = years.at(-1);
  if (last?.year === year) {
    last.items.push(item);
  } else {
    years.push({ year, items: [item] });
  }
}
</script>

<template>
  <div class="timeline">
    <h2 v-colorful-heading lang="en">Timeline</h2>
    <div class="timeline-body">
      <div v-for="year in years" :key="year.year" class="year-section">
        <div class="year-header">
          <h3 class="year-text"><time :datetime="String(year.year)">{{ year.year }}</time></h3>
        </div>
        <div class="year-items record-list">
          <component
            :is="item.src ? 'a' : 'div'"
            v-for="item in year.items"
            :key="item.title"
            :href="item.src || undefined"
            :target="item.src ? '_blank' : undefined"
            :rel="item.src ? 'noopener noreferrer' : undefined"
            class="timeline-item record-item"
            :class="{ 'has-link': !!item.src }"
          >
            <span class="record-term">
              <time :datetime="item.start">{{ Number(item.start.slice(5)) }}月</time><template v-if="item.end === 'present'">〜現在</template><template v-else-if="item.end">〜<time :datetime="item.end">{{ Number(item.end.slice(5)) }}月</time></template>
            </span>
            <span class="item-title record-title">{{ item.title }}<IconExternalLink v-if="item.src" class="external-icon" aria-hidden="true" /></span>
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
  --record-term-width: min(5rem, 40%);
}

.item-title {
  transition: var(--transition);
}

/* 1 件でも折り返す幅ならセクション全体を縦積みにして、行ごとの体裁がばらつかないようにする */
.timeline-item {
  color: rgb(var(--text));
  text-decoration: none;
  transition: var(--transition);

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
</style>
