<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";

type TimelineItem = {
  start: string;
  end?: string | "present";
  title: string;
  description?: string;
  src: string | null;
};

type YearSection = {
  year: number;
  items: TimelineItem[];
};

const items: YearSection[] = [
  {
    year: 2026,
    items: [
      {
        start: "2026-05",
        end: "2026-06",
        title: "MIXI 就業型インターン",
        src: "https://x.com/newt239/status/2066833159283724290",
      }
    ],
  },
  {
    year: 2025,
    items: [
      {
        start: "2025-09",
        title: "SmartHR サマーインターン",
        src: "https://x.com/newt239/status/1966481283690770887",
      },
      {
        start: "2025-04",
        end: "2026-03",
        title: "芝浦工業大学 学術情報センター 開発アルバイト",
        src: null,
      },
      {
        start: "2025-03",
        title: "サイバーエージェント 就業型インターン",
        src: "https://www.cyberagent.co.jp/careers/students/event/detail/id=28227",
      },
    ],
  },
  {
    year: 2024,
    items: [
      {
        start: "2024-09",
        title: "LayerX サマーインターン",
        src: "https://x.com/newt239/status/1834594518324457782",
      },
      {
        start: "2024-07",
        end: "present",
        title: "CA Tech lounge 会員 (Webフロントエンド)",
        src: "https://www.cyberagent.co.jp/careers/special/students/tech_lounge/",
      },
      {
        start: "2024-06",
        end: "2025-03",
        title: "SecHack365'24 開発駆動コース 仲山ゼミ",
        src: "https://sechack365.nict.go.jp/",
      },
      {
        start: "2024-04",
        title: "芝浦工業大学 デザイン工学部 入学",
        src: "https://www.shibaura-it.ac.jp/",
      },
    ],
  },
  {
    year: 2023,
    items: [
      {
        start: "2023-03",
        title: "栄東高等学校 卒業",
        src: null,
      },
    ],
  }
];
</script>

<template>
  <div class="timeline">
    <h2 v-colorful-heading class="category-title" lang="en">Timeline</h2>
    <div class="timeline-body">
      <div v-for="year in items" :key="year.year" class="year-section">
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
              <time :datetime="item.start">{{ Number(item.start.slice(5)) }}月</time><template v-if="item.end === 'present'"> - 現在</template><template v-else-if="item.end"> - <time :datetime="item.end">{{ Number(item.end.slice(5)) }}月</time></template>
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
  font-size: 1.75rem;
  font-weight: 800;
  color: rgb(var(--text));
  padding: 0;
  margin: 0;
}

.year-items {
  background: rgb(var(--surface));
  border-radius: var(--radius-md);
  overflow: hidden;
}

.timeline-item {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  padding: 0.75rem 1.25rem;
  color: rgb(var(--text));
  text-decoration: none;
  transition: var(--transition);

  &:not(:last-child) {
    border-bottom: var(--border-width-hairline) solid rgb(var(--border));
  }

  &.has-link {
    cursor: pointer;

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
  min-width: 5rem;
  flex-shrink: 0;
}

.item-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
}

.item-title {
  font-weight: 600;
  font-size: 1rem;
  line-height: 1.5;
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
  line-height: 1.6;
  color: rgb(var(--text-muted));
}
</style>
