<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";
import WorkItem from "~/components/WorkItem.vue";

const works = await queryCollection("works")
  .where("order", "IS NOT NULL")
  .order("order", "ASC")
  .all();
</script>

<template>
  <div v-show="works && works.length !== 0" class="work-list">
    <h2 class="category-title" lang="en">Works</h2>
    <div class="card-grid">
      <WorkItem v-for="work in works" :key="work.path" :work="work" />
      <NuxtLink to="works" class="see-all-works">
        <span>
          すべての作品を見る
          <IconChevronRight aria-hidden />
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
    border-radius: 0.75rem;
    background: rgb(0 0 0 / 0.035);
    color: rgb(var(--text));
    transition: background 0.2s;

    @media (hover: hover) {
      &:hover {
        background: rgb(0 0 0 / 0.08);
      }
    }

    @media (hover: none) {
      &:active {
        background: rgb(0 0 0 / 0.08);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
}
</style>
