<script setup lang="ts">
import { IconExternalLink } from "@tabler/icons-vue";

import { siteName, siteUrl } from "~/lib/constants";
import { discordInviteUrl, socialLinks, type SocialLink } from "~/lib/links";
import { bioLines, person } from "~/lib/person";

usePageSeo({ title: "わたしについて", ogImage: `${siteUrl}/og/about.png` });

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${siteUrl}/about#webpage`,
        name: `わたしについて - ${siteName}`,
        url: `${siteUrl}/about`,
        inLanguage: "ja",
        isPartOf: { "@id": `${siteUrl}/#website` },
        mainEntity: person,
      },
    },
  ],
});

const contacts = [
  { label: "メール", href: `mailto:${person.email}`, text: person.email, external: false },
  {
    label: "Discordサーバー",
    href: discordInviteUrl,
    text: discordInviteUrl,
    external: true,
  },
] as const;

const interests = [
  { category: "Webフロントエンド", items: ["Webアクセシビリティ", "Web標準化"] },
  { category: "UI/UX, デザイン", items: ["フォント", "デザインシステム"] },
] as const;

const hobbies = [
  {
    title: "好きなアニメ",
    items: [
      "響け！ユーフォニアム",
      "色づく世界の明日から",
      "Charlotte",
      "君が死ぬまで恋をしたい",
    ],
  },
  {
    title: "好きなアーティスト",
    items: ["DECO*27", "*Luna", "Orangestar", "HoneyWorks", "Mrs. GREEN APPLE"],
  },
  {
    title: "好きな書体",
    items: ["LINE Seed JP", "ユールカ", "新ゴ", "筑紫アンティークゴシック"],
  },
] as const;

const links: SocialLink[] = [
  socialLinks.hatena,
  socialLinks.mixi2,
  socialLinks.annict,
  socialLinks.booklog,
  socialLinks.linkedin,
];
</script>

<template>
  <div>
    <div class="container about-page">
      <div class="about-layout sidebar-layout">
      <div class="about-hero sidebar-layout-aside">
        <img src="/icon.webp" alt="" class="profile-icon">
        <div class="hero-info">
          <h1 v-colorful-heading>newt <span class="sub">@newt239</span></h1>
          <dl class="basic-info meta-list">
            <dt>誕生日</dt>
            <dd>{{ new Date(person.birthDate).toLocaleDateString("ja-JP", { dateStyle: "long", timeZone: "UTC" }) }}</dd>
            <dt>所属</dt>
            <dd>芝浦工業大学 3年<br>デザイン工学部 デザイン工学科<br>ロボティクス・情報デザイン系</dd>
          </dl>
        </div>
      </div>

      <div class="about-sections sidebar-layout-main">
        <p class="about-bio">
          <template v-for="([lead, phrase], index) in bioLines" :key="lead">
            <br v-if="index > 0">{{ lead }}<span v-if="phrase" class="phrase">{{ phrase }}</span>
          </template>
        </p>

        <section id="contact" class="about-section" tabindex="-1">
          <h2 class="section-heading">コンタクト</h2>
          <div class="section-body">
            <ul>
              <li v-for="contact in contacts" :key="contact.label">
                {{ contact.label }}
                <ul>
                  <li>
                    <a
                      :href="contact.href"
                      :target="contact.external ? '_blank' : undefined"
                      :rel="contact.external ? 'noopener noreferrer' : undefined"
                    >
                      {{ contact.text }}
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <section class="about-section">
          <h2 class="section-heading">興味・関心</h2>
          <div class="section-body">
            <ul>
              <li v-for="interest in interests" :key="interest.category">
                {{ interest.category }}
                <ul>
                  <li v-for="item in interest.items" :key="item">{{ item }}</li>
                </ul>
              </li>
            </ul>
          </div>
        </section>

        <section class="about-section">
          <h2 class="section-heading">趣味</h2>
          <div class="section-body hobbies">
            <div v-for="hobby in hobbies" :key="hobby.title">
              <h3>{{ hobby.title }}</h3>
              <ul>
                <li v-for="item in hobby.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </div>
        </section>

        <section class="about-section">
          <h2 class="section-heading">リンク集</h2>
          <div class="section-body link-list">
            <a
              v-for="link in links"
              :key="link.href"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              class="link-row"
            >
              <BrandLogo :logo="link.logo" :logo-on-dark="link.logoOnDark" :size="24" class="link-logo" />
              {{ link.name }}
              <IconExternalLink class="external-icon" aria-hidden="true" />
            </a>
          </div>
        </section>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  container-type: inline-size;

  .sub {
    font-size: 50%;
    color: oklch(var(--text-muted));
  }

  .about-layout {
    > .about-hero {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      align-items: center;
      padding: 2rem 0;
      text-align: center;
    }

    .profile-icon {
      flex-shrink: 0;
      width: 160px;
      height: 160px;
      object-fit: cover;
      border-radius: var(--radius-round);
      corner-shape: round;
    }

    .hero-info {
      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        padding: 0 0 0.75rem;
      }
    }

    .basic-info {
      justify-items: center;
    }

    @container (width >= 37rem) {
      > .about-hero {
        padding: 0;
      }

      .profile-icon {
        width: 120px;
        height: 120px;
      }
    }

    @media print {
      > .about-hero {
        padding-bottom: 1.5rem;
      }
    }
  }

  .about-sections {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-bottom: 2rem;
  }

  .about-bio {
    width: fit-content;
    margin: 0;
    line-height: var(--line-height-loose);
    text-wrap: pretty;
    view-transition-name: profile-bio;

    .phrase {
      display: inline-block;
    }
  }

  .about-section {
    h3 {
      padding: 0;
      margin: 0 0 0.25rem;
      font-size: 1rem;
    }

    .hobbies {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(12.5rem, 100%), 1fr));
      gap: 1rem;

      > div {
        min-width: 0;
      }
    }

    .link-list {
      display: flex;
      flex-direction: column;
      gap: 0;
      padding: 0;
      overflow: hidden;
    }

    .link-row {
      display: flex;
      gap: 0.25rem;
      align-items: center;
      padding: 0.75rem 1.5rem;
      font-weight: 800;
      color: oklch(var(--accent));
      text-decoration: underline;
      text-decoration-style: dashed;
      text-underline-offset: 0.25rem;
      transition: var(--transition);

      &:not(:last-child) {
        border-bottom: var(--border-width-hairline) solid oklch(var(--border));

        @media (forced-colors: active) {
          border-bottom-color: CanvasText;
        }
      }

      &:focus-visible {
        outline-offset: calc(var(--focus-ring-offset) * -1);
      }

      @media (hover: hover) {
        &:hover {
          text-decoration-color: transparent;
          background: oklch(var(--surface));
          opacity: var(--hover-opacity);
        }
      }

      @media (hover: none) {
        &:active {
          background: oklch(var(--surface));
        }
      }

      @media (prefers-contrast: more) {
        text-decoration-thickness: 2px;
        text-decoration-style: solid;
      }

      @media (forced-colors: active) and (hover: hover) {
        &:hover {
          text-decoration-style: solid;
        }
      }

      &:deep(.link-logo) {
        flex-shrink: 0;
        margin-right: 0.75rem;
        object-fit: contain;
      }

      @media print {
        display: block;

        /* inline-block にしないと .link-row の下線が ::after にも伝播する */
        &::after {
          display: inline-block;
          width: 100%;
          color: oklch(var(--text-muted));
        }
      }
    }
  }
}
</style>
