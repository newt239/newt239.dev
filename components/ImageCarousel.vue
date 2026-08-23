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
const pagesRef = ref<HTMLElement | null>(null);
const isSnapping = ref(false);
const slideIdBase = useId();

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

function focusCurrentImage() {
  const buttons = trackRef.value?.querySelectorAll<HTMLButtonElement>(".carousel-image-button");
  buttons?.[currentIndex.value]?.focus({ preventScroll: true });
}

defineExpose({ snapTo, focusCurrentImage });

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
  const target = e.target as Node;
  const fromPages = pagesRef.value?.contains(target) ?? false;
  const fromTrack = trackRef.value?.contains(target) ?? false;

  let nextIndex: number | null = null;
  if (e.key === "ArrowLeft") nextIndex = currentIndex.value - 1;
  else if (e.key === "ArrowRight") nextIndex = currentIndex.value + 1;
  else if (fromPages && e.key === "Home") nextIndex = 0;
  else if (fromPages && e.key === "End") nextIndex = props.images.length - 1;
  if (nextIndex === null) return;

  e.preventDefault();
  goTo(nextIndex);
  if (fromPages) {
    nextTick(() => {
      const buttons = pagesRef.value?.querySelectorAll<HTMLButtonElement>(".carousel-page-btn");
      buttons?.[currentIndex.value]?.focus();
    });
  } else if (fromTrack) {
    nextTick(focusCurrentImage);
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
    aria-roledescription="カルーセル"
    aria-label="作品画像"
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
          :id="`${slideIdBase}-slide-${index}`"
          :key="index"
          class="carousel-slide"
          :role="hasMultiple ? 'tabpanel' : 'group'"
          :inert="index !== currentIndex"
          :aria-roledescription="hasMultiple ? 'スライド' : undefined"
          :aria-labelledby="hasMultiple ? `${slideIdBase}-tab-${index}` : undefined"
        >
          <button
            type="button"
            class="carousel-image-button"
            @click="emit('open-lightbox', index)"
          >
            <NuxtImg
              :src="`/images/${image.src}`"
              :alt="image.alt"
              class="carousel-image"
              sizes="sm:100vw md:50vw lg:900px"
              :style="imageStyle(index)"
            />
            <span class="visually-hidden">（拡大表示）</span>
          </button>
        </div>
      </div>
    </div>
    <template v-if="hasMultiple">
      <div class="carousel-controls">
        <button type="button" class="carousel-nav-btn" aria-label="前の画像" @click="prev">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          <span class="carousel-nav-label">前の画像</span>
        </button>
        <div ref="pagesRef" class="carousel-pages" role="tablist" aria-label="スライド選択">
          <button
            v-for="(_, index) in images"
            :id="`${slideIdBase}-tab-${index}`"
            :key="index"
            type="button"
            class="carousel-page-btn"
            :class="{ active: index === currentIndex }"
            :tabindex="index === currentIndex ? 0 : -1"
            role="tab"
            :aria-selected="index === currentIndex"
            :aria-controls="`${slideIdBase}-slide-${index}`"
            :aria-label="`${index + 1} / ${images.length}`"
            @click="goTo(index)"
          >
            {{ index + 1 }}
          </button>
        </div>
        <button type="button" class="carousel-nav-btn" aria-label="次の画像" @click="next">
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
  font-family: inherit;
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--text));
  cursor: pointer;
  background: rgb(var(--surface));
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-sm);
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
}
</style>
