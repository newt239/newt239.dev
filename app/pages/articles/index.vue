<script setup lang="ts">
import { articleList, articleSite } from "~/lib/articles";
import { siteName, siteUrl } from "~/lib/constants";
import { personId } from "~/lib/person";

usePageSeo({ title: "記事一覧", ogImage: `${siteUrl}/og/articles.png` });

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${siteUrl}/articles#webpage`,
        name: `記事一覧 - ${siteName}`,
        url: `${siteUrl}/articles`,
        inLanguage: "ja",
        isPartOf: { "@id": `${siteUrl}/#website` },
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
          { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "記事一覧" },
        ],
      },
    },
  ],
});

const allSites = [...new Set(articleList.map((article) => articleSite(article.url).name))];

const { applied, draft, dirty, hasConditions, apply } = useListControls(
  (query) => ({
    sortAsc: query.dir === "asc",
    sites: new Set((typeof query.sites === "string" ? query.sites : "").split(",").filter(Boolean)),
  }),
  ({ sortAsc, sites }) => {
    const query: Record<string, string> = {};
    if (sites.size > 0) query.sites = [...sites].toSorted().join(",");
    if (sortAsc) query.dir = "asc";
    return query;
  }
);

const filteredArticles = computed(() => {
  const result = applied.value.sites.size > 0
    ? articleList.filter((article) => applied.value.sites.has(articleSite(article.url).name))
    : articleList;
  return result.toSorted((a, b) => {
    return applied.value.sortAsc
      ? a.date.localeCompare(b.date)
      : b.date.localeCompare(a.date);
  });
});
</script>

<template>
  <div>
    <div class="container list-page">
      <div v-reveal class="list-header">
        <h1 class="category-name" lang="en">Articles</h1>

        <ListControlBar
          v-model:sort-asc="draft.sortAsc"
          filter-label="サイト"
          :has-conditions="hasConditions"
          :dirty="dirty"
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
      <div v-else class="card-grid">
        <ArticleItem
          v-for="article in filteredArticles"
          :key="article.url"
          v-reveal
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
