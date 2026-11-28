<script setup lang="ts">
type TocItem = { id: string; text: string; children?: readonly TocItem[] };

const props = defineProps<{
  items: readonly TocItem[];
  container: Element | null | undefined;
}>();

const labelId = useId();
const visibleIds = ref(new Set<string>());
const listRef = useTemplateRef<HTMLOListElement>("list");
const indicator = ref<{ top: number; height: number }>();

const measureIndicator = () => {
  const active = listRef.value?.querySelectorAll<HTMLElement>(".is-active") ?? [];
  const first = active[0];
  const last = active[active.length - 1];
  indicator.value = first && last ? { top: first.offsetTop, height: last.offsetTop + last.offsetHeight - first.offsetTop } : undefined;
};

watch(visibleIds, measureIndicator, { flush: "post" });

watchPostEffect((onCleanup) => {
  const list = listRef.value;
  if (!list) return;
  const observer = new ResizeObserver(measureIndicator);
  observer.observe(list);
  onCleanup(() => observer.disconnect());
});

watchPostEffect((onCleanup) => {
  const container = props.container;
  if (!container) return;
  const idPaths = new Map<string, string[]>();
  const collectPaths = (items: readonly TocItem[], parents: string[]) => {
    for (const item of items) {
      const path = [...parents, item.id];
      idPaths.set(item.id, path);
      collectPaths(item.children ?? [], path);
    }
  };
  collectPaths(props.items, []);

  const anchors = [...container.querySelectorAll("[id]")].filter((element) => idPaths.has(element.id));
  const blockPaths = new Map<Element, string[]>();
  let currentPath: string[] | undefined;
  const collectBlocks = (parent: Element) => {
    for (const element of parent.children) {
      currentPath = idPaths.get(element.id) ?? currentPath;
      if (anchors.some((anchor) => anchor !== element && element.contains(anchor))) collectBlocks(element);
      else if (currentPath) blockPaths.set(element, currentPath);
    }
  };
  collectBlocks(container);

  const intersecting = new Set<Element>();
  const headerOffset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) intersecting.add(entry.target);
        else intersecting.delete(entry.target);
      }
      visibleIds.value = new Set([...intersecting].flatMap((element) => blockPaths.get(element) ?? []));
    },
    { rootMargin: `-${headerOffset}px 0px 0px` }
  );
  for (const element of blockPaths.keys()) observer.observe(element);
  onCleanup(() => observer.disconnect());
});
</script>

<template>
  <nav class="toc" :aria-labelledby="labelId">
    <h2 :id="labelId" class="section-heading">目次</h2>
    <div class="toc-list">
      <ol ref="list">
        <li v-for="item in items" :key="item.id">
          <NuxtLink :to="{ hash: `#${item.id}` }" :class="{ 'is-active': visibleIds.has(item.id) }">{{ item.text }}</NuxtLink>
          <ol v-if="item.children">
            <li v-for="child in item.children" :key="child.id">
              <NuxtLink :to="{ hash: `#${child.id}` }" :class="{ 'is-active': visibleIds.has(child.id) }">{{ child.text }}</NuxtLink>
              <ol v-if="child.children">
                <li v-for="grandchild in child.children" :key="grandchild.id">
                  <NuxtLink :to="{ hash: `#${grandchild.id}` }" :class="{ 'is-active': visibleIds.has(grandchild.id) }">{{ grandchild.text }}</NuxtLink>
                </li>
              </ol>
            </li>
          </ol>
        </li>
      </ol>
      <span
        class="toc-indicator"
        :class="{ 'is-visible': indicator }"
        :style="indicator && { '--toc-indicator-top': `${indicator.top}px`, '--toc-indicator-height': `${indicator.height}px` }"
        aria-hidden="true"
      />
    </div>
  </nav>
</template>

<style scoped>
.toc-list {
  position: relative;
}

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

    ol ol & {
      padding-left: 1.5rem;
      font-size: 0.875rem;
    }

    ol ol ol & {
      padding-left: 2.25rem;
    }

    &.is-active {
      font-weight: 800;
      color: oklch(var(--text));
    }

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
    }
  }
}

.toc-indicator {
  position: absolute;
  top: 0;
  left: 0;
  height: var(--toc-indicator-height, 0);
  pointer-events: none;
  border-left: var(--border-width) solid oklch(var(--accent));
  opacity: 0;
  translate: 0 var(--toc-indicator-top, 0);
  transition-timing-function: var(--transition-easing);
  transition-duration: var(--toc-indicator-duration);
  transition-property: translate, height, opacity;

  &.is-visible {
    opacity: 1;
  }

  @media (forced-colors: active) {
    border-left-color: CanvasText;
  }
}
</style>
