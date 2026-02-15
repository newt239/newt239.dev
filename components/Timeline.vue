<script setup lang="ts">
type TimelineItem = {
  term: string;
  title: string;
  description?: string;
  src: string | null;
};

type YearSection = {
  year: number;
  grade: string | null;
  items: TimelineItem[];
};

const items: YearSection[] = [
  {
    year: 2025,
    grade: "大学2年",
    items: [
      {
        term: "9月",
        title: "SmartHR サマーインターン",
        src: "https://x.com/newt239/status/1966481283690770887",
      },
      {
        term: "4月",
        title: "応用情報技術者試験 合格",
        src: "https://x.com/newt239/status/1940620995062268213",
      },
    ],
  },
  {
    year: 2024,
    grade: "大学1年",
    items: [
      {
        term: "3月",
        title: "サイバーエージェント 長期就業型インターン",
        src: "https://www.cyberagent.co.jp/careers/students/event/detail/id=28227",
      },
      {
        term: "9月",
        title: "LayerX サマーインターン",
        src: "https://layerx.co.jp/",
      },
      {
        term: "8月",
        title: "MIXI git challenge #14",
        src: "https://x.com/newt239/status/1827302836448989582",
      },
      {
        term: "8月",
        title: "技育CAMP vol.11 「みちくさ」 (努力賞)",
        src: "https://x.com/newt239/status/1820045439695196344",
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
    grade: "高校3年",
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
    grade: "高校2年",
    items: [
      {
        term: "4月",
        title: "基本情報技術者試験 合格",
        src: "https://x.com/newt239/status/1511657961013215232",
      },
    ],
  },
  {
    year: 2005,
    grade: null,
    items: [{ term: "11月2日", title: "誕生", src: null }],
  },
];
</script>

<template>
  <div class="timeline">
    <h2 class="category-title" lang="en">Timeline</h2>
    <div class="timeline-body">
      <div v-for="year in items" :key="year.year" class="year-section">
        <div class="year-header">
          <span class="year-text">{{ year.year }}</span>
          <span v-if="year.grade" class="year-grade">{{ year.grade }}</span>
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
}

.year-grade {
  font-size: 0.875rem;
  color: rgb(var(--text-muted));
}

.year-items {
  background: rgb(0 0 0 / 0.035);
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
  transition: background 0.15s;

  &:not(:last-child) {
    border-bottom: 1px solid rgb(0 0 0 / 0.06);
  }

  &.has-link {
    cursor: pointer;

    @media (hover: hover) {
      &:hover {
        background: rgb(0 0 0 / 0.04);

        .item-title {
          color: rgb(var(--accent));
        }
      }
    }

    @media (hover: none) {
      &:active {
        background: rgb(0 0 0 / 0.04);
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
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
  transition: color 0.15s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.item-description {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.6;
  color: rgb(var(--text-muted));
}
</style>
