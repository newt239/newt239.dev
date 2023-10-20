<script lang="ts" setup>
import BrandTwitterIcon from "~/components/icons/BrandTwitterIcon.vue";
import BrandGithubIcon from "~/components/icons/BrandGithubIcon.vue";
</script>

<template>
  <footer>
    <div class="copyright">© newt 2023</div>
    <div class="contact">
      <a href="https://twitter.com/newt239" target="_blank" title="Twitter">
        <BrandTwitterIcon
      /></a>
      <a href="https://github.com/newt239" target="_blank" title="GitHub">
        <BrandGithubIcon
      /></a>
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  max-width: 1280px;
  margin: 2rem auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem 2rem;
  .contact {
    display: flex;
    gap: 1rem;
    a {
      color: $color-white;
      transition: all 0.2s;

      &:hover {
        color: $color-link;
      }
    }
  }
}
</style>
