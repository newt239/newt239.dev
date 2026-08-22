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

const route = useRoute();
const router = useRouter();

const selectedSites = ref<Set<SiteName>>(new Set());
const sortAsc = ref(false);
const draftSelectedSites = ref<Set<SiteName>>(new Set());
const draftSortAsc = ref(false);

watch(() => route.query, (query) => {
  sortAsc.value = query.dir === "asc";
  const raw = query.sites;
  const sites = (typeof raw === "string" ? raw : "").split(",").filter(Boolean);
  selectedSites.value = new Set(sites as SiteName[]);
  draftSortAsc.value = sortAsc.value;
  draftSelectedSites.value = new Set(selectedSites.value);
}, { immediate: true });

const applyControls = async () => {
  const update = async () => {
    sortAsc.value = draftSortAsc.value;
    selectedSites.value = new Set(draftSelectedSites.value);
    const query: Record<string, string> = {};
    if (selectedSites.value.size > 0) query.sites = [...selectedSites.value].join(",");
    if (sortAsc.value) query.dir = "asc";
    await router.replace({ query });
    await nextTick();
  };
  if (!("startViewTransition" in document)) {
    await update();
    return;
  }
  const transition = document.startViewTransition({ types: ["list-filter"], update });
  await Promise.allSettled([transition.finished, transition.updateCallbackDone]);
};

const toggleDraftSite = (site: SiteName) => {
  const next = new Set(draftSelectedSites.value);
  if (next.has(site)) {
    next.delete(site);
  } else {
    next.add(site);
  }
  draftSelectedSites.value = next;
};

const draftDirty = computed(() =>
  draftSortAsc.value !== sortAsc.value
  || draftSelectedSites.value.size !== selectedSites.value.size
  || [...draftSelectedSites.value].some((site) => !selectedSites.value.has(site))
);

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
      <div class="list-header">
        <h1 v-colorful-heading class="category-name" lang="en">Articles</h1>

        <ListControlBar
          filter-label="サイト"
          :sort-asc="draftSortAsc"
          :has-conditions="selectedSites.size > 0 || sortAsc"
          :dirty="draftDirty"
          @update:sort-asc="draftSortAsc = $event"
          @apply="applyControls"
        >
          <FilterChip
            v-for="site in allSites"
            :key="site"
            :active="draftSelectedSites.has(site)"
            @click="toggleDraftSite(site)"
          >
            {{ site }}
          </FilterChip>
        </ListControlBar>
      </div>

      <p class="visually-hidden" role="status">
        {{ sortAsc ? "古い順" : "新しい順" }}で{{ filteredArticles.length }}件表示しています
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
  </main>
</template>

<style>
.article-list-page {
  container-type: inline-size;

  .category-name {
    view-transition-name: article-category-name;
  }

  .list-header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1.5rem;

    @container (max-width: 16em) {
      grid-template-columns: 1fr;
      justify-items: start;
      row-gap: var(--list-header-row-gap);
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
    grid-template-columns: repeat(auto-fill, minmax(var(--card-min-width), 1fr));
    grid-template-rows: auto;

    a {
      color: rgb(var(--text));
      text-decoration: none;
    }
  }

}
</style>
