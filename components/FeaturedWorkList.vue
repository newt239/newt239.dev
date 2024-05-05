<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";

const works = await queryContent('/works').where({ featured: true }).sort({ order: 1 }).find();
const active = ref<string>("");
</script>

<template>
  <div v-show="works && works.length !== 0" class="workList">
    <h2 class="categoryTitle">
      Works
    </h2>
    <div class="cardGrid">
      <NuxtLink v-for="work in works" :key="work._path" :to="`${work._path}`" class="card"
        :class="{ 'active-work': active === work._path }" @click="active = work._path!">
        <img class="cardThumbnail" :src="`images/${work.thumbnail}`" :alt="`${work.title}のサムネイル画像`">
        <div class="cardBody">
          <h3>{{ work.title }}</h3>
          <p>
            {{ work.description }}
          </p>
        </div>
      </NuxtLink>
      <NuxtLink to="works" class="seeAllWorks">
        <span>
          すべての作品を見る
          <IconChevronRight />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style>
.workList {
  .categoryTitle {
    view-transition-name: work-category-name;
  }

  .cardGrid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

    a {
      color: rgb(var(--color-text));
      text-decoration: none;
    }

    .card {
      display: flex;
      flex-direction: column;
      color: rgb(var(--color-text));
      background-color: rgb(var(--color-back-secondary));
      border: 2px solid rgb(var(--color-back-secondary));
      border-radius: 0.5rem;
      filter: drop-shadow(2px 4px 6px black);
      transition: all 0.2s;

      @media (hover: hover) {
        &:hover {
          filter: none;
        }
      }

      @media (hover: none) {
        &:active {
          filter: none;
        }
      }

      .cardThumbnail {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: 0.5rem 0.5rem 0 0;
        -webkit-touch-callout: none;
        pointer-events: none;
      }

      .cardBody {
        padding: 1rem;

        h3 {
          margin: 0;
          padding: 0;
          font-size: 1.5rem;
          line-height: 1.8rem;
          color: rgb(var(--color-text));
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        p {
          margin: 0;
          color: rgb(var(--color-text));
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }

      &.active-work {
        img {
          view-transition-name: work-thumbnail;
        }

        h3 {
          view-transition-name: work-name;
        }
      }
    }
  }

  .seeAllWorks {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem 0;
    border-radius: 0.5rem;
    border: 2px solid rgb(var(--color-back-secondary));
    color: rgb(var(--color-text));
    background-color: rgb(var(--color-back));
    filter: drop-shadow(2px 4px 6px black);
  }
}
</style>
