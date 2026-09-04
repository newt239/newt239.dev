<script setup lang="ts">
import { siteUrl } from "~/libs/site";

const { data } = await useAsyncData("works-list", () =>
  queryCollection("works").order("period", "DESC").all()
);
const works = data.value ?? [];

usePageSeo({ title: "作品一覧", ogImage: `${siteUrl}/og/works.png` });

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${siteUrl}/works#webpage`,
        name: "作品一覧 - newt239.dev",
        url: `${siteUrl}/works`,
        inLanguage: "ja",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: works.length,
          itemListElement: works.map((work, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: work.title,
            url: `${siteUrl}${work.path}`,
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
          { "@type": "ListItem", position: 2, name: "作品一覧" },
        ],
      },
    },
  ],
});

const { applied, draft, dirty, hasConditions, apply } = useListControls(
  (query) => ({ sortAsc: query.dir === "asc", featuredOnly: query.featured === "1" }),
  ({ sortAsc, featuredOnly }) => {
    const query: Record<string, string> = {};
    if (sortAsc) query.dir = "asc";
    if (featuredOnly) query.featured = "1";
    return query;
  }
);

const sortedWorks = computed(() => {
  const result = applied.value.featuredOnly ? works.filter((w) => w.order != null) : works;
  return result.toSorted((a, b) => {
    return applied.value.sortAsc
      ? a.period.localeCompare(b.period)
      : b.period.localeCompare(a.period);
  });
});
</script>

<template>
  <div>
    <div class="container work-list-page">
      <div class="list-header">
        <h1 v-colorful-heading class="category-name" lang="en">Works</h1>

        <ListControlBar
          filter-label="絞り込み"
          :sort-asc="draft.sortAsc"
          :has-conditions="hasConditions"
          :dirty="dirty"
          @update:sort-asc="draft.sortAsc = $event"
          @apply="apply"
        >
          <FilterChip
            :active="draft.featuredOnly"
            @click="draft.featuredOnly = !draft.featuredOnly"
          >
            おすすめ
          </FilterChip>
        </ListControlBar>
      </div>

      <p class="visually-hidden" role="status">
        {{ applied.sortAsc ? "古い順" : "新しい順" }}で{{ sortedWorks.length }}件表示しています
      </p>

      <div v-if="sortedWorks.length === 0" class="empty-state">
        該当する作品が見つかりませんでした。
      </div>
      <div v-else class="card-grid">
        <WorkItem v-for="work in sortedWorks" :key="work.id" :work="work" heading-level="h2" />
      </div>
      <BackToTop />
    </div>
  </div>
</template>

<style scoped>
.work-list-page {
  container-type: inline-size;
}

.category-name {
  view-transition-name: work-category-name;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--card-min-width), 1fr));
  gap: 1rem;
}
</style>
