<script setup lang="ts">
import { RouterView } from "vue-router";
import { AtomSpinner } from "epic-spinners";

import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <div class="wrapper">
    <RouterView />
    <div class="copyright">© 2022 newt</div>
  </div>
  <div class="overlay">
    <AtomSpinner
      :animation-duration="1000"
      :size="70"
      :color="'hsl(213, 47%, 47%)'"
    />
  </div>
</template>

<style lang="scss">
#app {
  max-width: 1280px;
  margin: 0 auto;
}

.wrapper {
  padding: 0 0.5rem;

  .copyright {
    padding: 1rem;
    width: 100%;
    text-align: center;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: $color-black;

  .atom-spinner {
    margin: 0 auto;
    margin-top: 50vh;
  }
}
</style>
