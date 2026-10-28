<script setup lang="ts">
import { IconBrandX, IconBrandYoutubeFilled, IconExternalLink, IconPlayerPlayFilled } from "@tabler/icons-vue";

import type { LinkCard } from "~/libs/link-card";
import linkCards from "~/libs/link-cards.json";

const props = defineProps<{ url: string }>();

const card = (linkCards as Record<string, LinkCard>)[props.url];
if (!card) {
  throw new Error(`${props.url} のリンクカードがありません。pnpm run content を実行してください`);
}

const duration = (() => {
  const seconds = card.youtube?.durationSeconds;
  if (seconds === undefined) return undefined;
  const parts = [Math.floor(seconds / 3600), Math.floor((seconds % 3600) / 60), seconds % 60];
  return parts
    .slice(parts[0] ? 0 : 1)
    .map((part, index) => (index === 0 ? String(part) : String(part).padStart(2, "0")))
    .join(":");
})();
</script>

<template>
  <a
    :href="url"
    target="_blank"
    rel="noopener noreferrer"
    :class="['link-card', 'surface-card', `is-${card.kind}`]"
    :aria-label="`${card.title} - ${card.kind === 'youtube' ? 'YouTube' : card.kind === 'x' ? 'X' : card.domain}（外部サイト）`"
  >
    <template v-if="card.kind === 'youtube'">
      <span class="link-card-thumb">
        <NuxtImg v-if="card.image" :src="card.image" alt="" width="420" height="236" loading="lazy" class="link-card-image" />
        <span class="link-card-play"><IconPlayerPlayFilled :size="20" aria-hidden="true" /></span>
        <span v-if="duration" class="link-card-duration">{{ duration }}</span>
      </span>
      <span class="link-card-body">
        <span class="link-card-site">
          <IconBrandYoutubeFilled :size="16" aria-hidden="true" />
          <span>{{ ["YouTube", card.youtube?.channelName].filter(Boolean).join(" · ") }}</span>
        </span>
        <span class="link-card-title line-clamp">{{ card.title }}<IconExternalLink class="external-icon" aria-hidden="true" /></span>
      </span>
    </template>

    <template v-else-if="card.kind === 'x' && card.x">
      <span class="link-card-body">
        <span class="link-card-author">
          <NuxtImg v-if="card.icon" :src="card.icon" alt="" width="36" height="36" loading="lazy" class="link-card-avatar" />
          <span class="link-card-author-names">
            <span class="link-card-title">{{ card.x.authorName }}<IconExternalLink class="external-icon" aria-hidden="true" /></span>
            <span class="link-card-handle">@{{ card.x.authorHandle }}</span>
          </span>
          <IconBrandX :size="18" aria-hidden="true" />
        </span>
        <span v-if="card.description" class="link-card-post line-clamp">{{ card.description }}</span>
      </span>
      <NuxtImg v-if="card.image" :src="card.image" alt="" width="420" loading="lazy" class="link-card-image" />
    </template>

    <template v-else>
      <span class="link-card-body">
        <span class="link-card-text line-clamp">
          <span class="link-card-title line-clamp">{{ card.title }}<IconExternalLink class="external-icon" aria-hidden="true" /></span>
          <span v-if="card.description" class="link-card-description">{{ card.description }}</span>
        </span>
        <span class="link-card-site">
          <NuxtImg v-if="card.icon" :src="card.icon" alt="" width="16" height="16" loading="lazy" class="link-card-favicon" />
          <span>{{ card.domain }}</span>
        </span>
      </span>
      <NuxtImg v-if="card.image" :src="card.image" alt="" width="240" height="126" loading="lazy" class="link-card-image" />
    </template>
  </a>
</template>

<style scoped>
.link-card {
  display: grid;
  margin: 0.75rem 0;
  overflow: hidden;
  color: oklch(var(--text));
  text-decoration: none;

  &:focus-visible {
    outline: var(--focus-ring-width) solid oklch(var(--focus-ring));
    outline-offset: var(--focus-ring-offset);
  }
}

.link-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  min-width: 0;
  padding: 0.75rem 1rem;
}

.link-card-title {
  --line-clamp: 2;

  font-weight: 800;
  line-height: var(--line-height-tight);
}

.link-card-description {
  font-size: 0.875rem;
  line-height: var(--line-height-tight);
  color: oklch(var(--text-muted));
}

/* タイトルは 2 行まで、説明と合わせて 3 行に収める。タイトルが 1 行なら説明を 2 行にし、高さはタイトル 2 行と説明 1 行に固定する */
.link-card-text {
  --line-clamp: 3;

  height: calc((2 * 1rem + 0.875rem) * var(--line-height-tight) + 0.25rem);

  .link-card-description {
    display: block;
    margin-top: 0.25rem;
  }
}

.link-card-site {
  display: flex;
  gap: 0.25rem;
  align-items: center;
  min-width: 0;
  margin-top: auto;
  font-size: 0.75rem;
  line-height: var(--line-height-tight);
  color: oklch(var(--text-muted));

  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    flex-shrink: 0;
    vertical-align: 0;
  }
}

.link-card-favicon {
  flex-shrink: 0;
  width: 1rem;
  height: 1rem;
  border-radius: var(--radius-xs);
}

.link-card-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.is-generic {
  grid-template-columns: minmax(0, 1fr) min(40%, 15rem);
  max-width: 44rem;

  .link-card-image {
    aspect-ratio: 1.91 / 1;
  }

  /* 画像のないカードも、画像のあるカードと高さを揃える */
  &:not(:has(> .link-card-image)) {
    grid-template-columns: minmax(0, 1fr);
    min-height: calc(15rem / 1.91 + 2 * var(--border-width));
  }

  @media (width <= 30rem) {
    grid-template-columns: minmax(0, 1fr) 30%;

    .link-card-image {
      aspect-ratio: 1;
    }

    .link-card-text {
      --line-clamp: 2;

      height: auto;
    }

    .link-card-description {
      display: none;
    }
  }
}

.is-youtube,
.is-x {
  max-width: 26.25rem;

  @media (width <= 48rem) {
    max-width: none;
  }
}

.link-card-thumb {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  background: oklch(var(--surface-hover));
}

.link-card-play {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  width: 3.5rem;
  height: 2.5rem;
  margin: auto;
  color: oklch(var(--bg));
  background: oklch(var(--text) / 72%);
  border-radius: var(--radius-md);
}

.link-card-duration {
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  padding: 0 0.25rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: var(--line-height-tight);
  color: oklch(var(--bg));
  background: oklch(var(--text) / 75%);
  border-radius: var(--radius-xs);
}

.is-youtube .link-card-site {
  margin-top: 0;
}

.link-card-author {
  display: flex;
  gap: 0.5rem;
  align-items: center;

  > svg {
    flex-shrink: 0;
    margin-left: auto;
    vertical-align: 0;
  }
}

.link-card-avatar {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: var(--radius-round);
}

.link-card-author-names {
  display: flex;
  flex-direction: column;
  min-width: 0;

  > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.link-card-handle {
  font-size: 0.75rem;
  line-height: var(--line-height-tight);
  color: oklch(var(--text-muted));
}

.link-card-post {
  --line-clamp: 6;

  margin-top: 0.25rem;
  font-size: 0.875rem;
  line-height: var(--line-height-tight);
  white-space: pre-wrap;
}

.is-x .link-card-image {
  max-height: 20rem;
  border-top: var(--border-width-hairline) solid oklch(var(--border));
}

@media print {
  .link-card::after {
    grid-column: 1 / -1;
    padding: 0 1rem 0.75rem;
  }

  .link-card-play,
  .link-card-duration {
    display: none;
  }
}
</style>
