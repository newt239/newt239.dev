<script lang="ts" setup>
import { IconChevronLeft } from "@tabler/icons-vue";

const route = useRoute();
const { data } = await useAsyncData(route.path, () => {
  return queryCollection('works').path(route.path).first()
});

if (!data.value) {
  useSeoMeta({
    title: 'Not Founded - newt239.dev',
    ogTitle: 'Not Founded - newt239.dev',
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
      url: `https://newt239.dev/images/${data.value.thumbnail}`,
      alt: data.value.alt,
    },
    twitterImage: {
      url: `https://newt239.dev/images/${data.value.thumbnail}`,
      alt: data.value.alt,
    },
    twitterLabel1: "Period",
    twitterData1: data.value.period,
    twitterLabel2: "Tech Stack",
    twitterData2: data.value.tech.join(", "),
  });
}

const imageList = computed(() => {
  if (!data.value) return [];
  if (data.value.images && data.value.images.length > 0) {
    return data.value.images;
  }
  return [{ src: data.value.thumbnail, alt: data.value.alt }];
});

const workSlug = computed(() => data.value?.path?.split('/')[2] ?? '');

const lightboxOpen = ref(false);
const lightboxIndex = ref(0);

function openLightbox(index: number) {
  lightboxIndex.value = index;
  lightboxOpen.value = true;
}

function closeLightbox() {
  lightboxOpen.value = false;
}
</script>

<template>
  <main>
    <div class="container each-work-page">
      <div class="category-name" lang="en">Works</div>
      <div class="work">
        <template v-if="data">
          <ImageCarousel
            :images="imageList"
            :work-slug="workSlug"
            @open-lightbox="openLightbox"
          />
          <div class="work-header">
            <h1 :style="`view-transition-name: ${workSlug}-name;`">{{ data.title }}</h1>
          </div>
          <dl class="work-meta">
            <template v-if="data.github">
              <dt>GitHub</dt>
              <dd>
                <a :href="`https://github.com/${data.github}`" target="_blank">{{ data.github }}</a>
              </dd>
            </template>
            <dt>Period</dt>
            <dd>{{ data.period }}</dd>
            <dt>Tech Stack</dt>
            <dd class="tech-tags">
              <span v-for="tech in data.tech" :key="tech" class="tech-tag">{{ tech }}</span>
            </dd>
          </dl>
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
      <div class="after-content">
        <NuxtLink class="back" to="/">
          <IconChevronLeft />
          BACK HOME
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style>
.each-work-page {
  .category-name {
    view-transition-name: work-category-name;
  }

  .work {
    a,
    p code {
      word-break: break-all;
    }

    .work-header {
      margin-top: 1.5rem;

      > h1 {
        margin: 0;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
      }
    }

    .work-meta {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 0.5rem 1.5rem;
      margin: 1rem 0 0;
      padding: 0;

      dt {
        font-weight: 700;
        color: rgb(var(--color-text-secondary));
        font-size: 0.875rem;
        line-height: 2;
      }

      dd {
        margin: 0;
        line-height: 2;
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
        border-radius: 9999px;
        font-size: 0.8125rem;
        line-height: 1.5;
        background: rgb(var(--color-text-tertiary) / 0.35);
        color: rgb(var(--color-text));
      }
    }

    .content {
      padding-top: 1.5rem;
      padding-bottom: 1rem;

      p {
        margin: 1rem 0;
      }

      ul {
        margin: 0.5rem 0 0.5rem 1.5rem;
      }

      li > ul {
        margin-left: 0;
      }

      h2 {
        display: inline-block;
        padding: 1rem 0 0;
        letter-spacing: 0;
        margin: 0;
        font-size: 1.5rem;
        border-bottom: rgb(var(--color-text)) 1px solid;
      }

      h3 {
        padding-left: 0;
      }

      h2,
      h3,
      h4,
      h5 {
        a {
          color: rgb(var(--color-text));
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
          border-bottom: 1px rgb(var(--color-text)) solid;
        }
      }

      code,
      pre {
        padding: 0.2rem;
        background-color: rgb(var(--color-text-tertiary));
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
          border-radius: 0.5rem;
        }
      }
    }

    .not-founded {
      padding: 5rem 1rem;
      text-align: center;
    }
  }

  .after-content {
    padding: 1rem;
    text-align: center;

    .back {
      display: inline-block;
      padding: 0.5rem 1rem;
      border: none;
      font-size: 1rem;
      color: rgb(var(--color-text));
      background-color: transparent;
      cursor: pointer;
      transition: all 0.2s;

      @media (prefers-reduced-motion: reduce) {
        transition: none;
      }

      @media (hover: hover) {
        &:hover {
          opacity: 0.5;
        }
      }

      @media (hover: none) {
        &:active {
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
