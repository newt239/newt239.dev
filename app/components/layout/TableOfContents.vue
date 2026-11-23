<script setup lang="ts">
const props = defineProps<{
  items: readonly { id: string; text: string }[];
  container: Element | null | undefined;
}>();

const labelId = useId();
const visibleIds = ref(new Set<string>());

watchPostEffect((onCleanup) => {
  if (!props.container) return;
  const itemIds = new Set(props.items.map((item) => item.id));
  const sectionIds = new Map<Element, string>();
  let currentId: string | undefined;
  for (const element of props.container.children) {
    if (itemIds.has(element.id)) currentId = element.id;
    if (currentId) sectionIds.set(element, currentId);
  }

  const intersecting = new Set<Element>();
  const headerOffset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) intersecting.add(entry.target);
        else intersecting.delete(entry.target);
      }
      visibleIds.value = new Set([...intersecting].flatMap((element) => sectionIds.get(element) ?? []));
    },
    { rootMargin: `-${headerOffset}px 0px 0px` }
  );
  for (const element of sectionIds.keys()) observer.observe(element);
  onCleanup(() => observer.disconnect());
});
</script>

<template>
  <nav class="toc" :aria-labelledby="labelId">
    <h2 :id="labelId" class="section-heading">目次</h2>
    <ol>
      <li v-for="item in items" :key="item.id">
        <NuxtLink :to="{ hash: `#${item.id}` }" :class="{ 'is-active': visibleIds.has(item.id) }">{{ item.text }}</NuxtLink>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.toc {
  ol {
    padding: 0;
    margin: 0;
    line-height: var(--line-height-tight);
    list-style: none;
  }

  a {
    display: block;
    padding: 0.5rem 0 0.5rem 0.75rem;
    color: oklch(var(--text-muted));
    overflow-wrap: anywhere;
    text-decoration: none;
    border-left: var(--border-width) solid oklch(var(--border));
    transition: var(--transition);

    &.is-active {
      font-weight: 800;
      color: oklch(var(--text));
      border-left-color: oklch(var(--accent));
    }

    /* スクロール領域の端で外側のリングが切れる */
    &:focus-visible {
      outline-offset: calc(var(--focus-ring-offset) * -1);
    }

    @media (hover: hover) {
      &:hover {
        color: oklch(var(--text));
      }
    }

    @media (forced-colors: active) {
      border-left-color: transparent;

      &.is-active {
        border-left-color: CanvasText;
      }
    }
  }
}
</style>
