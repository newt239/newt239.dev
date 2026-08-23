<script lang="ts" setup>
import { IconBrandX, IconBrandGithub } from "@tabler/icons-vue";
</script>

<template>
  <footer>
    <div class="footer-inner">
      <nav class="footer-sitemap" aria-label="サイトマップ">
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
      </nav>
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
    padding: 2.5rem var(--container-padding-inline) 2rem
      calc(var(--container-padding-inline) + 0.5rem);
    margin: 0 auto;
  }

  .footer-sitemap {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding-top: 1.5rem;
    border-top: var(--border-width-hairline) solid rgb(var(--text-muted) / 15%);
  }

  .footer-sitemap ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .footer-sitemap li {
    display: flex;
    align-items: center;
  }

  .footer-sitemap a {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 1rem;
  }

  .footer-bottom {
    margin-top: 1.5rem;
    text-align: left;
  }

  .copyright {
    font-size: 0.75rem;
    color: rgb(var(--text-muted));
  }
}
</style>
