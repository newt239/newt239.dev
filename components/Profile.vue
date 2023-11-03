<script setup lang="ts">
import dayjs from "dayjs";

const age = dayjs().diff(dayjs("2005-11-02"), "year");

const profile: string[] = [
  `${age}さい`,
  "主にWebフロントエンドの開発をしています",
  "UI / UXに興味があります",
];
</script>

<template>
  <div class="top-card">
    <div class="profile">
      <h2>Welcome✨</h2>
      <ul>
        <li v-for="item in profile" :key="item">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss">
.top-card {
  background-image: linear-gradient(
    to bottom right,
    oklch(80% 0.4 222),
    oklch(35% 0.5 313)
  );
  border-radius: 0.5rem;
  padding: 5vh 5vw 10vh;
}
.profile {
  position: relative;
  text-shadow: 5px 5px 5px black;
  ul {
    line-height: 2;
    margin: 0;
    li {
      text-shadow: 5px 5px 5px black;
    }
  }
}
</style>
