<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight, IconLayoutGrid } from "@tabler/icons-vue";

import type { ImageCarousel } from "#components";

import { siteName, siteUrl } from "~/lib/constants";
import { personId } from "~/lib/person";

const route = useRoute();
const workPath = route.path.replace(/\/$/, "");
const { data } = await useAsyncData(workPath, () =>
  queryCollection("works").path(workPath).first()
);
if (!data.value) {
  throw createError({ statusCode: 404, fatal: true });
}
const work = data.value;
const workSlug = work.path.split("/")[2] ?? "";

const { data: worksOrder, error: worksOrderError } = await useAsyncData("works-order", () =>
  queryCollection("works").order("period", "DESC").select("path", "title").all()
);
if (worksOrderError.value) throw worksOrderError.value;
const works = worksOrder.value ?? [];
const currentIndex = works.findIndex((item) => item.path === workPath);
const previousWork = works[currentIndex - 1];
const nextWork = works[currentIndex + 1];

usePageSeo({
  title: work.title,
  ogImage: `${siteUrl}/og/works-${workSlug}.jpg`,
});
useSeoMeta({
  description: work.description,
  ogDescription: work.description,
  twitterDescription: work.description,
  twitterLabel1: "期間",
  twitterData1: formatPeriod(work.period),
  twitterLabel2: "技術構成",
  twitterData2: work.tech.join(", "),
  ogUrl: `${siteUrl}${work.path}`,
});

const img = useImage();
// Discord のギャラリーは 2 枚と 4 枚で 2 列になる。奇数枚や 6 枚以上だと列数が崩れるため偶数枚・最大 4 枚に絞る
const galleryImages =
  work.images.length === 1 ? work.images : work.images.slice(0, Math.min(work.images.length - (work.images.length % 2), 4));
useDiscordEmbed([
  {
    type: 10,
    content: [
      `## [${work.title}](${siteUrl}${work.path})`,
      work.description,
    ].join("\n"),
  },
  {
    type: 12,
    items: galleryImages.map((image) => ({
      media: { url: img(`/images/${image.src}`, { width: galleryImages.length === 1 ? 1200 : 640 }) },
      description: image.alt,
    })),
  },
  { type: 10, content: `-# 期間\n${formatPeriod(work.period)}` },
  { type: 10, content: `-# 技術構成\n${work.tech.join(" / ")}` },
  {
    type: 1,
    components: [
      ...(work.url ? [{ type: 2, style: 5, label: `${work.title} を開く`, url: work.url } as const] : []),
      ...(work.github
        ? [{ type: 2, style: 5, label: "GitHub", url: `https://github.com/${work.github}` } as const]
        : []),
    ],
  },
  { type: 14 },
  { type: 10, content: `-# [${siteName}](${siteUrl}/)` },
]);

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        "@id": `${siteUrl}${work.path}#work`,
        name: work.title,
        description: work.description,
        url: `${siteUrl}${work.path}`,
        image: `${siteUrl}/images/${work.images[0].src}`,
        datePublished: work.period.split(" ")[0]?.replaceAll(".", "-") ?? "",
        keywords: work.tech,
        inLanguage: "ja",
        author: { "@id": personId },
        codeRepository: work.github ? `https://github.com/${work.github}` : undefined,
      },
    },
    {
      type: "application/ld+json",
      innerHTML: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ホーム", item: siteUrl },
          { "@type": "ListItem", position: 2, name: "作品一覧", item: `${siteUrl}/works` },
          { "@type": "ListItem", position: 3, name: work.title },
        ],
      },
    },
  ],
});

const tocItems = work.body.toc?.links ?? [];
const contentRef = useTemplateRef<HTMLElement>("content");

const activeWorkSlug = useState<string | null>("active-work-slug", () => null);
activeWorkSlug.value = workSlug;

const lightboxOpen = ref(false);
const imageIndex = ref(0);
const morphIndex = ref<number | null>(null);
const carouselRef = useTemplateRef<InstanceType<typeof ImageCarousel>>("carousel");

const openLightbox = async (index: number) => {
  imageIndex.value = index;
  if (!("startViewTransition" in document)) {
    lightboxOpen.value = true;
    return;
  }
  morphIndex.value = index;
  await nextTick();
  const transition = document.startViewTransition({
    types: ["lightbox-open"],
    update: async () => {
      lightboxOpen.value = true;
      morphIndex.value = null;
      await nextTick();
    },
  });
  try {
    await Promise.allSettled([transition.ready, transition.finished]);
    await transition.updateCallbackDone;
  } finally {
    morphIndex.value = null;
  }
};

const closeLightbox = async () => {
  if (!("startViewTransition" in document)) {
    lightboxOpen.value = false;
    await nextTick();
    carouselRef.value?.focusCurrentImage();
    return;
  }
  const transition = document.startViewTransition({
    types: ["lightbox-close"],
    update: async () => {
      lightboxOpen.value = false;
      morphIndex.value = imageIndex.value;
      await nextTick();
    },
  });
  try {
    await Promise.allSettled([transition.ready, transition.finished]);
    await transition.updateCallbackDone;
  } finally {
    morphIndex.value = null;
    carouselRef.value?.focusCurrentImage();
  }
};
</script>

<template>
  <div>
    <div class="container each-work-page">
      <div class="work">
        <div class="work-layout">
          <ImageCarousel
            ref="carousel"
            v-model:index="imageIndex"
            :images="work.images"
            :work-slug="workSlug"
            :morph-index="morphIndex"
            :instant="lightboxOpen"
            @open-lightbox="openLightbox"
          />
          <div class="work-sidebar">
            <h1 class="work-title" :style="`view-transition-name: ${workSlug}-name;`">{{ work.title }}</h1>
            <dl class="work-meta">
              <template v-if="work.github">
                <dt>GitHub</dt>
                <dd>
                  <a class="underline" :href="`https://github.com/${work.github}`" target="_blank" rel="noopener noreferrer">{{ work.github }}</a>
                </dd>
              </template>
              <dt>期間</dt>
              <dd>{{ formatPeriod(work.period) }}</dd>
              <dt>技術構成</dt>
              <dd class="tech-tags">
                <span v-for="tech in work.tech" :key="tech" class="tech-tag">{{ tech }}</span>
              </dd>
            </dl>
            <TableOfContents
              v-if="tocItems.length > 0"
              class="work-toc"
              :items="tocItems"
              :container="contentRef?.firstElementChild"
            />
          </div>
          <div ref="content" class="content">
            <ContentRenderer class="section-body" :value="work" />
          </div>
        </div>
        <ImageLightbox
          v-model:index="imageIndex"
          :images="work.images"
          :open="lightboxOpen"
          @close="closeLightbox"
        />
      </div>
      <nav class="work-nav" aria-label="作品ナビゲーション">
        <NuxtLink
          v-if="previousWork"
          :to="previousWork.path"
          rel="prev"
          :aria-label="`前の作品: ${previousWork.title}`"
          class="work-nav-link surface-button is-previous"
        >
          <IconChevronLeft :size="20" aria-hidden="true" />
          <span class="work-nav-body">
            <span class="work-nav-label">前の作品</span>
            <span class="work-nav-title">{{ previousWork.title }}</span>
          </span>
        </NuxtLink>
        <NuxtLink to="/works" class="work-nav-link surface-button is-all" aria-label="すべての作品">
          <IconLayoutGrid :size="20" aria-hidden="true" />
          <span class="work-nav-all-label">すべての作品</span>
        </NuxtLink>
        <NuxtLink
          v-if="nextWork"
          :to="nextWork.path"
          rel="next"
          :aria-label="`次の作品: ${nextWork.title}`"
          class="work-nav-link surface-button is-next"
        >
          <span class="work-nav-body">
            <span class="work-nav-label">次の作品</span>
            <span class="work-nav-title">{{ nextWork.title }}</span>
          </span>
          <IconChevronRight :size="20" aria-hidden="true" />
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.each-work-page {
  .work {
    container-type: inline-size;
  }

  .work-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    column-gap: var(--grid-gap);
    align-items: start;

    > .work-sidebar {
      --ring-space: calc(var(--focus-ring-offset) + var(--focus-ring-width));

      order: -1;
      margin-bottom: 1rem;

      .work-title {
        display: block;
        width: auto;
        padding: 0;
        margin: 0 0 0.75rem;
        font-size: var(--font-size-title);
        font-weight: 800;
        text-box: normal;
        line-break: strict;

        /* auto-phrase は 1 行に収まらない文節の手前で折り返し、先頭に 1 文字だけ残る */
        word-break: normal;
        text-wrap: balance;
        view-transition-class: list-title;
      }

      .work-toc {
        display: none;
        margin-top: 1.5rem;
      }
    }

    @container (width >= 37rem) {
      grid-template-columns: repeat(2, minmax(0, 1fr));

      > .carousel {
        grid-row: 1;
        grid-column: 1;
      }

      > .content {
        grid-row: 2;
        grid-column: 1;
      }

      > .work-sidebar {
        position: sticky;
        top: calc(var(--header-height) + var(--grid-gap) - var(--ring-space));
        grid-row: 1 / span 2;
        grid-column: 2;
        order: 0;
        max-height: calc(100dvh - var(--header-height) - 2 * var(--grid-gap) + 2 * var(--ring-space));

        /* スクロール領域の端でフォーカスリングが切れないよう、リングの分だけ内側に余白を取る */
        padding: var(--ring-space);
        margin: calc(var(--ring-space) * -1);
        overflow-y: auto;

        .work-toc {
          display: block;
        }
      }
    }

    @container (width >= 55.5rem) {
      grid-template-columns: repeat(3, minmax(0, 1fr));

      > .carousel,
      > .content {
        grid-column: 1 / span 2;
      }

      > .work-sidebar {
        grid-column: 3;
      }
    }

    @container (width >= 74rem) {
      grid-template-columns: repeat(4, minmax(0, 1fr));

      > .carousel,
      > .content {
        grid-column: 1 / span 3;
      }

      > .work-sidebar {
        grid-column: 4;
      }
    }

    /* A4 縦の印刷幅は 37rem を超えるので 1 カラムへ戻す */
    @media print {
      grid-template-columns: minmax(0, 1fr);

      > .carousel,
      > .content,
      > .work-sidebar {
        grid-area: auto;
      }

      > .work-sidebar {
        position: static;
        order: -1;
        max-height: none;
        padding: 0;
        margin: 0 0 1rem;
        overflow-y: visible;

        .work-toc {
          display: none;
        }
      }
    }
  }

  .work-meta {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.25rem;
    padding: 0;
    margin: 0;

    dt {
      margin-top: 0.75rem;
      font-size: 0.75rem;
      font-weight: 800;
      line-height: var(--line-height-tight);
      color: oklch(var(--text-muted));
      letter-spacing: 0.05em;

      &:first-of-type {
        margin-top: 0;
      }
    }

    dd {
      margin: 0;
      line-height: var(--line-height-tight);
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      align-items: center;
    }

    .tech-tag {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      font-size: 1rem;
      line-height: var(--line-height-tight);
      color: oklch(var(--text));
      background: oklch(var(--surface));
      border-radius: var(--radius-xs);

      @media (prefers-contrast: more) {
        border: max(var(--border-width), 2px) solid oklch(var(--text-muted));
      }

      @media (forced-colors: active) {
        border: max(var(--border-width), 2px) solid CanvasText;
      }

      @media print {
        border: var(--border-width-hairline) solid oklch(var(--border));
      }

      @supports (text-box-trim: trim-both) {
        padding-block: 0.5rem;
        text-box: trim-both text text;
      }
    }
  }

  .work-nav {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1rem;
    align-items: stretch;
    padding: 2rem 0 1rem;

    @media print {
      display: none;
    }

    @media (width <= 48rem) {
      grid-template-columns: auto minmax(0, 1fr) auto;
      gap: min(0.5rem, 2vw);
    }
  }

  .work-nav-link {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    min-height: var(--tap-target-size);
    padding: 0.75rem 1.25rem;

    svg {
      flex-shrink: 0;
    }

    &.is-all {
      grid-column: 2;
      justify-content: center;
      white-space: nowrap;
    }

    &.is-next {
      grid-column: 3;
      justify-content: flex-end;
      text-align: right;
    }

    @media (width <= 48rem) {
      gap: min(0.5rem, 2vw);
      min-width: 0;
      padding: min(0.75rem, 3vw);

      &.is-all {
        text-align: center;
        white-space: normal;
      }
    }

    @media (width <= 20rem) {
      &.is-all {
        justify-content: center;
      }

      .work-nav-all-label {
        display: none;
      }
    }
  }

  .work-nav-body {
    display: flex;
    flex-direction: column;
    min-width: 0;

    @media (width <= 48rem) {
      display: none;
    }
  }

  .work-nav-label {
    font-size: 0.75rem;
    line-height: var(--line-height-tight);
    color: oklch(var(--text-muted));
  }

  .work-nav-title {
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 800;
    line-height: var(--line-height-tight);
    white-space: nowrap;
  }
}
</style>

<style>
.each-work-page .work {
  a {
    overflow-wrap: anywhere;
  }

  .content {
    padding-top: 1.5rem;
    padding-bottom: 1rem;
    overflow-wrap: anywhere;

    @container (width < 37rem) {
      padding-top: 1rem;
    }

    p {
      margin: 1rem 0;
    }

    ul {
      padding-left: 1.5rem;
      margin: 0.5rem 0;

      ul {
        margin: 0;
      }
    }

    li {
      margin: 0.25rem 0;
      line-height: var(--line-height-body);
    }

    .section-body {
      --code-bg: oklch(var(--bg));
      --section-padding-inline: min(1.5rem, 5vw);

      padding: var(--section-padding-inline);

      > :first-child {
        margin-top: 0;
      }

      > :last-child {
        margin-bottom: 0;
      }

      .link-card {
        background: oklch(var(--bg));
      }

      @container (width < 37rem) {
        --section-padding-inline: min(1rem, 4vw);

        pre {
          padding: 0.75rem;
        }
      }
    }

    h2 {
      padding: 0 0 0.5rem;
      margin: 1.5rem 0 0;
      font-size: 1.5rem;
    }

    h3 {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      margin: 1rem 0 0;
      font-size: 1.25rem;
      color: oklch(var(--bg));
      letter-spacing: 0;
      background-color: oklch(var(--text));

      @media print {
        padding: 0 0 0.25rem;
        color: oklch(var(--text));
        background-color: transparent;
        border-bottom: var(--border-width) solid oklch(var(--text));
      }
    }

    h4 {
      padding: 1.5rem 0 0;
      font-size: 1.25rem;
      font-weight: 800;
    }

    h5 {
      padding: 0 0 0 0.75rem;
      margin: 1rem 0 0;
      font-size: 1rem;
      font-weight: 800;
      border-left: var(--border-width) solid oklch(var(--accent));
    }

    h3 a {
      color: inherit;
    }

    h2,
    h4,
    h5 {
      a {
        color: oklch(var(--text));
      }
    }

    /* 横スクロールできる表は、1 文字ずつ折り返すより桁幅を保つ方が読める */
    table {
      margin: 0;
      overflow-wrap: normal;
      border-spacing: 0 0.5rem;

      th,
      td {
        padding: 0 min(1rem, 3vw);
        text-align: left;
      }

      th {
        border-bottom: var(--border-width-hairline) oklch(var(--text)) solid;
      }
    }

    code {
      padding: 0.1em 0.35em;
      margin: 0;
      font-family: var(--font-mono);
      font-size: 0.9em;
      color: var(--code-text);
      overflow-wrap: anywhere;
      cursor: text;
      background-color: var(--code-bg);
      border: var(--border-width-hairline) solid oklch(var(--border));
      border-radius: var(--radius-xs);
    }

    pre {
      padding: 1rem;
      margin: 0.5rem 0;
      line-height: var(--line-height-tight);
      color: var(--code-text);
      overflow-wrap: anywhere;
      white-space: pre-wrap;
      cursor: text;
      background-color: var(--code-bg);
      border: var(--border-width-hairline) solid oklch(var(--border));
      border-radius: var(--radius-sm);

      code {
        padding: 0;
        font-size: inherit;
        background: none;
        border: 0;
        border-radius: 0;
      }
    }

    p:has(img) {
      text-align: center;

      img {
        max-width: 100%;
        max-height: 50vh;
        border-radius: var(--radius-sm);
      }
    }
  }
}
</style>
