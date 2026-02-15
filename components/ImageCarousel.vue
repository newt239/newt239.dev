<script setup lang="ts">
const props = defineProps<{
  images: { src: string; alt: string }[];
  workSlug: string;
}>();

const emit = defineEmits<{
  "open-lightbox": [index: number];
}>();

const currentIndex = ref(0);
const trackRef = ref<HTMLElement | null>(null);
const isTransitioning = ref(false);

const hasMultiple = computed(() => props.images.length > 1);

let touchStartX = 0;
let touchDeltaX = 0;

function goTo(index: number) {
  if (isTransitioning.value) return;
  isTransitioning.value = true;
  currentIndex.value = ((index % props.images.length) + props.images.length) % props.images.length;
}

function prev() {
  goTo(currentIndex.value - 1);
}

function next() {
  goTo(currentIndex.value + 1);
}

function onTransitionEnd() {
  isTransitioning.value = false;
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
  touchStartX = e.touches[0].clientX;
  touchDeltaX = 0;
}

function onTouchMove(e: TouchEvent) {
  touchDeltaX = e.touches[0].clientX - touchStartX;
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
        :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        @transitionend="onTransitionEnd"
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
            :style="index === 0 ? `view-transition-name: ${workSlug}-img;` : undefined"
            @click="emit('open-lightbox', index)"
          />
        </div>
      </div>
    </div>
    <template v-if="hasMultiple">
      <div class="carousel-controls">
        <button class="carousel-nav-btn" aria-label="前の画像" @click="prev">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
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
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.carousel {
  outline: none;

  &:focus-visible {
    outline: 2px solid rgb(var(--accent));
    outline-offset: 4px;
    border-radius: 0.75rem;
  }
}

.carousel-viewport {
  position: relative;
  overflow: hidden;
  border-radius: 0.75rem;
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
}

.carousel-slide {
  min-width: 100%;
  height: 100%;
  flex-shrink: 0;
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  cursor: pointer;
}

.carousel-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding-top: 0.75rem;
}

.carousel-nav-btn,
.carousel-page-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  border-radius: 50%;
  border: 1.5px solid rgb(var(--text-faint));
  background: transparent;
  color: rgb(var(--text));
  cursor: pointer;
  flex-shrink: 0;
  font-size: 0.9375rem;
  font-variant-numeric: tabular-nums;
  transition: border-color 0.2s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (hover: hover) {
    &:hover {
      border-color: rgb(var(--text));
    }
  }
}

.carousel-pages {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.carousel-page-btn.active {
  background: rgb(var(--text));
  color: rgb(var(--bg));
  border-color: rgb(var(--text));
  font-weight: 700;
}
</style>
