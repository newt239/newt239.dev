<script lang="ts" setup>
import { socialLinks } from "~/lib/links";

const copyrightYear = useState("copyright-year", () => new Date().getFullYear());

const externalLinks = [
  { ...socialLinks.x, logo: "/x.svg", logoOnDark: "/x-white.svg" },
  { ...socialLinks.github, logo: "/github.svg", logoOnDark: "/github-white.svg" },
  { ...socialLinks.fernweh, logo: "/fernweh.svg", logoOnDark: undefined },
];
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
          <li v-for="link in externalLinks" :key="link.href">
            <a :href="link.href" target="_blank" rel="noopener noreferrer">
              <template v-if="link.logoOnDark">
                <img :src="link.logo" alt="" width="18" height="18" class="logo-light">
                <img :src="link.logoOnDark" alt="" width="18" height="18" class="logo-dark">
              </template>
              <img v-else :src="link.logo" alt="" width="18" height="18">
              {{ link.name }}
            </a>
          </li>
        </ul>
      </nav>
      <div class="footer-bottom">
        <div class="copyright">&copy; newt {{ copyrightYear }}</div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
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
  border-top: var(--border-width-hairline) solid oklch(var(--text-muted) / 15%);

  /* stylelint-disable-next-line plugin/use-baseline */
  @media (prefers-reduced-transparency: reduce) {
    border-top-color: oklch(var(--text-muted));
  }

  @media (prefers-contrast: more) {
    border-top-color: oklch(var(--border));
  }

  @media print {
    display: none;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1.5rem;
    padding: 0;
    margin: 0;
    list-style: none;
  }

  li {
    display: flex;
    align-items: center;
  }

  a {
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    font-size: 1rem;
  }
}

.footer-bottom {
  margin-top: 1.5rem;
  text-align: left;
}

.copyright {
  font-size: 0.75rem;
  color: oklch(var(--text-muted));
}
</style>
