<script lang="ts" setup>
import { IconBrandTwitter, IconBrandGithub } from "@tabler/icons-vue";
</script>

<template>
  <footer>
    <div class="copyright">© newt 2024</div>
    <div class="contact">
      <a href="https://twitter.com/newt239" target="_blank" title="Twitter">
        <IconBrandTwitter
      /></a>
      <a href="https://github.com/newt239" target="_blank" title="GitHub">
        <IconBrandGithub
      /></a>
    </div>
  </footer>
</template>

<style>
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
      color: var(--color-white);
      transition: all 0.2s;

      &:hover {
        color: var(--color-link);
      }
    }
  }
}
</style>
