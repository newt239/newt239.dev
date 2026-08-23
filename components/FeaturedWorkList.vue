<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";
import WorkItem from "~/components/WorkItem.vue";

const { data: works } = await useAsyncData("featured-works", () =>
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
    grid-template-columns: repeat(auto-fill, minmax(var(--card-min-width), 1fr));
    gap: 1rem;

    a {
      color: rgb(var(--text));
      text-decoration: none;
    }
  }

  .see-all-works {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 1rem 0;
    color: rgb(var(--text));
    background: rgb(var(--surface));
    border: var(--border-width) solid transparent;
    border-radius: var(--radius-md);
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
