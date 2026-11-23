<script setup lang="ts">
usePageSeo({ title: "プライバシーポリシー" });

const sections = {
  analytics: "アクセス解析ツールについて",
  purpose: "個人情報の利用目的",
  disclaimer: "免責事項",
  copyright: "著作権・肖像権",
  changes: "プライバシーポリシーの変更",
} as const;

const tocItems = Object.entries(sections).map(([id, text]) => ({ id, text }));
const sectionList = useTemplateRef<HTMLElement>("sectionList");
</script>

<template>
  <div>
    <div class="container privacy-page">
      <div class="privacy-layout">
      <div class="privacy-header">
        <h1 v-colorful-heading>プライバシーポリシー</h1>
        <p class="privacy-intro">newt239.dev（以下、「当サイト」といいます）では、ユーザーの皆様の個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。</p>
      </div>

      <TableOfContents class="privacy-toc" :items="tocItems" :container="sectionList" />

      <div ref="sectionList" class="privacy-sections">
        <section id="analytics" class="privacy-section" tabindex="-1">
          <h2 class="section-heading">{{ sections.analytics }}</h2>
          <div class="section-body">
            <p>当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。このGoogle Analyticsはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。</p>
            <p>この機能はCookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer">Googleアナリティクス利用規約</a>や<a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">Googleポリシーと規約</a>をご覧ください。</p>
          </div>
        </section>

        <section id="purpose" class="privacy-section" tabindex="-1">
          <h2 class="section-heading">{{ sections.purpose }}</h2>
          <div class="section-body">
            <p>当サイトでは、メールでのお問い合わせやコメントの際に、お名前やメールアドレス等の個人情報をご入力いただく場合があります。取得した個人情報は、必要な連絡のみに利用させていただくもので、これらの目的以外では利用いたしません。また、取得した個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。</p>
            <ul>
              <li>本人の同意が得られた場合</li>
              <li>法令により開示が求められた場合</li>
            </ul>
          </div>
        </section>

        <section id="disclaimer" class="privacy-section" tabindex="-1">
          <h2 class="section-heading">{{ sections.disclaimer }}</h2>
          <div class="section-body">
            <p>当サイトのコンテンツについては、可能な限り正確な情報を掲載するよう努めておりますが、正確性や安全性を保証するものではありません。当サイトに掲載された内容によって生じた損害等については、一切の責任を負いかねますのでご了承ください。</p>
            <p>また、当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、サービス等について一切の責任も負いません。</p>
          </div>
        </section>

        <section id="copyright" class="privacy-section" tabindex="-1">
          <h2 class="section-heading">{{ sections.copyright }}</h2>
          <div class="section-body">
            <p>当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。当サイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、<NuxtLink to="/about#contact">お問い合わせ</NuxtLink>よりご連絡ください。迅速に対応いたします。</p>
          </div>
        </section>

        <section id="changes" class="privacy-section" tabindex="-1">
          <h2 class="section-heading">{{ sections.changes }}</h2>
          <div class="section-body">
            <p>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。</p>
          </div>
        </section>
        <p class="last-updated">制定日：2025年10月21日</p>
      </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.privacy-page {
  container-type: inline-size;
  line-height: var(--line-height-body);
  overflow-wrap: anywhere;

  .privacy-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    column-gap: var(--grid-gap);
    align-items: start;

    > .privacy-toc {
      display: none;
    }

    @container (width >= 37rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));

      > .privacy-header {
        grid-row: 1;
        grid-column: 1;
      }

      > .privacy-sections {
        grid-row: 2;
        grid-column: 1;
      }

      > .privacy-toc {
        position: sticky;
        top: calc(var(--header-height) + var(--grid-gap));
        display: block;
        grid-row: 1 / span 2;
        grid-column: 2;
        max-height: calc(100dvh - var(--header-height) - 2 * var(--grid-gap));
        overflow-y: auto;
      }
    }

    @container (width >= 55.5rem) {
      grid-template-columns: repeat(3, minmax(0, 1fr));

      > .privacy-header,
      > .privacy-sections {
        grid-column: 1 / span 2;
      }

      > .privacy-toc {
        grid-column: 3;
      }
    }

    @container (width >= 74rem) {
      grid-template-columns: repeat(4, minmax(0, 1fr));

      > .privacy-header,
      > .privacy-sections {
        grid-column: 1 / span 3;
      }

      > .privacy-toc {
        grid-column: 4;
      }
    }

    /* A4 縦の印刷幅は 37rem を超えるので 1 カラムへ戻す */
    @media print {
      grid-template-columns: minmax(0, 1fr);

      > .privacy-header,
      > .privacy-sections {
        grid-area: auto;
      }

      > .privacy-toc {
        display: none;
      }
    }
  }

  .privacy-header {
    > h1 {
      margin-bottom: 0.5rem;
      font-size: var(--font-size-title);
    }

    .privacy-intro {
      margin: 0 0 2rem;
      color: oklch(var(--text-muted));
    }
  }

  .privacy-sections {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .privacy-section {
    .section-body {
      p {
        margin: 0 0 0.75rem;

        &:last-child {
          margin-bottom: 0;
        }
      }

      li {
        margin-bottom: 0.25rem;
      }
    }
  }

  .last-updated {
    margin: 0.5rem 0 0;
    font-size: 1rem;
    color: oklch(var(--text-muted));
    text-align: right;
  }
}
</style>
