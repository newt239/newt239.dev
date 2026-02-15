<script setup lang="ts">
import { IconCheck, IconSortAscending, IconSortDescending } from "@tabler/icons-vue";

const works = await queryCollection('works').order("period", "DESC").all();

useSeoMeta({
  title: "作品一覧 - newt239.dev",
  ogTitle: "作品一覧 - newt239.dev",
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

function toggleSort() {
  sortAsc.value = !sortAsc.value;
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
      <h2 class="category-name" lang="en">Works</h2>

      <div class="list-controls">
        <div class="filter-section">
          <button
            class="filter-chip"
            :class="{ active: featuredOnly }"
            @click="toggleFeatured"
          >
            <IconCheck v-if="featuredOnly" :size="16" class="filter-chip-icon" aria-hidden />
            <span>おすすめ</span>
          </button>
        </div>
        <div class="sort-section">
          <span class="sort-label">時期</span>
          <button class="sort-direction" :aria-label="sortAsc ? '昇順' : '降順'" @click="toggleSort">
            <IconSortAscending v-if="sortAsc" :size="18" />
            <IconSortDescending v-else :size="18" />
          </button>
        </div>
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

  .list-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding-bottom: 1rem;
    flex-wrap: wrap;
  }

  .filter-section {
    display: flex;
    align-items: center;
    gap: 0.375rem;
  }

  .filter-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    font-family: inherit;
    font-size: 0.875rem;
    padding: 0.25rem 0.75rem;
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

    .filter-chip-icon {
      flex-shrink: 0;
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
        background: rgb(var(--surface-hover));
      }
    }
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
