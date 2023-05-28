<script setup lang="ts">
const profile: string[] = [
  "17さい",
  "主にフロントエンドの開発をしています",
  "UI / UXに興味があります",
];
</script>

<template>
  <div class="profile">
    <h2>ABOUT ME</h2>
    <ul>
      <li v-for="item in profile" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style lang="scss">
.profile {
  ul {
    line-height: 2;
    margin: 0;
  }
}
</style>
