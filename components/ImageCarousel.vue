<script setup lang="ts">
const props = defineProps<{
  images: { src: string; alt: string }[];
  workSlug: string;
  morphIndex?: number | null;
}>();

const emit = defineEmits<{
  "open-lightbox": [index: number];
}>();

const currentIndex = ref(0);
const trackRef = ref<HTMLElement | null>(null);
const isSnapping = ref(false);

const hasMultiple = computed(() => props.images.length > 1);

// ライトボックスはカルーセルより大きい variant を読むため、表示中の 1 枚だけ先に取得しておく
const img = useImage();
useHead({
  link: computed(() => {
    const image = props.images[currentIndex.value];
    if (!image) return [];
    return [{ rel: "prefetch", as: "image", href: img(`/images/${image.src}`) }];
  }),
});

let touchStartX = 0;
let touchDeltaX = 0;

function goTo(index: number) {
  currentIndex.value = ((index % props.images.length) + props.images.length) % props.images.length;
}

function prev() {
  goTo(currentIndex.value - 1);
}

function next() {
  goTo(currentIndex.value + 1);
}

function snapTo(index: number) {
  isSnapping.value = true;
  currentIndex.value = ((index % props.images.length) + props.images.length) % props.images.length;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      isSnapping.value = false;
    });
  });
}

defineExpose({ snapTo });

function imageStyle(index: number) {
  if (props.morphIndex === index) {
    return "view-transition-name: lightbox-img; view-transition-class: none;";
  }
  // 名前が付いた要素はビューポートの overflow クリップから外れるため、表示中のスライドにのみ付ける
  if (index === 0 && currentIndex.value === 0) {
    return `view-transition-name: ${props.workSlug}-img;`;
  }
  return undefined;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "ArrowLeft") {
    e.preventDefault();
    prev();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    next();
  }
}

function onTouchStart(e: TouchEvent) {
  const touch = e.touches[0];
  if (!touch) return;
  touchStartX = touch.clientX;
  touchDeltaX = 0;
}

function onTouchMove(e: TouchEvent) {
  const touch = e.touches[0];
  if (!touch) return;
  touchDeltaX = touch.clientX - touchStartX;
}

function onTouchEnd() {
  if (Math.abs(touchDeltaX) > 50) {
    if (touchDeltaX < 0) {
      next();
    } else {
      prev();
    }
  }
  touchDeltaX = 0;
}
</script>

<template>
  <div
    class="carousel"
    role="region"
    aria-roledescription="carousel"
    aria-label="作品画像"
    tabindex="0"
    @keydown="onKeydown"
  >
    <div class="carousel-viewport">
      <div
        ref="trackRef"
        class="carousel-track"
        :class="{ 'no-transition': isSnapping }"
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        @touchstart.passive="onTouchStart"
        @touchmove.passive="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div
          v-for="(image, index) in images"
          :key="index"
          class="carousel-slide"
          role="group"
          :aria-roledescription="hasMultiple ? 'slide' : undefined"
          :aria-label="hasMultiple ? `${index + 1} / ${images.length}` : undefined"
        >
          <NuxtImg
            :src="`/images/${image.src}`"
            :alt="image.alt"
            class="carousel-image"
            sizes="sm:100vw md:50vw lg:900px"
            :style="imageStyle(index)"
            @click="emit('open-lightbox', index)"
          />
        </div>
      </div>
    </div>
    <template v-if="hasMultiple">
      <div class="carousel-controls">
        <button class="carousel-nav-btn" aria-label="前の画像" @click="prev">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          <span class="carousel-nav-label">前の画像</span>
        </button>
        <div class="carousel-pages" role="tablist" aria-label="スライド選択">
          <button
            v-for="(_, index) in images"
            :key="index"
            class="carousel-page-btn"
            :class="{ active: index === currentIndex }"
            role="tab"
            :aria-selected="index === currentIndex"
            :aria-label="`スライド ${index + 1}`"
            @click="goTo(index)"
          >
            {{ index + 1 }}
          </button>
        </div>
        <button class="carousel-nav-btn" aria-label="次の画像" @click="next">
          <span class="carousel-nav-label">次の画像</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
/* インラインサイズ封じ込めで内容から幅を取れなくなるため、親が縦並びのときのために幅を明示する */
.carousel {
  outline: none;
  width: 100%;
  container-type: inline-size;

  &:focus-visible {
    outline: 2px solid rgb(var(--focus-ring));
    outline-offset: 4px;
    border-radius: var(--radius-md);
  }
}

.carousel-viewport {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-md);
  aspect-ratio: 16 / 9;
  width: 100%;
}

.carousel-track {
  display: flex;
  height: 100%;
  transition: transform 0.4s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &.no-transition {
    transition: none;
  }
}

.carousel-slide {
  flex: 0 0 100%;
  height: 100%;
}

.carousel-image {
  view-transition-class: work-thumb;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  cursor: pointer;
  border-radius: var(--radius-md);
}

.carousel-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding-top: 0.75rem;
  min-width: 0;
}

.carousel-nav-btn,
.carousel-page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: var(--tap-target-size);
  min-height: var(--tap-target-size);
  border-radius: var(--radius-sm);
  border: var(--border-width) solid transparent;
  background: rgb(var(--surface));
  color: rgb(var(--text));
  cursor: pointer;
  flex-shrink: 0;
  font-family: inherit;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
  transition: var(--transition);

  @media (hover: hover) {
    &:not(.active):hover {
      border-color: rgb(var(--text));
    }

    &.active:hover {
      opacity: var(--hover-opacity);
    }
  }

  @media (hover: none) {
    &:not(.active):active {
      border-color: rgb(var(--text));
    }
  }
}

.carousel-nav-btn {
  gap: 0.375rem;
  padding: 0 0.875rem;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 48rem) {
    padding: 0;
  }

  @container (max-width: 24em) {
    & {
      flex: 1 1 0;
    }
  }
}

.carousel-nav-label {
  white-space: nowrap;

  @media (max-width: 48rem) {
    display: none;
  }
}

.carousel-pages {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  min-width: 0;

  @container (max-width: 24em) {
    & {
      display: none;
    }
  }
}

.carousel-page-btn.active {
  background: rgb(var(--text));
  color: rgb(var(--bg));
  border-color: rgb(var(--text));
  font-weight: 700;
}
</style>
