<script setup lang="ts">
import { articleList } from "~/libs/articles";
import { personId } from "~/libs/person";

useSeoMeta({
  title: "記事一覧 - newt239.dev",
  ogTitle: "記事一覧 - newt239.dev",
  ogImage: "https://newt239.dev/og/articles.png",
  twitterImage: "https://newt239.dev/og/articles.png",
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
              datePublished: article.date,
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

const getSiteKey = (url: string): SiteName => {
  if (url.startsWith("https://qiita.com/")) return "Qiita";
  if (url.startsWith("https://zenn.dev/")) return "Zenn";
  if (url.startsWith("https://newt239.hatenablog.com/")) return "はてな";
  if (url.startsWith("https://developers.cyberagent.co.jp/")) return "CyberAgent";
  return "その他";
};

const allSites = computed(() => {
  const siteSet = new Set<SiteName>();
  for (const article of articleList) {
    siteSet.add(getSiteKey(article.url));
  }
  return [...siteSet];
});

const { applied, draft, dirty, hasConditions, apply } = useListControls(
  (query) => ({
    sortAsc: query.dir === "asc",
    sites: new Set(
      (typeof query.sites === "string" ? query.sites : "").split(",").filter(Boolean) as SiteName[]
    ),
  }),
  ({ sortAsc, sites }) => ({
    ...(sites.size > 0 ? { sites: [...sites].join(",") } : {}),
    ...(sortAsc ? { dir: "asc" } : {}),
  })
);

const filteredArticles = computed(() => {
  let result = [...articleList];

  if (applied.value.sites.size > 0) {
    result = result.filter((article) => applied.value.sites.has(getSiteKey(article.url)));
  }

  result.sort((a, b) => {
    return applied.value.sortAsc
      ? a.date.localeCompare(b.date)
      : b.date.localeCompare(a.date);
  });

  return result;
});
</script>

<template>
  <div>
    <div class="container article-list-page">
      <div class="list-header">
        <h1 v-colorful-heading class="category-name" lang="en">Articles</h1>

        <ListControlBar
          filter-label="サイト"
          :sort-asc="draft.sortAsc"
          :has-conditions="hasConditions"
          :dirty="dirty"
          @update:sort-asc="draft.sortAsc = $event"
          @apply="apply"
        >
          <FilterChip
            v-for="site in allSites"
            :key="site"
            :active="draft.sites.has(site)"
            @click="draft.sites.has(site) ? draft.sites.delete(site) : draft.sites.add(site)"
          >
            {{ site }}
          </FilterChip>
        </ListControlBar>
      </div>

      <p class="visually-hidden" role="status">
        {{ applied.sortAsc ? "古い順" : "新しい順" }}で{{ filteredArticles.length }}件表示しています
      </p>

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
          heading-level="h2"
        />
      </div>
      <BackToTop />
    </div>
  </div>
</template>

<style>
.article-list-page {
  container-type: inline-size;

  .category-name {
    view-transition-name: article-category-name;
  }

  .article-grid {
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(var(--card-min-width), 1fr));
    gap: 1rem;

    a {
      color: rgb(var(--text));
      text-decoration: none;
    }
  }
}
</style>
