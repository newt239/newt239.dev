<script lang="ts" setup>
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";

const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('works').path(route.path).first()
});

const { data: worksOrder } = await useAsyncData("works-order", () =>
  queryCollection("works").order("period", "DESC").select("path", "title").all()
);

const currentIndex = computed(() =>
  worksOrder.value?.findIndex((work) => work.path === route.path) ?? -1
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
    ogImage: {
      url: `https://newt239.dev/images/${data.value.images[0].src}`,
      alt: data.value.images[0].alt,
    },
    twitterImage: {
      url: `https://newt239.dev/images/${data.value.images[0].src}`,
      alt: data.value.images[0].alt,
    },
    twitterLabel1: "Period",
    twitterData1: data.value.period,
    twitterLabel2: "Tech Stack",
    twitterData2: data.value.tech.join(", "),
  });
}

const imageList = computed(() => {
  if (!data.value?.images?.length) return [];
  return data.value.images;
});

const workSlug = computed(() => data.value?.path?.split('/')[2] ?? '');

const lightboxOpen = ref(false);
const lightboxIndex = ref(0);
const morphIndex = ref<number | null>(null);
const carouselRef = ref<{ snapTo: (index: number) => void } | null>(null);

type LightboxViewTransition = {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
};

function getStartViewTransition() {
  if (typeof document === "undefined") return null;
  const doc = document as Document & {
    startViewTransition?: (update: () => Promise<void>) => LightboxViewTransition;
  };
  return doc.startViewTransition?.bind(doc) ?? null;
}

async function openLightbox(index: number) {
  lightboxIndex.value = index;
  const startViewTransition = getStartViewTransition();
  if (!startViewTransition) {
    lightboxOpen.value = true;
    return;
  }
  morphIndex.value = index;
  await nextTick();
  document.documentElement.dataset.viewTransition = "lightbox-open";
  const transition = startViewTransition(async () => {
    lightboxOpen.value = true;
    morphIndex.value = null;
    await nextTick();
  });
  try {
    await Promise.allSettled([transition.ready, transition.finished]);
    await transition.updateCallbackDone;
  } finally {
    morphIndex.value = null;
    delete document.documentElement.dataset.viewTransition;
  }
}

async function closeLightbox(index: number) {
  const startViewTransition = getStartViewTransition();
  if (!startViewTransition) {
    lightboxOpen.value = false;
    return;
  }
  carouselRef.value?.snapTo(index);
  await nextTick();
  document.documentElement.dataset.viewTransition = "lightbox-close";
  const transition = startViewTransition(async () => {
    lightboxOpen.value = false;
    morphIndex.value = index;
    await nextTick();
  });
  try {
    await Promise.allSettled([transition.ready, transition.finished]);
    await transition.updateCallbackDone;
  } finally {
    morphIndex.value = null;
    delete document.documentElement.dataset.viewTransition;
  }
}
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
              <dt>Period</dt>
              <dd>{{ data.period }}</dd>
              <dt>Tech Stack</dt>
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
      <nav v-if="previousWork || nextWork" class="work-nav" aria-label="作品ナビゲーション">
        <NuxtLink
          v-if="previousWork"
          :to="previousWork.path"
          rel="prev"
          class="work-nav-link is-previous"
        >
          <IconChevronLeft :size="20" aria-hidden="true" />
          <span class="work-nav-body">
            <span class="work-nav-label">新しい作品</span>
            <span class="work-nav-title">{{ previousWork.title }}</span>
          </span>
        </NuxtLink>
        <NuxtLink
          v-if="nextWork"
          :to="nextWork.path"
          rel="next"
          class="work-nav-link is-next"
        >
          <span class="work-nav-body">
            <span class="work-nav-label">古い作品</span>
            <span class="work-nav-title">{{ nextWork.title }}</span>
          </span>
          <IconChevronRight :size="20" aria-hidden="true" />
        </NuxtLink>
      </nav>
      <BackToTop />
    </div>
  </main>
</template>

<style>
.each-work-page {
  .work {
    a,
    p code {
      word-break: break-all;
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
        width: 280px;

        .work-title {
          display: block;
          font-size: 1.75rem;
          font-weight: 800;
          padding: 0;
          margin: 0 0 0.75rem;
          background: none;
          color: rgb(var(--text));
        }
      }

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;

        > .work-sidebar {
          width: 100%;
          order: -1;
        }
      }
    }

    .work-meta {
      display: grid;
      grid-template-columns: 1fr;
      gap: 0.25rem;
      margin: 0;
      padding: 0;

      dt {
        font-weight: 700;
        color: rgb(var(--text-muted));
        font-size: 0.875rem;
        letter-spacing: 0.05em;
        line-height: 1.5;
        margin-top: 0.75rem;

        &:first-of-type {
          margin-top: 0;
        }
      }

      dd {
        margin: 0;
        line-height: 1.6;
      }

      .tech-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.375rem;
        align-items: center;
      }

      .tech-tag {
        display: inline-block;
        padding: 0.125rem 0.625rem;
        border-radius: var(--radius-xs);
        font-size: 1rem;
        line-height: 1.5;
        background: rgb(var(--surface));
        color: rgb(var(--text));
      }
    }

    .content {
      padding-top: 1.5rem;
      padding-bottom: 1rem;

      @media (max-width: 768px) {
        padding-top: 0;
      }

      p {
        margin: 1rem 0;
      }

      ul {
        margin: 0.5rem 0;
        padding-left: 1.5rem;

        ul {
          margin: 0;
        }
      }

      li {
        line-height: 1.6;
        margin: 0.25rem 0;
      }

      h2 {
        display: inline-block;
        padding: 1rem 0 0;
        letter-spacing: 0;
        margin: 0;
        font-size: 1.25rem;
        border-bottom: rgb(var(--text)) var(--border-width-hairline) solid;
      }

      h3 {
        font-size: 1.125rem;
        padding-left: 0;
      }

      h2,
      h3,
      h4,
      h5 {
        a {
          color: rgb(var(--text));
        }
      }

      table {
        margin: 0;
        border-spacing: 0 0.5rem;

        th,
        td {
          text-align: left;
          padding: 0 1rem;
        }

        th {
          border-bottom: var(--border-width-hairline) rgb(var(--text)) solid;
        }
      }

      code,
      pre {
        padding: 0.2rem;
        background-color: rgb(var(--text-faint));
        cursor: text;
      }

      code {
        margin: 0;
      }

      pre {
        margin: 0.5rem 0;
        overflow-x: auto;
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
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    padding-top: 1.5rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .work-nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    color: rgb(var(--text));
    background-color: rgb(var(--surface));
    border: var(--border-width) solid transparent;
    border-radius: var(--radius-md);
    transition: var(--transition);

    svg {
      flex-shrink: 0;
    }

    &.is-next {
      grid-column: 2;
      justify-content: flex-end;
      text-align: right;

      @media (max-width: 768px) {
        grid-column: 1;
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
  }

  .work-nav-label {
    font-size: 0.8125rem;
    color: rgb(var(--text-muted));
    line-height: 1.5;
  }

  .work-nav-title {
    font-weight: 700;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
