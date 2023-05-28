<script setup lang="ts">
const profile: string[] = [
  "17さい",
  "主にWebフロントエンドの開発をしています",
  "UI / UXに興味があります",
];
</script>

<template>
  <div class="profile">
    <h2>Hi there👋</h2>
    <ul>
      <li v-for="item in profile" :key="item">
        {{ item }}
      </li>
    </ul>
    <div class="dot-bg"></div>
  </div>
</template>

<style lang="scss">
.profile {
  padding: 5vh 0 10vh;
  position: relative;
  text-shadow: 5px 5px 5px black;
  ul {
    line-height: 2;
    margin: 0;
    li {
      text-shadow: 5px 5px 5px black;
    }
  }

  .dot-bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: calc(100% + 2rem);
    background: radial-gradient(#c05621 2px, transparent 1px);
    background-size: 20px 20px;
    opacity: 0.5;
    z-index: -1;
  }
}
</style>
