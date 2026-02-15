<script setup lang="ts">
const props = defineProps<{
  images: { src: string; alt: string }[];
  initialIndex: number;
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const currentIndex = ref(props.initialIndex);
const dialogRef = ref<HTMLElement | null>(null);

const hasMultiple = computed(() => props.images.length > 1);

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
    }
  }
);

onUnmounted(() => {
  document.body.style.overflow = "";
});

function close() {
  emit("close");
}

function prev() {
  currentIndex.value =
    ((currentIndex.value - 1) + props.images.length) % props.images.length;
}

function next() {
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
  }
}

function onBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    close();
  }
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
        <div class="lightbox-content">
          <NuxtImg
            :src="`/images/${images[currentIndex].src}`"
            :alt="images[currentIndex].alt"
            class="lightbox-image"
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
          <div class="lightbox-counter">
            {{ currentIndex + 1 }} / {{ images.length }}
          </div>
        </template>
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
}

.lightbox-image {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 0.5rem;
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

.lightbox-counter {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
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
