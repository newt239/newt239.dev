<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

type worksProp = {
  id: string;
  title: string;
  thumbnail?: string;
  description: string;
}[]

const works = ref<worksProp>([
  {
    id: "ship-notify",
    title: "SHIP Notify",
    thumbnail: "src/assets/ship-info-screenshot.webp",
    description: "To notify the update of SHIP. Runnning on LINE ( as LINE Official Account ), Discord ( as bot at 'SHIP Info' server ), Web, Twitter."
  },
  {
    id: "quiz-flasher",
    title: "Quiz Flasher",
    thumbnail: "src/assets/quiz-flasher-screenshot.webp",
    description: "A tool to give a quiz. Import quiz data from Google Spreadsheet, then display these randomly."
  },
  {
    id: "score-watcher",
    title: "Score Watcher",
    thumbnail: "src/assets/score-watcher_thumbnail.webp",
    description: "When you hold the quiz games, you need to create scoreboard for player and watcher. Usually, scoreboard makes with Microsoft Excel, but it's difficult to reuse, so you need to make scoreboard from scratch. This software reduce these labor."
  }
]);
</script>

<template>
  <div class="cardGrid">
    <RouterLink v-for="work in works" :key="work.id" :to="'/works/' + work.id">
      <div class="card">
        <img :v-show="work.thumbnail" class="card-thumbnail" :src="work.thumbnail" />
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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  .card {
    border: 1px $color-white solid;
    border-radius: 1rem;
    transition: all 0.5s;
    .card-thumbnail {
      width: 100%;
      border-radius: 1rem 1rem 0 0;
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