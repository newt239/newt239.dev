<script lang="ts" setup>
import { BrandTwitterIcon, BrandGithubIcon } from "vue-tabler-icons";
</script>

<template>
  <footer>
    <div class="copyright">© newt 2023</div>
    <div class="contact">
      <a href="https://twitter.com/newt239" target="_blank">
        <brand-twitter-icon
      /></a>
      <a href="https://github.com/newt239" target="_blank">
        <brand-github-icon
      /></a>
    </div>
  </footer>
</template>

<style lang="scss">
footer {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem 2rem;
  .contact {
    display: flex;
    gap: 1rem;
    a {
      color: $color-white;
    }
  }
}
</style>
