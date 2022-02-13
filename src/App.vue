<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>NEWT HOUSE</h1>
  </header>
  <RouterView />
  <div class="copyright">(c) 2022 newt</div>
</template>

<style lang="scss">
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
}

main {
  margin: 1rem;
}

.copyright {
  width: 100%;
  text-align: center;
}
</style>
