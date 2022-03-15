<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterLink to="/">
    <header>
      <img src="@/assets/logo.svg" />
      <h1>newt</h1>
    </header>
  </RouterLink>
  <div class="wrapper">
    <RouterView />
    <div class="copyright">(c) 2022 newt</div>
  </div>
</template>

<style lang="scss">
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem;
}

header {
  color: $color-text;
  display: flex;
  align-items: center;
  gap: 2rem;
}

main {
  margin: 1rem;
}

.copyright {
  width: 100%;
  text-align: center;
}
</style>
