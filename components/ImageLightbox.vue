<script setup lang="ts">
const props = defineProps<{
  images: { src: string; alt: string }[];
  initialIndex: number;
  open: boolean;
}>();

const emit = defineEmits<{
  close: [index: number];
}>();

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const SCALE_STEP = 0.5;
const PAN_STEP = 40;
const PAN_KEYS: Record<string, [number, number]> = {
  ArrowLeft: [1, 0],
  ArrowRight: [-1, 0],
  ArrowUp: [0, 1],
  ArrowDown: [0, -1],
};

const currentIndex = ref(props.initialIndex);
const dialogRef = ref<HTMLDialogElement | null>(null);
const contentRef = useTemplateRef<HTMLElement>("content");
const imageRef = useTemplateRef<{ imgEl: HTMLImageElement | null }>("image");
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
const currentImage = computed(() => props.images[currentIndex.value]);
const supportsViewTransition = ref(false);

const img = useImage();
useHead({
  link: computed(() => {
    if (!props.open || !hasMultiple.value) return [];
    const total = props.images.length;
    const neighbors = [...new Set([
      (currentIndex.value + 1) % total,
      (currentIndex.value - 1 + total) % total,
    ])].filter((index) => index !== currentIndex.value);
    return neighbors.flatMap((index) => {
      const image = props.images[index];
      if (!image) return [];
      return [{ rel: "prefetch", as: "image", href: img(`/images/${image.src}`) }];
    });
  }),
});

onMounted(() => {
  supportsViewTransition.value = "startViewTransition" in document;
});
const canZoomIn = computed(() => scale.value < MAX_SCALE);
const canZoomOut = computed(() => scale.value > MIN_SCALE);
const canReset = computed(() => scale.value !== 1);
const scalePercent = computed(() => `${Math.round(scale.value * 100)}%`);
const isPanned = computed(() => scale.value > MIN_SCALE);

const imageTransform = computed(() => {
  if (scale.value === 1 && translateX.value === 0 && translateY.value === 0) {
    return undefined;
  }
  return `scale(${scale.value}) translate(${translateX.value}px, ${translateY.value}px)`;
});

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
      nextTick(() => {
        dialogRef.value?.showModal();
      });
    } else {
      resetZoom();
    }
  }
);

function resetZoom() {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
}

function clampTranslate() {
  const image = imageRef.value?.imgEl;
  const content = contentRef.value;
  if (!image || !content) return;
  const limitX =
    Math.max(0, image.offsetWidth * scale.value - content.clientWidth) / 2 / scale.value;
  const limitY =
    Math.max(0, image.offsetHeight * scale.value - content.clientHeight) / 2 / scale.value;
  translateX.value = Math.min(limitX, Math.max(-limitX, translateX.value));
  translateY.value = Math.min(limitY, Math.max(-limitY, translateY.value));
}

function panBy(directionX: number, directionY: number) {
  if (scale.value <= MIN_SCALE) return;
  translateX.value += (directionX * PAN_STEP) / scale.value;
  translateY.value += (directionY * PAN_STEP) / scale.value;
  clampTranslate();
}

function zoomIn() {
  if (canZoomIn.value) {
    scale.value = Math.min(scale.value + SCALE_STEP, MAX_SCALE);
  }
}

function zoomOut() {
  if (canZoomOut.value) {
    scale.value = Math.max(scale.value - SCALE_STEP, MIN_SCALE);
    clampTranslate();
  }
}

function close() {
  emit("close", currentIndex.value);
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
  const direction = PAN_KEYS[e.key];
  if (direction) {
    if (scale.value <= MIN_SCALE) return;
    e.preventDefault();
    panBy(direction[0], direction[1]);
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
  clampTranslate();
}

function onPointerUp() {
  isDragging.value = false;
}
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox" :css="!supportsViewTransition">
      <dialog
        v-if="open"
        ref="dialogRef"
        class="lightbox-overlay"
        aria-label="画像拡大表示"
        @cancel.prevent="close"
        @keydown="onKeydown"
        @click="onBackdropClick"
      >
        <div
          ref="content"
          class="lightbox-content"
          :class="{ 'is-zoomed': isPanned }"
          @click="onBackdropClick"
        >
          <NuxtImg
            v-if="currentImage"
            ref="image"
            :src="`/images/${currentImage.src}`"
            :alt="currentImage.alt"
            class="lightbox-image"
            :class="{ 'is-dragging': isDragging }"
            :style="{ transform: imageTransform, viewTransitionName: 'lightbox-img' }"
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
        <div class="lightbox-bottom-bar">
          <div role="group" aria-label="ズーム操作" class="lightbox-controls">
            <button
              class="lightbox-btn"
              aria-label="縮小"
              :aria-disabled="!canZoomOut"
              :disabled="!canZoomOut"
              @click="zoomOut"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <span class="lightbox-zoom-level" aria-live="polite">{{ scalePercent }}</span>
            <button
              class="lightbox-btn"
              aria-label="拡大"
              :aria-disabled="!canZoomIn"
              :disabled="!canZoomIn"
              @click="zoomIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button
              class="lightbox-btn"
              aria-label="ズームをリセット"
              :aria-disabled="!canReset"
              :disabled="!canReset"
              @click="resetZoom"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
            </button>
          </div>
          <div v-if="isPanned" role="group" aria-label="画像の移動" class="lightbox-controls">
            <button class="lightbox-btn" aria-label="左を表示" @click="panBy(1, 0)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <button class="lightbox-btn" aria-label="上を表示" @click="panBy(0, 1)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15" /></svg>
            </button>
            <button class="lightbox-btn" aria-label="下を表示" @click="panBy(0, -1)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            <button class="lightbox-btn" aria-label="右を表示" @click="panBy(-1, 0)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
          <div v-if="hasMultiple" role="group" aria-label="画像の切り替え" class="lightbox-controls">
            <button class="lightbox-btn" aria-label="前の画像" @click="prev">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            </button>
            <span class="lightbox-counter" aria-live="polite">{{ currentIndex + 1 }} / {{ images.length }}</span>
            <button class="lightbox-btn" aria-label="次の画像" @click="next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </button>
          </div>
        </div>
      </dialog>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  view-transition-name: lightbox-overlay;
  width: auto;
  height: auto;
  max-width: none;
  max-height: none;
  margin: 0;
  padding: 0;
  border: none;
  color: inherit;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  outline: none;

  &::backdrop {
    background: none;
  }
}

.lightbox-close:focus-visible,
.lightbox-btn:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
}

/* 拡大した画像を画像枠でクリップしないため、はみ出しはオーバーレイ側だけで止める */
.lightbox-content {
  flex: 1;
  min-height: 0;
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-content.is-zoomed {
  cursor: grab;
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--radius-sm);
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
  z-index: 1;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  border: none;
  border-radius: var(--radius-round);
  corner-shape: round;
  width: var(--tap-target-size);
  height: var(--tap-target-size);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);

  @media (hover: hover) {
    &:hover {
      background: rgba(0, 0, 0, 0.85);
    }
  }
}

.lightbox-bottom-bar {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.75rem 1.5rem;
  padding-bottom: 1.5rem;
  max-width: calc(100% - 1rem);
  min-width: 0;
}

.lightbox-counter {
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.9375rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  padding-inline: 0.5rem;
}

.lightbox-controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;
  min-width: 0;
  background: rgba(0, 0, 0, 0.72);
  border-radius: var(--radius-md);
  padding: 0.25rem;
}

.lightbox-btn {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  width: var(--tap-target-size);
  height: var(--tap-target-size);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: var(--transition);

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
  min-width: 3.5rem;
  text-align: center;
  white-space: nowrap;
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
