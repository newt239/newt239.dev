<script setup lang="ts">
const profile: string[] = [""];
</script>

<template>
  <div class="profile">
    <h2>PROFILE</h2>
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
