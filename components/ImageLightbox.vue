<script setup lang="ts">
const props = defineProps<{
  images: { src: string; alt: string }[];
  initialIndex: number;
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const SCALE_STEP = 0.5;

const currentIndex = ref(props.initialIndex);
const dialogRef = ref<HTMLElement | null>(null);
const scale = ref(1);
const translateX = ref(0);
const translateY = ref(0);
const isDragging = ref(false);

let dragStartX = 0;
let dragStartY = 0;
let dragStartTranslateX = 0;
let dragStartTranslateY = 0;
let didDrag = false;

const hasMultiple = computed(() => props.images.length > 1);
const canZoomIn = computed(() => scale.value < MAX_SCALE);
const canZoomOut = computed(() => scale.value > MIN_SCALE);
const canReset = computed(() => scale.value !== 1);
const scalePercent = computed(() => `${Math.round(scale.value * 100)}%`);
const isPanned = computed(() => scale.value > MIN_SCALE);

const imageTransform = computed(
  () => `scale(${scale.value}) translate(${translateX.value}px, ${translateY.value}px)`
);

watch(
  () => props.initialIndex,
  (val) => {
    currentIndex.value = val;
  }
);

watch(
  () => props.open,
  (val) => {
    if (val) {
      document.body.style.overflow = "hidden";
      nextTick(() => {
        dialogRef.value?.focus();
      });
    } else {
      document.body.style.overflow = "";
      resetZoom();
    }
  }
);

onUnmounted(() => {
  document.body.style.overflow = "";
});

function resetZoom() {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
}

function zoomIn() {
  if (canZoomIn.value) {
    scale.value = Math.min(scale.value + SCALE_STEP, MAX_SCALE);
  }
}

function zoomOut() {
  if (canZoomOut.value) {
    scale.value = Math.max(scale.value - SCALE_STEP, MIN_SCALE);
    if (scale.value === MIN_SCALE) {
      translateX.value = 0;
      translateY.value = 0;
    }
  }
}

function close() {
  emit("close");
}

function prev() {
  resetZoom();
  currentIndex.value =
    ((currentIndex.value - 1) + props.images.length) % props.images.length;
}

function next() {
  resetZoom();
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    e.preventDefault();
    close();
  } else if (e.key === "ArrowLeft") {
    e.preventDefault();
    prev();
  } else if (e.key === "ArrowRight") {
    e.preventDefault();
    next();
  } else if (e.key === "+" || e.key === "=") {
    e.preventDefault();
    zoomIn();
  } else if (e.key === "-") {
    e.preventDefault();
    zoomOut();
  } else if (e.key === "0") {
    e.preventDefault();
    resetZoom();
  }
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget && !didDrag) {
    close();
  }
  didDrag = false;
}

function onPointerDown(e: PointerEvent) {
  if (scale.value <= MIN_SCALE) return;
  if (e.pointerType === "touch" && !e.isPrimary) return;

  isDragging.value = true;
  didDrag = false;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragStartTranslateX = translateX.value;
  dragStartTranslateY = translateY.value;

  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  e.preventDefault();
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging.value) return;

  const dx = (e.clientX - dragStartX) / scale.value;
  const dy = (e.clientY - dragStartY) / scale.value;

  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
    didDrag = true;
  }

  translateX.value = dragStartTranslateX + dx;
  translateY.value = dragStartTranslateY + dy;
}

function onPointerUp() {
  isDragging.value = false;
}
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="open"
        ref="dialogRef"
        class="lightbox-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="画像拡大表示"
        tabindex="-1"
        @keydown="onKeydown"
        @click="onBackdropClick"
      >
        <div
          class="lightbox-content"
          :class="{ 'is-zoomed': isPanned }"
          :aria-roledescription="isPanned ? 'ドラッグで画像を移動できます' : undefined"
        >
          <NuxtImg
            :src="`/images/${images[currentIndex].src}`"
            :alt="images[currentIndex].alt"
            class="lightbox-image"
            :class="{ 'is-dragging': isDragging }"
            :style="{ transform: imageTransform }"
            draggable="false"
            @pointerdown="onPointerDown"
            @pointermove="onPointerMove"
            @pointerup="onPointerUp"
            @pointercancel="onPointerUp"
          />
        </div>
        <button class="lightbox-close" aria-label="閉じる" @click="close">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        <template v-if="hasMultiple">
          <button class="lightbox-nav lightbox-nav-prev" aria-label="前の画像" @click="prev">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
          <button class="lightbox-nav lightbox-nav-next" aria-label="次の画像" @click="next">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
          </button>
        </template>
        <div class="lightbox-bottom-bar">
          <div v-if="hasMultiple" class="lightbox-counter">
            {{ currentIndex + 1 }} / {{ images.length }}
          </div>
          <div role="toolbar" aria-label="ズーム操作" class="lightbox-zoom-controls">
            <button
              class="lightbox-zoom-btn"
              :aria-label="'縮小'"
              :aria-disabled="!canZoomOut"
              :disabled="!canZoomOut"
              @click="zoomOut"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <span class="lightbox-zoom-level" aria-live="polite">{{ scalePercent }}</span>
            <button
              class="lightbox-zoom-btn"
              :aria-label="'拡大'"
              :aria-disabled="!canZoomIn"
              :disabled="!canZoomIn"
              @click="zoomIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button
              class="lightbox-zoom-btn lightbox-zoom-reset"
              aria-label="ズームをリセット"
              :aria-disabled="!canReset"
              :disabled="!canReset"
              @click="resetZoom"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.lightbox-content.is-zoomed {
  cursor: grab;
}

.lightbox-image {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 0.5rem;
  transition: transform 0.2s ease;
  user-select: none;
  touch-action: none;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.lightbox-image.is-dragging {
  cursor: grabbing;
  transition: none;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (hover: hover) {
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

.lightbox-nav-prev {
  left: 1rem;
}

.lightbox-nav-next {
  right: 1rem;
}

.lightbox-bottom-bar {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.lightbox-counter {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9375rem;
  font-variant-numeric: tabular-nums;
}

.lightbox-zoom-controls {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 1.5rem;
  padding: 0.25rem;
}

.lightbox-zoom-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: rgba(255, 255, 255, 0.25);
    }
  }

  &:disabled {
    opacity: 0.35;
    cursor: default;
  }
}

.lightbox-zoom-level {
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.8125rem;
  font-variant-numeric: tabular-nums;
  min-width: 3rem;
  text-align: center;
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
