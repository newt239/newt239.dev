<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";

import { timeline, type TimelineItem } from "~/lib/timeline";

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
    <h2 v-reveal lang="en">Timeline</h2>
    <div class="timeline-body">
      <section v-for="year in years" :key="year.year" class="year-section">
        <h3 v-reveal class="year-text"><time :datetime="String(year.year)">{{ year.year }}</time></h3>
        <div class="year-items">
          <component
            :is="item.src ? 'a' : 'div'"
            v-for="item in year.items"
            :key="item.title"
            v-reveal
            :href="item.src || undefined"
            :target="item.src ? '_blank' : undefined"
            :rel="item.src ? 'noopener noreferrer' : undefined"
            class="timeline-card record-item"
            :class="{ 'has-link surface-card': !!item.src }"
          >
            <span class="record-term">
              <time :datetime="item.start">{{ new Date(item.start).toLocaleDateString("ja-JP", { month: "long", timeZone: "UTC" }) }}</time><template v-if="item.end === 'present'">〜現在</template><template v-else-if="item.end">〜<time :datetime="item.end">{{ new Date(item.end).toLocaleDateString("ja-JP", { year: item.end.slice(0, 4) === item.start.slice(0, 4) ? undefined : "numeric", month: "long", timeZone: "UTC" }) }}</time></template>
            </span>
            <span class="item-title record-title">{{ item.title }}<IconExternalLink v-if="item.src" class="external-icon" aria-hidden="true" /></span>
          </component>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.timeline-body {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.year-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.year-text {
  padding: 0;
  margin: 0;
  font-size: var(--font-size-title);
  font-weight: 800;
  color: oklch(var(--text));
}

.year-items {
  display: flex;
  flex-direction: column;
  gap: var(--grid-gap);
  container-type: inline-size;
}

.timeline-card {
  color: oklch(var(--text));
  text-decoration: none;
  transition: var(--transition);

  &.has-link {
    cursor: pointer;

    .item-title {
      color: oklch(var(--accent));
      text-decoration: underline;
      text-decoration-style: dashed;
      text-underline-offset: 0.25rem;
    }

    @media (prefers-contrast: more) {
      .item-title {
        text-decoration-thickness: 2px;
        text-decoration-style: solid;
      }
    }
  }
}
</style>
