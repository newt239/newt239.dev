<script setup lang="ts">
useSeoMeta({
  title: "プライバシーポリシー - newt239.dev",
  ogTitle: "プライバシーポリシー - newt239.dev",
});
</script>

<template>
  <main>
    <div class="container privacy-page">
      <h1 v-colorful-heading>プライバシーポリシー</h1>
      <p class="privacy-intro">newt239.dev（以下、「当サイト」といいます）では、ユーザーの皆様の個人情報の取扱いについて、以下のとおりプライバシーポリシーを定めます。</p>

      <div class="privacy-sections">
        <section class="privacy-section">
          <h2>アクセス解析ツールについて</h2>
          <div class="section-body">
            <p>当サイトでは、Googleによるアクセス解析ツール「Google Analytics」を使用しています。このGoogle Analyticsはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。</p>
            <p>この機能はCookieを無効にすることで収集を拒否することができますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細は<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer">Googleアナリティクス利用規約</a>や<a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">Googleポリシーと規約</a>をご覧ください。</p>
          </div>
        </section>

        <section class="privacy-section">
          <h2>個人情報の利用目的</h2>
          <div class="section-body">
            <p>当サイトでは、メールでのお問い合わせやコメントの際に、お名前やメールアドレス等の個人情報をご入力いただく場合があります。取得した個人情報は、必要な連絡のみに利用させていただくもので、これらの目的以外では利用いたしません。また、取得した個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。</p>
            <ul>
              <li>本人の同意が得られた場合</li>
              <li>法令により開示が求められた場合</li>
            </ul>
          </div>
        </section>

        <section class="privacy-section">
          <h2>免責事項</h2>
          <div class="section-body">
            <p>当サイトのコンテンツについては、可能な限り正確な情報を掲載するよう努めておりますが、正確性や安全性を保証するものではありません。当サイトに掲載された内容によって生じた損害等については、一切の責任を負いかねますのでご了承ください。</p>
            <p>また、当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、サービス等について一切の責任も負いません。</p>
          </div>
        </section>

        <section class="privacy-section">
          <h2>著作権・肖像権</h2>
          <div class="section-body">
            <p>当サイトで掲載している文章や画像などにつきましては、無断転載することを禁止します。当サイトは著作権や肖像権の侵害を目的としたものではありません。著作権や肖像権に関して問題がございましたら、<a href="/about">お問い合わせ</a>よりご連絡ください。迅速に対応いたします。</p>
          </div>
        </section>

        <section class="privacy-section">
          <h2>プライバシーポリシーの変更</h2>
          <div class="section-body">
            <p>当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。修正された最新のプライバシーポリシーは常に本ページにて開示されます。</p>
          </div>
        </section>
      </div>

      <p class="last-updated">制定日：2025年10月21日</p>
    </div>
  </main>
</template>

<style scoped>
.privacy-page {
  max-width: 800px;
  padding: 2rem;
  margin: 0 auto;
  line-height: var(--line-height-body);
  overflow-wrap: anywhere;

  > h1 {
    margin-bottom: 0.5rem;
    font-size: var(--font-size-title);
  }

  .privacy-intro {
    margin-bottom: 2rem;
    color: rgb(var(--text-muted));
  }

  .privacy-sections {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .privacy-section {
    h2 {
      width: auto;
      padding: 0 0 0.5rem;
      margin: 0;
      font-size: 1.5rem;
      font-weight: 800;
      text-box: normal;
    }

    .section-body {
      padding: 1rem 1.5rem;
      background: rgb(var(--surface));
      border-radius: var(--radius-md);

      p {
        margin: 0 0 0.75rem;

        &:last-child {
          margin-bottom: 0;
        }
      }

      ul {
        padding-left: 1.25rem;
        margin: 0;
      }

      li {
        margin-bottom: 0.25rem;
      }
    }
  }

  .last-updated {
    margin-top: 2rem;
    font-size: 0.9375rem;
    color: rgb(var(--text-muted));
    text-align: right;
  }
}
</style>
