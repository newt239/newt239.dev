<script>
import { BrandGithubIcon } from "vue-tabler-icons";

export default {
  components: { BrandGithubIcon },
};
</script>

<template>
  <Header />
  <div class="wrapper">
    <slot />
  </div>
  <Footer />
</template>

<style lang="scss">
.wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
  min-height: 100vh;
}
.page-enter-active,
.page-leave-active {
  transition: all 0.5s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
