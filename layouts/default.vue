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
    <div class="footer">
      <div class="copyright">© 2022 newt</div>
      <div class="contact">
        <a href="https://github.com/newt239" target="_blank">
          <brand-github-icon
        /></a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 0.5rem;
  width: 100%;

  .footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    padding: 1rem;

    .contact {
      a {
        color: $color-white;
      }
    }
  }
}

.page-enter-active,
.page-leave-active {
  transition: opacity 1s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
