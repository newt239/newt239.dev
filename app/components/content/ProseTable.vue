<script setup lang="ts">
const scroller = useTemplateRef<HTMLElement>("scroller");
const table = useTemplateRef<HTMLTableElement>("table");
const isScrollable = ref(false);

onMounted(() => {
  const scrollerEl = scroller.value;
  const tableEl = table.value;
  if (!scrollerEl || !tableEl) return;

  const observer = new ResizeObserver(() => {
    isScrollable.value = scrollerEl.scrollWidth > scrollerEl.clientWidth;
  });
  observer.observe(scrollerEl);
  observer.observe(tableEl);
  onUnmounted(() => observer.disconnect());
});
</script>

<template>
  <div
    ref="scroller"
    class="prose-table-scroll"
    :tabindex="isScrollable ? 0 : undefined"
    :role="isScrollable ? 'region' : undefined"
    :aria-label="isScrollable ? '横スクロールできる表' : undefined"
  >
    <table ref="table">
      <slot />
    </table>
  </div>
</template>

<style scoped>
.prose-table-scroll {
  max-width: 100%;
  overflow-x: auto;
  overscroll-behavior-x: contain;
}
</style>
