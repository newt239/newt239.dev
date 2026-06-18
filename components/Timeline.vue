<script setup lang="ts">
type TimelineItem = {
  term: string;
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
        term: "5月 - 6月",
        title: "MIXI 就業型インターン",
        src: "https://x.com/newt239/status/2066833159283724290",
      }
    ],
  },
  {
    year: 2025,
    items: [
      {
        term: "9月",
        title: "SmartHR サマーインターン",
        src: "https://x.com/newt239/status/1966481283690770887",
      },
      {
        term: "4月 - 3月",
        title: "芝浦工業大学 学術情報センター 開発アルバイト",
        src: null,
      },
      {
        term: "4月",
        title: "応用情報技術者試験 合格",
        src: "https://x.com/newt239/status/1940620995062268213",
      },
      {
        term: "3月",
        title: "サイバーエージェント 就業型インターン",
        src: "https://www.cyberagent.co.jp/careers/students/event/detail/id=28227",
      },
    ],
  },
  {
    year: 2024,
    items: [
      {
        term: "9月",
        title: "LayerX サマーインターン",
        src: "https://layerx.co.jp/",
      },
      {
        term: "7月 - 現在",
        title: "CA Tech lounge 会員 (Webフロントエンド)",
        src: "https://www.cyberagent.co.jp/careers/special/students/tech_lounge/",
      },
      {
        term: "6月 - 3月",
        title: "SecHack365'24 開発駆動コース 仲山ゼミ",
        src: "https://sechack365.nict.go.jp/",
      },
      {
        term: "4月",
        title: "芝浦工業大学 デザイン工学部 入学",
        src: "https://www.shibaura-it.ac.jp/",
      },
    ],
  },
  {
    year: 2023,
    items: [
      {
        term: "3月",
        title: "栄東高等学校 卒業",
        src: "https://x.com/newt239/status/1766442681688088755",
      },
    ],
  },
  {
    year: 2022,
    items: [
      {
        term: "4月",
        title: "基本情報技術者試験 合格",
        src: "https://x.com/newt239/status/1511657961013215232",
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
          <h3 class="year-text">{{ year.year }}</h3>
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
            <span class="item-term">{{ item.term }}</span>
            <div class="item-content">
              <span class="item-title">{{ item.title }}</span>
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
  border-radius: 0.75rem;
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
    border-bottom: 1px solid rgb(var(--border));
  }

  &.has-link {
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        background: rgb(var(--surface));

        .item-title {
          color: rgb(var(--accent));
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
}

.item-description {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgb(var(--text-muted));
}
</style>
