<script lang="ts" setup>
import { IconBrandX, IconBrandGithub } from "@tabler/icons-vue";
</script>

<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-sitemap">
        <ul>
          <li><NuxtLink to="/">ホーム</NuxtLink></li>
          <li><NuxtLink to="/about">わたしについて</NuxtLink></li>
          <li><NuxtLink to="/works">作品一覧</NuxtLink></li>
          <li><NuxtLink to="/articles">記事一覧</NuxtLink></li>
          <li><NuxtLink to="/privacy">プライバシーポリシー</NuxtLink></li>
        </ul>
        <ul>
          <li>
            <a href="https://x.com/newt239" target="_blank" rel="noopener noreferrer">
              <IconBrandX :size="18" />
              X
            </a>
          </li>
          <li>
            <a href="https://github.com/newt239" target="_blank" rel="noopener noreferrer">
              <IconBrandGithub :size="18" />
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-bottom">
        <div class="copyright">&copy; newt 2026</div>
      </div>
    </div>
  </footer>
</template>

<style>
footer {
  .footer-inner {
    max-width: var(--container-max-width);
    margin: 0 auto;
    padding: 2.5rem var(--container-padding-inline) 2rem;
  }

  .footer-sitemap {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding-top: 1.5rem;
    border-top: var(--border-width-hairline) solid rgb(var(--text-muted) / 0.15);
  }

  .footer-sitemap ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
  }

  .footer-sitemap li {
    display: flex;
    align-items: center;
  }

  .footer-sitemap a {
    font-size: 0.875rem;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }

  .footer-bottom {
    margin-top: 1.5rem;
    text-align: left;
  }

  .copyright {
    font-size: 0.875rem;
    color: rgb(var(--text-muted));
  }
}
</style>
