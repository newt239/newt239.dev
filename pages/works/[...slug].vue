<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight, IconLayoutGrid } from "@tabler/icons-vue";

import { formatPeriod } from "~/libs/period";
import { personId } from "~/libs/person";

const route = useRoute();
const workPath = route.path.replace(/\/$/, "");
const { data } = await useAsyncData(workPath, () => {
  return queryCollection('works').path(workPath).first()
});

const { data: worksOrder } = await useAsyncData("works-order", () =>
  queryCollection("works").order("period", "DESC").select("path", "title").all()
);

const currentIndex = computed(() =>
  worksOrder.value?.findIndex((work) => work.path === workPath) ?? -1
);
const previousWork = computed(() =>
  currentIndex.value > 0 ? worksOrder.value?.[currentIndex.value - 1] : undefined
);
const nextWork = computed(() =>
  currentIndex.value === -1 ? undefined : worksOrder.value?.[currentIndex.value + 1]
);

if (!data.value) {
  useSeoMeta({
    title: 'Not Found - newt239.dev',
    ogTitle: 'Not Found - newt239.dev',
    description: 'コンテンツが見つかりませんでした',
    ogDescription: 'コンテンツが見つかりませんでした',
  });
} else {
  useSeoMeta({
    title: `${data.value.title} - newt239.dev`,
    ogTitle: `${data.value.title} - newt239.dev`,
    twitterTitle: `${data.value.title} - newt239.dev`,
    description: data.value.description,
    ogDescription: data.value.description,
    twitterDescription: data.value.description,
    ogImage: `https://newt239.dev/og/works-${data.value.path.split("/")[2]}.jpg`,
    twitterImage: `https://newt239.dev/og/works-${data.value.path.split("/")[2]}.jpg`,
    twitterLabel1: "期間",
    twitterData1: formatPeriod(data.value.period),
    twitterLabel2: "技術構成",
    twitterData2: data.value.tech.join(", "),
  });

  const work = data.value;
  useHead({
    script: [
      {
        type: "application/ld+json",
        innerHTML: {
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          "@id": `https://newt239.dev${work.path}#work`,
          name: work.title,
          description: work.description,
          url: `https://newt239.dev${work.path}`,
          image: `https://newt239.dev/images/${work.images[0]?.src ?? ""}`,
          datePublished: work.period.split(" ")[0]?.replaceAll(".", "-") ?? "",
          keywords: work.tech,
          inLanguage: "ja",
          author: { "@id": personId },
          ...(work.github
            ? { codeRepository: `https://github.com/${work.github}` }
            : {}),
        },
      },
      {
        type: "application/ld+json",
        innerHTML: {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "ホーム", item: "https://newt239.dev" },
            { "@type": "ListItem", position: 2, name: "作品一覧", item: "https://newt239.dev/works" },
            { "@type": "ListItem", position: 3, name: work.title },
          ],
        },
      },
    ],
  });
}

const imageList = computed(() => {
  if (!data.value?.images?.length) return [];
  return data.value.images;
});

const workSlug = computed(() => data.value?.path?.split('/')[2] ?? '');

// 一覧へ戻る際、この作品のカードだけを他のカードより前面に出すために共有する
const activeWorkSlug = useState<string | null>('active-work-slug', () => null);
watchEffect(() => {
  activeWorkSlug.value = workSlug.value || null;
});

const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const morphIndex = ref<number | null>(null);
const carouselRef = ref<{
  snapTo: (index: number) => void;
  focusCurrentImage: () => void;
} | null>(null);

const openLightbox = async (index: number) => {
  lightboxIndex.value = index;
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

const closeLightbox = async (index: number) => {
  if (!("startViewTransition" in document)) {
    carouselRef.value?.snapTo(index);
    lightboxOpen.value = false;
    await nextTick();
    carouselRef.value?.focusCurrentImage();
    return;
  }
  carouselRef.value?.snapTo(index);
  await nextTick();
  const transition = document.startViewTransition({
    types: ["lightbox-close"],
    update: async () => {
      lightboxOpen.value = false;
      morphIndex.value = index;
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
  <main>
    <div class="container each-work-page">
      <div class="work">
        <template v-if="data">
          <div class="work-hero">
            <ImageCarousel
              ref="carouselRef"
              :images="imageList"
              :work-slug="workSlug"
              :morph-index="morphIndex"
              @open-lightbox="openLightbox"
            />
            <div class="work-sidebar">
              <h1 class="work-title" :style="`view-transition-name: ${workSlug}-name;`">{{ data.title }}</h1>
              <dl class="work-meta">
              <template v-if="data.github">
                <dt>GitHub</dt>
                <dd>
                  <a class="underline" :href="`https://github.com/${data.github}`" target="_blank" rel="noopener noreferrer">{{ data.github }}</a>
                </dd>
              </template>
              <dt>期間</dt>
              <dd>{{ formatPeriod(data.period) }}</dd>
              <dt>技術構成</dt>
              <dd class="tech-tags">
                <span v-for="tech in data.tech" :key="tech" class="tech-tag">{{ tech }}</span>
              </dd>
            </dl>
            </div>
          </div>
          <div class="content">
            <ContentRenderer :value="data" />
          </div>
          <ImageLightbox
            :images="imageList"
            :initial-index="lightboxIndex"
            :open="lightboxOpen"
            @close="closeLightbox"
          />
        </template>
        <template v-else>
          <p class="not-founded">お探しの作品は見つかりませんでした。</p>
        </template>
      </div>
      <nav class="work-nav" aria-label="作品ナビゲーション">
        <NuxtLink
          v-if="previousWork"
          :to="previousWork.path"
          rel="prev"
          :aria-label="`前の作品: ${previousWork.title}`"
          class="work-nav-link is-previous"
        >
          <IconChevronLeft :size="20" aria-hidden="true" />
          <span class="work-nav-body">
            <span class="work-nav-label">前の作品</span>
            <span class="work-nav-title">{{ previousWork.title }}</span>
          </span>
        </NuxtLink>
        <NuxtLink to="/works" class="work-nav-link is-all" aria-label="すべての作品">
          <IconLayoutGrid :size="20" aria-hidden="true" />
          <span class="work-nav-all-label">すべての作品</span>
        </NuxtLink>
        <NuxtLink
          v-if="nextWork"
          :to="nextWork.path"
          rel="next"
          :aria-label="`次の作品: ${nextWork.title}`"
          class="work-nav-link is-next"
        >
          <span class="work-nav-body">
            <span class="work-nav-label">次の作品</span>
            <span class="work-nav-title">{{ nextWork.title }}</span>
          </span>
          <IconChevronRight :size="20" aria-hidden="true" />
        </NuxtLink>
      </nav>
    </div>
  </main>
</template>

<style>
.each-work-page {
  .work {
    a {
      overflow-wrap: anywhere;
    }

    .work-hero {
      display: flex;
      gap: 2rem;
      align-items: start;

      > .carousel {
        flex: 1;
        min-width: 0;
      }

      > .work-sidebar {
        flex-shrink: 0;
        width: 360px;

        .work-title {
          display: block;
          width: auto;
          padding: 0;
          margin: 0 0 0.75rem;
          font-size: var(--font-size-title);
          font-weight: 800;
          view-transition-class: list-title;
          text-box: normal;
        }
      }

      @media (width <= 48rem) {
        flex-direction: column;
        gap: 1rem;

        > .work-sidebar {
          order: -1;
          width: 100%;
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
        color: rgb(var(--text-muted));
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
        color: rgb(var(--text));
        background: rgb(var(--surface));
        border-radius: var(--radius-xs);

        @supports (text-box-trim: trim-both) {
          text-box: trim-both text text;
          padding-block: 0.5rem;
        }
      }
    }

    .content {
      padding-top: 1.5rem;
      padding-bottom: 1rem;
      overflow-wrap: anywhere;

      @media (width <= 48rem) {
        padding-top: 0;
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

      h2 {
        display: inline-block;
        padding: 0.25rem 0.75rem;
        margin: 1rem 0 0;
        font-size: 1.25rem;
        color: rgb(var(--bg));
        letter-spacing: 0;
        background-color: rgb(var(--text));
      }

      h3 {
        padding-left: 0;
        font-size: 1.25rem;
      }

      h2 a {
        color: inherit;
      }

      h3,
      h4,
      h5 {
        a {
          color: rgb(var(--text));
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
          border-bottom: var(--border-width-hairline) rgb(var(--text)) solid;
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
        border: var(--border-width-hairline) solid rgb(var(--border));
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
        border: var(--border-width-hairline) solid rgb(var(--border));
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

    .not-founded {
      padding: 5rem 1rem;
      text-align: center;
    }
  }

  .work-nav {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: 1rem;
    align-items: stretch;
    padding: 2rem 0 1rem;

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
    color: rgb(var(--text));
    background-color: rgb(var(--surface));
    border: var(--border-width) solid transparent;
    border-radius: var(--radius-sm);
    transition: var(--transition);

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

    @media (hover: hover) {
      &:hover {
        border-color: rgb(var(--text));
      }
    }

    @media (hover: none) {
      &:active {
        border-color: rgb(var(--text));
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
    color: rgb(var(--text-muted));
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
