<script setup lang="ts">
const works = await queryCollection('works').order("period", "DESC").all();

useSeoMeta({
  title: "作品一覧 - newt239.dev",
  ogTitle: "作品一覧 - newt239.dev",
});

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": "https://newt239.dev/works#webpage",
        name: "作品一覧 - newt239.dev",
        url: "https://newt239.dev/works",
        inLanguage: "ja",
        isPartOf: { "@id": "https://newt239.dev/#website" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: works.length,
          itemListElement: works.map((work, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: work.title,
            url: `https://newt239.dev${work.path}`,
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
          { "@type": "ListItem", position: 2, name: "作品一覧" },
        ],
      },
    },
  ],
});

const route = useRoute();
const router = useRouter();

const sortAsc = ref(route.query.dir === "asc");
const featuredOnly = ref(route.query.featured === "1");

watch(() => route.query, (query) => {
  sortAsc.value = query.dir === "asc";
  featuredOnly.value = query.featured === "1";
});

function updateQuery() {
  const query: Record<string, string> = {};
  if (sortAsc.value) query.dir = "asc";
  if (featuredOnly.value) query.featured = "1";
  router.replace({ query });
}

function setSort(asc: boolean) {
  if (sortAsc.value === asc) return;
  sortAsc.value = asc;
  updateQuery();
}

function toggleFeatured() {
  featuredOnly.value = !featuredOnly.value;
  updateQuery();
}

const sortedWorks = computed(() => {
  let result = [...works];

  if (featuredOnly.value) {
    result = result.filter((w) => w.order != null);
  }

  result.sort((a, b) => {
    return sortAsc.value
      ? a.period.localeCompare(b.period)
      : b.period.localeCompare(a.period);
  });

  return result;
});
</script>

<template>
  <main>
    <div class="container work-list-page">
      <h2 v-colorful-heading class="category-name" lang="en">Works</h2>

      <ListControlBar
        filter-label="絞り込み"
        filter-label-id="works-filter-label"
        sort-label-id="works-sort-label"
        :sort-asc="sortAsc"
        @update:sort-asc="setSort"
      >
        <FilterChip :active="featuredOnly" @click="toggleFeatured">
          おすすめ
        </FilterChip>
      </ListControlBar>

      <div v-if="sortedWorks.length === 0" class="empty-state">
        該当する作品が見つかりませんでした。
      </div>
      <div v-else class="card-grid">
        <WorkItem v-for="work in sortedWorks" :key="work.id" :work="work" />
      </div>
      <BackToTop />
    </div>
  </main>
</template>

<style>
.work-list-page {
  .category-name {
    view-transition-name: work-category-name;
  }

  .empty-state {
    padding: 3rem 1rem;
    text-align: center;
    color: rgb(var(--text-muted));
  }

  .card-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

    a {
      color: rgb(var(--text));
      text-decoration: none;
    }
  }

}
</style>
