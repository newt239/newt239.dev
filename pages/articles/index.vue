<script setup lang="ts">
import { articleList } from "~/libs/articles";
import { personId } from "~/libs/person";

useSeoMeta({
  title: "記事一覧 - newt239.dev",
  ogTitle: "記事一覧 - newt239.dev",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://newt239.dev/articles#webpage",
        name: "記事一覧 - newt239.dev",
        url: "https://newt239.dev/articles",
        inLanguage: "ja",
        isPartOf: { "@id": "https://newt239.dev/#website" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: articleList.length,
          itemListElement: articleList.map((article, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "BlogPosting",
              headline: article.title,
              url: article.url,
              datePublished: article.date.replaceAll("/", "-"),
              inLanguage: "ja",
              author: { "@id": personId },
            },
          })),
        },
      },
    },
    {
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: "https://newt239.dev" },
          { "@type": "ListItem", position: 2, name: "記事一覧" },
        ],
      },
    },
  ],
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

watch(() => route.query, (query) => {
  sortAsc.value = query.dir === "asc";
  const raw = query.sites;
  if (!raw) {
    selectedSites.value = new Set();
  } else {
    const arr = (typeof raw === "string" ? raw : raw[0] || "").split(",").filter(Boolean);
    selectedSites.value = new Set(arr as SiteName[]);
  }
});

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

function setSort(asc: boolean) {
  if (sortAsc.value === asc) return;
  sortAsc.value = asc;
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
      <h2 v-colorful-heading class="category-name" lang="en">Articles</h2>

      <ListControlBar
        filter-label="サイト"
        filter-label-id="articles-filter-label"
        sort-label-id="articles-sort-label"
        :sort-asc="sortAsc"
        @update:sort-asc="setSort"
      >
        <FilterChip
          v-for="site in allSites"
          :key="site"
          :active="selectedSites.has(site)"
          @click="toggleSite(site)"
        >
          {{ site }}
        </FilterChip>
      </ListControlBar>

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
      <BackToTop />
    </div>
  </main>
</template>

<style>
.article-list-page {
  .category-name {
    view-transition-name: article-category-name;
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
