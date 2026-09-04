<script setup lang="ts">
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-vue";
import type { WorksCollectionItem } from "@nuxt/content";

const props = defineProps<{
  images: WorksCollectionItem["images"];
  workSlug: string;
  morphIndex?: number | null;
  instant?: boolean;
}>();

const emit = defineEmits<{
  "open-lightbox": [index: number];
}>();

const index = defineModel<number>("index", { required: true });
const trackRef = useTemplateRef<HTMLElement>("track");
const pagesRef = useTemplateRef<HTMLElement>("pages");
const imageButtons = useTemplateRef<HTMLButtonElement[]>("imageButtons");
const pageButtons = useTemplateRef<HTMLButtonElement[]>("pageButtons");
const slideIdBase = useId();

const hasMultiple = computed(() => props.images.length > 1);

// ライトボックスはカルーセルより大きい variant を読むため、表示中の 1 枚だけ先に取得しておく
const img = useImage();
useHead({
  link: computed(() => {
    const image = props.images[index.value];
    if (!image) return [];
    return [{ rel: "prefetch", as: "image", href: img(`/images/${image.src}`) }];
  }),
});

let touchStartX = 0;
let touchDeltaX = 0;

const goTo = (target: number) => {
  index.value = ((target % props.images.length) + props.images.length) % props.images.length;
};

const focusCurrentImage = () => {
  imageButtons.value?.[index.value]?.focus({ preventScroll: true });
};

defineExpose({ focusCurrentImage });

const imageStyle = (slide: number) => {
  if (props.morphIndex === slide) {
    return "view-transition-name: lightbox-img; view-transition-class: none;";
  }
  // 名前が付いた要素はビューポートの overflow クリップから外れるため、表示中のスライドにのみ付ける
  if (slide === 0 && index.value === 0) {
    return `view-transition-name: ${props.workSlug}-img;`;
  }
  return undefined;
};

const onKeydown = (e: KeyboardEvent) => {
  const target = e.target as Node;
  const fromPages = pagesRef.value?.contains(target) ?? false;
  const fromTrack = trackRef.value?.contains(target) ?? false;

  let nextIndex: number | null = null;
  if (e.key === "ArrowLeft") nextIndex = index.value - 1;
  else if (e.key === "ArrowRight") nextIndex = index.value + 1;
  else if (fromPages && e.key === "Home") nextIndex = 0;
  else if (fromPages && e.key === "End") nextIndex = props.images.length - 1;
  if (nextIndex === null) return;

  e.preventDefault();
  goTo(nextIndex);
  if (fromPages) {
    nextTick(() => pageButtons.value?.[index.value]?.focus());
  } else if (fromTrack) {
    nextTick(focusCurrentImage);
  }
};

const onTouchStart = (e: TouchEvent) => {
  const touch = e.touches[0];
  if (!touch) return;
  touchStartX = touch.clientX;
  touchDeltaX = 0;
};

const onTouchMove = (e: TouchEvent) => {
  const touch = e.touches[0];
  if (!touch) return;
  touchDeltaX = touch.clientX - touchStartX;
};

const onTouchEnd = () => {
  if (Math.abs(touchDeltaX) > 50) {
    goTo(index.value + (touchDeltaX < 0 ? 1 : -1));
  }
  touchDeltaX = 0;
};
</script>

<template>
  <div
    class="carousel"
    role="region"
    aria-roledescription="カルーセル"
    aria-label="作品画像"
    @keydown="onKeydown"
  >
    <div class="carousel-viewport">
      <div
        ref="track"
        class="carousel-track"
        :class="{ 'no-transition': instant }"
        :style="{ transform: `translateX(-${index * 100}%)` }"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div
          v-for="(image, slide) in images"
          :id="`${slideIdBase}-slide-${slide}`"
          :key="slide"
          class="carousel-slide"
          :role="hasMultiple ? 'tabpanel' : 'group'"
          :inert="slide !== index"
          :aria-roledescription="hasMultiple ? 'スライド' : undefined"
          :aria-labelledby="hasMultiple ? `${slideIdBase}-tab-${slide}` : undefined"
        >
          <button
            ref="imageButtons"
            type="button"
            class="carousel-image-button"
            @click="emit('open-lightbox', slide)"
          >
            <NuxtImg
              :src="`/images/${image.src}`"
              :alt="image.alt"
              class="carousel-image"
              sizes="sm:100vw md:50vw lg:900px"
              :style="imageStyle(slide)"
            />
            <span class="visually-hidden">（拡大表示）</span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="hasMultiple" class="carousel-controls">
      <button type="button" class="carousel-nav-btn surface-button" aria-label="前の画像" @click="goTo(index - 1)">
        <IconChevronLeft :size="20" aria-hidden="true" />
        <span class="carousel-nav-label">前の画像</span>
      </button>
      <div ref="pages" class="carousel-pages" role="tablist" aria-label="スライド選択">
        <button
          v-for="(_, slide) in images"
          :id="`${slideIdBase}-tab-${slide}`"
          :key="slide"
          ref="pageButtons"
          type="button"
          class="carousel-page-btn surface-button"
          :class="{ active: slide === index }"
          :tabindex="slide === index ? 0 : -1"
          role="tab"
          :aria-selected="slide === index"
          :aria-controls="`${slideIdBase}-slide-${slide}`"
          :aria-label="`${slide + 1} / ${images.length}`"
          @click="goTo(slide)"
        >
          {{ slide + 1 }}
        </button>
      </div>
      <button type="button" class="carousel-nav-btn surface-button" aria-label="次の画像" @click="goTo(index + 1)">
        <span class="carousel-nav-label">次の画像</span>
        <IconChevronRight :size="20" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>

<style scoped>
/* インラインサイズ封じ込めで内容から幅を取れなくなるため、親が縦並びのときのために幅を明示する */
.carousel {
  width: 100%;
  container-type: inline-size;
}

.carousel-viewport {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: var(--radius-md);

  &:has(.carousel-image-button:focus-visible) {
    outline: var(--focus-ring-width) solid rgb(var(--focus-ring));
    outline-offset: var(--focus-ring-offset);
  }
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform var(--carousel-slide-duration) ease;

  &.no-transition {
    transition: none;
  }
}

.carousel-slide {
  flex: 0 0 100%;
  height: 100%;
}

.carousel-image-button {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: pointer;
  background: none;
  border: none;

  &:focus-visible {
    outline: none;
  }
}

.carousel-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: var(--radius-md);
  view-transition-class: work-thumb;
}

.carousel-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding-top: 0.75rem;
}

.carousel-nav-btn,
.carousel-page-btn {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  min-width: var(--tap-target-size);
  min-height: var(--tap-target-size);
  font-variant-numeric: tabular-nums;
}

.carousel-nav-btn {
  gap: 0.5rem;
  padding: 0 1rem;

  svg {
    flex-shrink: 0;
  }

  @media (width <= 48rem) {
    padding: 0;
  }

  @container (max-width: 24em) {
    flex: 1 1 0;
  }
}

.carousel-nav-label {
  white-space: nowrap;

  @media (width <= 48rem) {
    display: none;
  }
}

.carousel-pages {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  min-width: 0;

  @container (max-width: 24em) {
    display: none;
  }
}

.carousel-page-btn.active {
  font-weight: 800;
  color: rgb(var(--bg));
  background: rgb(var(--text));
  border-color: rgb(var(--text));

  @media (hover: hover) {
    &:hover {
      opacity: var(--hover-opacity);
    }
  }
}
</style>
