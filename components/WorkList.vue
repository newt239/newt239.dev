<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import { createClient } from "microcms-js-sdk";

type worksProp = {
  id: string;
  title: string;
  thumbnail: {
    url: string;
  };
  description: string;
};

const works = ref<worksProp[]>([]);

const client = createClient({
  serviceDomain: "newt-house",
  apiKey: import.meta.env.VITE_API_KEY as string,
});

onMounted(() => {
  client
    .get({
      endpoint: "works",
    })
    .then((res: { contents: worksProp[] }) => {
      works.value = res.contents;
    })
    .catch((err) => console.error(err));
});
</script>

<template>
  <div class="cardGrid">
    <RouterLink v-for="work in works" :key="work.id" :to="'/works/' + work.id">
      <div class="card">
        <div class="card-thumbnail-wrapper">
          <img
            :v-show="work.thumbnail"
            class="card-thumbnail"
            :src="work.thumbnail.url"
          />
          <div class="hover-caption">VIEW</div>
        </div>
        <div class="card-body">
          <h3>{{ work.title }}</h3>
          <p>{{ work.description }}</p>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
a {
  color: white;
}

.cardGrid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));

  .card {
    border-radius: 0.5rem;
    transition: all 0.5s;

    .card-thumbnail-wrapper {
      position: relative;

      .card-thumbnail {
        width: 100%;
        aspect-ratio: 16 / 9;
        border-radius: 0.5rem;
        filter: drop-shadow(2px 4px 6px black);
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

    &:hover .card-thumbnail-wrapper .hover-caption {
      opacity: 1;
    }

    .card-body {
      margin: 0 1rem;

      h3 {
        margin: 0;
        padding: 0;
        font-size: 1.5rem;
        color: $color-white;
        background-color: $color-black;
      }

      p {
        margin-top: 0;
        height: 5rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
      }
    }
  }
}

.ship-notify {
  grid-column: 1 2;
  grid-row: 1 2;
}

.quiz-flasher {
  grid-column: 2 3;
  grid-row: 1 2;
}
</style>