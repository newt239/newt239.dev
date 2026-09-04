<script setup lang="ts">
import { IconChevronDown, IconChevronLeft, IconChevronRight, IconChevronUp, IconMinus, IconPlus, IconX, IconZoomReset } from "@tabler/icons-vue";

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
const dialogRef = useTemplateRef<HTMLDialogElement>("dialog");
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
    const next = (currentIndex.value + 1) % total;
    const prev = (currentIndex.value - 1 + total) % total;
    const neighbors = next === prev ? [next] : [next, prev];
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
const isZoomed = computed(() => scale.value > MIN_SCALE);
const scalePercent = computed(() => `${Math.round(scale.value * 100)}%`);

const imageTransform = computed(() => {
  if (scale.value === 1 && translateX.value === 0 && translateY.value === 0) {
    return undefined;
  }
  return `scale(${scale.value}) translate(${translateX.value}px, ${translateY.value}px)`;
});

const resetZoom = () => {
  scale.value = 1;
  translateX.value = 0;
  translateY.value = 0;
};

const clampTranslate = () => {
  const image = imageRef.value?.imgEl;
  const content = contentRef.value;
  if (!image || !content) return;
  const limitX =
    Math.max(0, image.offsetWidth * scale.value - content.clientWidth) / 2 / scale.value;
  const limitY =
    Math.max(0, image.offsetHeight * scale.value - content.clientHeight) / 2 / scale.value;
  translateX.value = Math.min(limitX, Math.max(-limitX, translateX.value));
  translateY.value = Math.min(limitY, Math.max(-limitY, translateY.value));
};

const panBy = (directionX: number, directionY: number) => {
  if (!isZoomed.value) return;
  translateX.value += (directionX * PAN_STEP) / scale.value;
  translateY.value += (directionY * PAN_STEP) / scale.value;
  clampTranslate();
};

const zoomIn = () => {
  if (canZoomIn.value) {
    scale.value = Math.min(scale.value + SCALE_STEP, MAX_SCALE);
  }
};

const zoomOut = () => {
  if (isZoomed.value) {
    scale.value = Math.max(scale.value - SCALE_STEP, MIN_SCALE);
    clampTranslate();
  }
};

const close = () => {
  emit("close", currentIndex.value);
};

const prev = () => {
  resetZoom();
  currentIndex.value =
    ((currentIndex.value - 1) + props.images.length) % props.images.length;
};

const next = () => {
  resetZoom();
  currentIndex.value = (currentIndex.value + 1) % props.images.length;
};

const onKeydown = (e: KeyboardEvent) => {
  const direction = PAN_KEYS[e.key];
  if (direction) {
    if (!isZoomed.value) return;
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
};

const onBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget && !didDrag) {
    close();
  }
  didDrag = false;
};

const onPointerDown = (e: PointerEvent) => {
  if (!isZoomed.value) return;
  if (e.pointerType === "touch" && !e.isPrimary) return;

  isDragging.value = true;
  didDrag = false;
  dragStartX = e.clientX;
  dragStartY = e.clientY;
  dragStartTranslateX = translateX.value;
  dragStartTranslateY = translateY.value;

  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  e.preventDefault();
};

const onPointerMove = (e: PointerEvent) => {
  if (!isDragging.value) return;

  const dx = (e.clientX - dragStartX) / scale.value;
  const dy = (e.clientY - dragStartY) / scale.value;

  if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
    didDrag = true;
  }

  translateX.value = dragStartTranslateX + dx;
  translateY.value = dragStartTranslateY + dy;
  clampTranslate();
};

const onPointerUp = () => {
  isDragging.value = false;
};

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
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox" :css="!supportsViewTransition">
      <dialog
        v-if="open"
        ref="dialog"
        class="lightbox-overlay"
        aria-label="画像拡大表示"
        @cancel.prevent="close"
        @keydown="onKeydown"
        @click="onBackdropClick"
      >
        <div
          ref="content"
          class="lightbox-content"
          :class="{ 'is-zoomed': isZoomed }"
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
          <IconX :size="24" aria-hidden="true" />
        </button>
        <div class="lightbox-bottom-bar">
          <div class="lightbox-controls">
            <div role="group" aria-label="ズーム操作" class="lightbox-cluster">
              <button
                class="lightbox-btn"
                aria-label="縮小"
                :aria-disabled="!isZoomed"
                @click="zoomOut"
              >
                <IconMinus :size="18" aria-hidden="true" />
              </button>
              <span class="lightbox-zoom-level" aria-live="polite">{{ scalePercent }}</span>
              <button
                class="lightbox-btn"
                aria-label="拡大"
                :aria-disabled="!canZoomIn"
                @click="zoomIn"
              >
                <IconPlus :size="18" aria-hidden="true" />
              </button>
              <button
                class="lightbox-btn"
                aria-label="ズームをリセット"
                :aria-disabled="!isZoomed"
                @click="isZoomed && resetZoom()"
              >
                <IconZoomReset :size="18" aria-hidden="true" />
              </button>
            </div>
            <div role="group" aria-label="画像の移動" class="lightbox-cluster">
              <button
                class="lightbox-btn"
                aria-label="左を表示"
                :aria-disabled="!isZoomed"
                @click="panBy(1, 0)"
              >
                <IconChevronLeft :size="18" aria-hidden="true" />
              </button>
              <button
                class="lightbox-btn"
                aria-label="上を表示"
                :aria-disabled="!isZoomed"
                @click="panBy(0, 1)"
              >
                <IconChevronUp :size="18" aria-hidden="true" />
              </button>
              <button
                class="lightbox-btn"
                aria-label="下を表示"
                :aria-disabled="!isZoomed"
                @click="panBy(0, -1)"
              >
                <IconChevronDown :size="18" aria-hidden="true" />
              </button>
              <button
                class="lightbox-btn"
                aria-label="右を表示"
                :aria-disabled="!isZoomed"
                @click="panBy(-1, 0)"
              >
                <IconChevronRight :size="18" aria-hidden="true" />
              </button>
            </div>
          </div>
          <div v-if="hasMultiple" role="group" aria-label="画像の切り替え" class="lightbox-controls">
            <button class="lightbox-btn" aria-label="前の画像" @click="prev">
              <IconChevronLeft :size="18" aria-hidden="true" />
            </button>
            <span class="lightbox-counter" aria-live="polite">{{ currentIndex + 1 }} / {{ images.length }}</span>
            <button class="lightbox-btn" aria-label="次の画像" @click="next">
              <IconChevronRight :size="18" aria-hidden="true" />
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
  inset: 0 0 auto;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  max-width: none;
  height: 100lvh;
  max-height: none;
  padding: 0 0 calc(100lvh - 100svh);
  margin: 0;
  overflow: hidden;
  color: inherit;
  outline: none;
  background: rgb(0 0 0 / 85%);
  border: none;
  view-transition-name: lightbox-overlay;

  &::backdrop {
    background: none;
  }
}

/* 拡大した画像を画像枠でクリップしないため、はみ出しはオーバーレイ側だけで止める */
.lightbox-content {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 0;
  padding: 1rem;
}

.lightbox-content.is-zoomed {
  cursor: grab;
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  touch-action: none;
  user-select: none;
  object-fit: contain;
  border-radius: var(--radius-sm);
  transition: transform 0.2s ease;

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
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--tap-target-size);
  height: var(--tap-target-size);
  color: #fff;
  cursor: pointer;
  background: rgb(0 0 0 / 70%);
  border: none;
  border-radius: var(--radius-round);
  corner-shape: round;
  transition: var(--transition);

  @media (hover: hover) {
    &:hover {
      background: rgb(0 0 0 / 85%);
    }
  }
}

.lightbox-bottom-bar {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  min-width: 0;
  max-width: calc(100% - 1rem);
  padding-bottom: 1.5rem;
}

.lightbox-counter {
  padding-inline: 0.5rem;
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
  color: rgb(255 255 255 / 90%);
  white-space: nowrap;
}

.lightbox-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  min-width: 0;
  padding: 0.25rem;
  background: rgb(0 0 0 / 72%);
  border-radius: var(--radius-md);
}

.lightbox-controls:has(> .lightbox-cluster) {
  gap: 0.5rem 1.5rem;
}

.lightbox-cluster {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
  min-width: 0;
}

.lightbox-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--tap-target-size);
  height: var(--tap-target-size);
  color: #fff;
  cursor: pointer;
  background: rgb(255 255 255 / 14%);
  border: none;
  border-radius: var(--radius-sm);
  transition: var(--transition);

  @media (hover: hover) {
    &:hover:not([aria-disabled="true"]) {
      background: rgb(255 255 255 / 25%);
    }
  }

  &[aria-disabled="true"] {
    cursor: default;
    opacity: 0.35;
  }
}

.lightbox-close:focus-visible,
.lightbox-btn:focus-visible {
  outline: var(--focus-ring-width) solid currentcolor;
  outline-offset: var(--focus-ring-offset);
}

.lightbox-zoom-level {
  min-width: 3.5rem;
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  color: rgb(255 255 255 / 85%);
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
