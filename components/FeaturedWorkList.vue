<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";
import WorkItem from '~/components/WorkItem.vue';

const works = await queryCollection('works').where("order", "IS NOT NULL").order("order", "ASC").all();
</script>

<template>
  <div v-show="works && works.length !== 0" class="work-list">
    <h2 class="category-title">
      Works
    </h2>
    <div class="card-grid">
      <WorkItem v-for="work in works" :key="work.path" :work="work" />
      <NuxtLink to="works" class="see-all-works">
        <span>
          すべての作品を見る
          <IconChevronRight />
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
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    a {
      color: rgb(var(--color-text));
      text-decoration: none;
    }
  }

  .see-all-works {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem 0;
    border-radius: 0.5rem;
    border: 2px solid rgb(var(--color-text));
    color: rgb(var(--color-text));
    background-color: rgb(var(--color-back));
    transition: all 0.2s;

    @media (hover: hover) {
      &:hover {
        scale: 1.05;
      }
    }

    @media (hover: none) {
      &:active {
        scale: 1.05;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
}
</style>
