<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";

const works = await queryContent('/works').where({ featured: true }).sort({ order: 1 }).find();
</script>

<template>
  <div v-show="works && works.length !== 0" class="workList">
    <h2 class="categoryTitle">
      Works
    </h2>
    <div class="cardGrid">
      <NuxtLink v-for="work in works" :key="work._path" :to="`${work._path}`" class="card">
        <img class="cardThumbnail" :src="`images/${work.thumbnail}`" :alt="`${work.title}のサムネイル画像`"
          :style="`view-transition-name: ${work._path!.split('/')[2]}-img;`">
        <div class="cardBody">
          <h3 :style="`view-transition-name: ${work._path!.split('/')[2]}-name;`">{{ work.title }}</h3>
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
      background-color: rgb(var(--color-back));
      border: 2px solid rgb(var(--color-text));
      border-radius: 0.5rem;
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

      .cardThumbnail {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        border-radius: calc(0.5rem - 2px) calc(0.5rem - 2px) 0 0;
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
    }
  }

  .seeAllWorks {
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
  }
}
</style>
