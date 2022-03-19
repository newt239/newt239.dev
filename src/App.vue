<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterLink to="/" class="headerWrapper">
    <header>
      <img src="/img/logo.svg" />
      <h1>newt</h1>
    </header>
  </RouterLink>
  <div class="wrapper">
    <RouterView />
    <div class="copyright">© 2022 newt</div>
  </div>
</template>

<style lang="scss">
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 0.5rem;
  .wrapper {
    padding: 0 1.5rem;
  }
}

.headerWrapper {
  display: block;
  position: sticky;
  top: 0;
  color: $color-white;
  background-color: $color-black;
  padding: 1rem;
  border: 0.3rem $color-white solid;
  border-top: 0;
  border-radius: 0 0 2rem 2rem;
  z-index: 10;
  &:hover {
    opacity: 1;
  }
  header {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
}

main {
  margin: 1rem;
}

.copyright {
  padding: 1rem;
  width: 100%;
  text-align: center;
}
</style>
