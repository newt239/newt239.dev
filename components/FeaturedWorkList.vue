<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";
import WorkItem from "~/components/WorkItem.vue";

const { data: works } = useLazyAsyncData("featured-works", () =>
  queryCollection("works")
    .where("order", "IS NOT NULL")
    .order("order", "ASC")
    .all()
);
</script>

<template>
  <div v-show="works && works.length !== 0" class="work-list">
    <h2 v-colorful-heading class="category-title" lang="en">Works</h2>
    <div class="card-grid">
      <WorkItem v-for="(work, index) in works" :key="work.path" :work="work" :priority="index === 0" />
      <NuxtLink to="works" class="see-all-works">
        <span>
          すべての作品を見る
          <IconChevronRight aria-hidden="true" />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.work-list {
  .category-title {
    view-transition-name: work-category-name;
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

  .see-all-works {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem 0;
    border: 2px solid transparent;
    border-radius: 0.75rem;
    background: rgb(var(--surface));
    color: rgb(var(--text));
    transition: var(--transition);

    @media (hover: hover) {
      &:hover {
        border-color: rgb(var(--text));
      }
    }

    @media (hover: none) {
      &:active {
        border-color: rgb(var(--text));
      }
    }
  }
}
</style>
