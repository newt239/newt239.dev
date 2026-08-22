<script setup lang="ts">
const works = await queryCollection('works').order("period", "DESC").all();

useSeoMeta({
  title: "作品一覧 - newt239.dev",
  ogTitle: "作品一覧 - newt239.dev",
  ogImage: "https://newt239.dev/og/works.png",
  twitterImage: "https://newt239.dev/og/works.png",
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

const sortAsc = ref(false);
const featuredOnly = ref(false);
const draftSortAsc = ref(false);
const draftFeaturedOnly = ref(false);

watch(() => route.query, (query) => {
  sortAsc.value = query.dir === "asc";
  featuredOnly.value = query.featured === "1";
  draftSortAsc.value = sortAsc.value;
  draftFeaturedOnly.value = featuredOnly.value;
}, { immediate: true });

const applyControls = async () => {
  const update = async () => {
    sortAsc.value = draftSortAsc.value;
    featuredOnly.value = draftFeaturedOnly.value;
    const query: Record<string, string> = {};
    if (sortAsc.value) query.dir = "asc";
    if (featuredOnly.value) query.featured = "1";
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
      <div class="list-header">
        <h2 v-colorful-heading class="category-name" lang="en">Works</h2>

        <ListControlBar
          filter-label="絞り込み"
          :sort-asc="draftSortAsc"
          :has-conditions="featuredOnly || sortAsc"
          :dirty="draftFeaturedOnly !== featuredOnly || draftSortAsc !== sortAsc"
          @update:sort-asc="draftSortAsc = $event"
          @apply="applyControls"
        >
          <FilterChip
            :active="draftFeaturedOnly"
            @click="draftFeaturedOnly = !draftFeaturedOnly"
          >
            おすすめ
          </FilterChip>
        </ListControlBar>
      </div>

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

  .list-header {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    column-gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .empty-state {
    padding: 3rem 1rem;
    text-align: center;
    color: rgb(var(--text-muted));
  }

  .card-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(var(--card-min-width), 1fr));

    a {
      color: rgb(var(--text));
      text-decoration: none;
    }
  }

}
</style>
