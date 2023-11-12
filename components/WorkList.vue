<script setup lang="ts">
const works = await queryContent("works").sort({ creation: -1 }).find();

const active = useState();
</script>

<template>
  <div v-show="works && works.length !== 0" class="workList">
    <h2 class="work-title">Works</h2>
    <div class="cardGrid">
      <NuxtLink
        v-for="work in works"
        :key="work._path"
        :to="`${work._path}`"
        class="card"
        :class="{ 'active-work': active === work._path }"
        @click="active = work._path"
      >
        <div class="card-thumbnail-wrapper no-underline">
          <NuxtImg
            class="card-thumbnail"
            :src="`images/${work.thumbnail}`"
            :alt="`${work.title}のサムネイル画像`"
          />
          <div class="hover-caption" aria-hidden="true">OPEN</div>
        </div>
        <div class="card-body">
          <h3>{{ work.title }}</h3>
          <p class="no-underline">{{ work.description }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss">
.work-title {
  view-transition-name: work-title;
}
.cardGrid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  a {
    color: white;
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
        color: $color-white;
        background-color: $color-black;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      p {
        margin-top: 0;
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
</style>
