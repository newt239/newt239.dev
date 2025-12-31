<script lang="ts" setup>
import { IconBrandTwitter, IconBrandGithub } from "@tabler/icons-vue";
</script>

<template>
  <footer>
    <nav class="footer-nav">
      <NuxtLink to="/about">わたしについて</NuxtLink>
      <NuxtLink to="/privacy">プライバシーポリシー</NuxtLink>
    </nav>
    <div class="footer-bottom">
      <div class="copyright">© newt 2026</div>
      <div class="contact">
        <a href="https://twitter.com/newt239" target="_blank" title="Twitter">
          <IconBrandTwitter />
        </a>
        <a href="https://github.com/newt239" target="_blank" title="GitHub">
          <IconBrandGithub />
        </a>
      </div>
    </div>
  </footer>
</template>

<style>
footer {
  max-width: 1280px;
  margin: 2rem auto 0;
  padding: 1rem 2rem 2rem;

  .footer-nav {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgb(var(--color-text-secondary) / 0.2);
    margin-bottom: 1rem;

    @media screen and (max-width: 700px) {
      gap: 1rem;
      flex-wrap: wrap;
    }

    a {
      color: rgb(var(--color-link));
      text-decoration: none;
      font-size: 0.9rem;
      border-bottom: 1px dashed rgb(var(--color-link));
      transition: all 0.2s;

      &:hover {
        opacity: 0.8;
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }
  }

  .footer-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 700px) {
      flex-direction: column;
      gap: 1rem;
    }
  }

  .contact {
    display: flex;
    gap: 1rem;

    a {
      color: rgb(var(--color-text));
      transition: all 0.2s;

      &:hover {
        color: rgb(var(--color-link));
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }
  }
}
</style>
