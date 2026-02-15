<script setup lang="ts">
import { IconSortAscending, IconSortDescending } from "@tabler/icons-vue";
import { articleList } from "~/libs/articles";

useSeoMeta({
  title: "記事一覧 - newt239.dev",
  ogTitle: "記事一覧 - newt239.dev",
});

type SiteName = "Qiita" | "Zenn" | "はてな" | "CyberAgent" | "その他";

function getSiteKey(url: string): SiteName {
  if (url.startsWith("https://qiita.com/")) return "Qiita";
  if (url.startsWith("https://zenn.dev/")) return "Zenn";
  if (url.startsWith("https://newt239.hatenablog.com/")) return "はてな";
  if (url.startsWith("https://developers.cyberagent.co.jp/")) return "CyberAgent";
  return "その他";
}

const allSites = computed(() => {
  const siteSet = new Set<SiteName>();
  for (const article of articleList) {
    siteSet.add(getSiteKey(article.url));
  }
  return [...siteSet];
});

const route = useRoute();
const router = useRouter();

function parseSitesFromQuery(): Set<SiteName> {
  const raw = route.query.sites;
  if (!raw) return new Set();
  const arr = (typeof raw === "string" ? raw : raw[0] || "").split(",").filter(Boolean);
  return new Set(arr as SiteName[]);
}

const selectedSites = ref<Set<SiteName>>(parseSitesFromQuery());
const sortAsc = ref(route.query.dir === "asc");

function updateQuery() {
  const query: Record<string, string> = {};
  if (selectedSites.value.size > 0) query.sites = [...selectedSites.value].join(",");
  if (sortAsc.value) query.dir = "asc";
  router.replace({ query });
}

function toggleSite(site: SiteName) {
  const next = new Set(selectedSites.value);
  if (next.has(site)) {
    next.delete(site);
  } else {
    next.add(site);
  }
  selectedSites.value = next;
  updateQuery();
}

function clearFilter() {
  selectedSites.value = new Set();
  updateQuery();
}

function toggleSort() {
  sortAsc.value = !sortAsc.value;
  updateQuery();
}

const filteredArticles = computed(() => {
  let result = [...articleList];

  if (selectedSites.value.size > 0) {
    result = result.filter((article) => selectedSites.value.has(getSiteKey(article.url)));
  }

  result.sort((a, b) => {
    return sortAsc.value
      ? a.date.localeCompare(b.date)
      : b.date.localeCompare(a.date);
  });

  return result;
});
</script>

<template>
  <main>
    <div class="container article-list-page">
      <h2 class="category-name" lang="en">Articles</h2>

      <div class="list-controls">
        <div class="filter-section">
          <div class="filter-chips">
            <button
              v-for="site in allSites"
              :key="site"
              class="filter-chip"
              :class="{ active: selectedSites.has(site) }"
              @click="toggleSite(site)"
            >
              {{ site }}
            </button>
          </div>
          <button v-if="selectedSites.size > 0" class="filter-clear" @click="clearFilter">
            クリア
          </button>
        </div>
        <div class="sort-section">
          <span class="sort-label">日付</span>
          <button class="sort-direction" :aria-label="sortAsc ? '古い順' : '新しい順'" @click="toggleSort">
            <IconSortAscending v-if="sortAsc" :size="18" />
            <IconSortDescending v-else :size="18" />
          </button>
        </div>
      </div>

      <div v-if="filteredArticles.length === 0" class="empty-state">
        該当する記事が見つかりませんでした。
      </div>
      <div v-else class="article-grid">
        <ArticleItem
          v-for="article in filteredArticles"
          :key="article.url"
          :title="article.title"
          :url="article.url"
          :date="article.date"
        />
      </div>
    </div>
  </main>
</template>

<style>
.article-list-page {
  .category-name {
    view-transition-name: article-category-name;
  }

  .list-controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 0.75rem;
    padding-bottom: 1rem;

    @media (max-width: 480px) {
      flex-direction: column;
    }
  }

  .filter-section {
    display: flex;
    align-items: flex-start;
    gap: 0.5rem;
    min-width: 0;
  }

  .filter-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    min-width: 0;
  }

  .filter-chip {
    font-size: 0.8125rem;
    padding: 0.25rem 0.625rem;
    border-radius: 9999px;
    border: 1.5px solid rgb(var(--text-faint));
    background: transparent;
    color: rgb(var(--text));
    cursor: pointer;
    transition: all 0.15s;
    white-space: nowrap;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }

    @media (hover: hover) {
      &:hover {
        border-color: rgb(var(--text));
      }
    }

    &.active {
      background: rgb(var(--text));
      color: rgb(var(--bg));
      border-color: rgb(var(--text));
    }
  }

  .filter-clear {
    font-size: 0.8125rem;
    padding: 0.25rem 0.625rem;
    border: none;
    background: none;
    color: rgb(var(--accent));
    cursor: pointer;
    white-space: nowrap;
    flex-shrink: 0;

    @media (hover: hover) {
      &:hover {
        opacity: 0.7;
      }
    }
  }

  .sort-section {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    flex-shrink: 0;
  }

  .sort-label {
    font-size: 0.875rem;
    color: rgb(var(--text-muted));
  }

  .sort-direction {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    color: rgb(var(--text));
    cursor: pointer;
    border-radius: 0.375rem;

    @media (hover: hover) {
      &:hover {
        background: rgb(var(--text) / 0.08);
      }
    }
  }

  .empty-state {
    padding: 3rem 1rem;
    text-align: center;
    color: rgb(var(--text-muted));
  }

  .article-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-template-rows: auto;

    a {
      color: rgb(var(--text));
      text-decoration: none;
    }
  }
}
</style>
