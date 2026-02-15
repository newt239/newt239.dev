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
      <button class="carousel-btn carousel-btn-prev" aria-label="前の画像" @click="prev">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button class="carousel-btn carousel-btn-next" aria-label="次の画像" @click="next">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>
      <div class="carousel-dots" role="tablist" aria-label="スライド選択">
        <button
          v-for="(_, index) in images"
          :key="index"
          class="carousel-dot"
          :class="{ active: index === currentIndex }"
          role="tab"
          :aria-selected="index === currentIndex"
          :aria-label="`スライド ${index + 1}`"
          @click="goTo(index)"
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.carousel {
  position: relative;
  outline: none;

  &:focus-visible {
    outline: 2px solid rgb(var(--color-link));
    outline-offset: 4px;
    border-radius: 0.75rem;
  }
}

.carousel-viewport {
  overflow: hidden;
  border-radius: 0.75rem;
}

.carousel-track {
  display: flex;
  transition: transform 0.4s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.carousel-slide {
  min-width: 100%;
  flex-shrink: 0;
}

.carousel-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  display: block;
  cursor: pointer;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
  z-index: 1;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (hover: hover) {
    &:hover {
      background: rgba(0, 0, 0, 0.6);
    }
  }
}

.carousel-btn-prev {
  left: 0.75rem;
}

.carousel-btn-next {
  right: 0.75rem;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 0 0;
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid rgb(var(--color-text));
  background: transparent;
  padding: 0;
  cursor: pointer;
  transition: background 0.2s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &.active {
    background: rgb(var(--color-text));
  }
}
</style>
