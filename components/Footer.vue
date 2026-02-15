<script lang="ts" setup>
import { IconBrandX, IconBrandGithub } from "@tabler/icons-vue";
</script>

<template>
  <footer>
    <div class="footer-inner">
      <div class="footer-sitemap">
        <div class="sitemap-section">
          <h3>Pages</h3>
          <ul>
            <li><NuxtLink to="/">ホーム</NuxtLink></li>
            <li><NuxtLink to="/about">わたしについて</NuxtLink></li>
            <li><NuxtLink to="/works">作品一覧</NuxtLink></li>
            <li><NuxtLink to="/articles">記事一覧</NuxtLink></li>
            <li><NuxtLink to="/privacy">プライバシーポリシー</NuxtLink></li>
          </ul>
        </div>
        <div class="sitemap-section">
          <h3>Links</h3>
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
    max-width: 1280px;
    margin: 0 auto;
    padding: 2.5rem 2rem 2rem;
  }

  .footer-sitemap {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgb(var(--text-muted) / 0.15);
  }

  .sitemap-section {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    h3 {
      padding: 0;
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: rgb(var(--text-muted));
      margin: 0;
      flex-shrink: 0;
      width: 3.5rem;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem 1.5rem;
    }

    li {
      display: flex;
      align-items: center;
    }

    a {
      color: rgb(var(--text));
      text-decoration: none;
      font-size: 0.875rem;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      transition: color 0.2s;

      @media (hover: hover) {
        &:hover {
          color: rgb(var(--accent));
        }
      }

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }
    }
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
