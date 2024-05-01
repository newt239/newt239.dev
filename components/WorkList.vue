<script setup lang="ts">
import { IconChevronRight } from "@tabler/icons-vue";

const props = defineProps<{
  featured?: boolean;
}>();

const works = await queryContent('/works').where(props.featured ? { featured: true } : {}).sort({ creation: -1 }).find();

const active = ref<string>("");
</script>

<template>
  <div v-show="works && works.length !== 0" class="workList">
    <h2 class="work-title">
      Works
    </h2>
    <div class="cardGrid">
      <NuxtLink v-for="work in works" :key="work._path" :to="`${work._path}`" class="card"
        :class="{ 'active-work': active === work._path }" @click="active = work._path!">
        <div class="card-thumbnail-wrapper no-underline">
          <img class="card-thumbnail" :src="`images/${work.thumbnail}`" :alt="`${work.title}のサムネイル画像`">
          <div class="hover-caption" aria-hidden="true">
            OPEN
          </div>
        </div>
        <div class="card-body">
          <h3>{{ work.title }}</h3>
          <p class="no-underline">
            {{ work.description }}
          </p>
        </div>
      </NuxtLink>
      <NuxtLink to="works" class="see-all-works" v-if="props.featured">
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
  .work-title {
    view-transition-name: work-title;
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
      border-radius: 0.5rem;
      transition: all 0.5s;

      .card-thumbnail-wrapper {
        position: relative;

        .card-thumbnail {
          width: 100%;
          aspect-ratio: 16 / 9;
          object-fit: cover;
          border-radius: 0.5rem;
          filter: drop-shadow(2px 4px 6px black);
          -webkit-touch-callout: none;
          pointer-events: none;
        }

        .hover-caption {
          font-size: 2rem;
          font-weight: 800;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateY(-50%) translateX(-50%);
          mix-blend-mode: difference;
          opacity: 0;
          transition: all 0.5s;
        }
      }

      @media (hover: hover) {
        &:hover .card-thumbnail-wrapper .hover-caption {
          opacity: 1;
        }
      }

      @media (hover: none) {
        &:active .card-thumbnail-wrapper .hover-caption {
          opacity: 1;
        }
      }

      .card-body {
        margin: 0 0.5rem;

        h3 {
          margin: 0;
          padding: 0;
          font-size: 1.5rem;
          line-height: 1.8rem;
          color: rgb(var(--color-text));
          background-color: rgb(var(--color-back));
          white-space: nowrap;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        p {
          margin-top: 0;
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

  .see-all-works {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 1rem 0;
    border-radius: 0.5rem;
    border: 2px solid rgb(var(--color-black-secondary));
    color: rgb(var(--color-text));
  }
}
</style>
