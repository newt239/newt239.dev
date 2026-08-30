<script lang="ts" setup>
import { IconChevronLeft } from "@tabler/icons-vue";

import { clearError, type NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const isNotFound = computed(() => props.error.statusCode === 404);
const heading = computed(() =>
  isNotFound.value ? "ページが見つかりません" : "エラーが発生しました"
);
const description = computed(() =>
  isNotFound.value
    ? "お探しのページは移動または削除された可能性があります。"
    : "しばらく時間をおいてからもう一度お試しください。"
);

useSeoMeta({
  title: `${heading.value} - newt239.dev`,
  ogTitle: `${heading.value} - newt239.dev`,
  robots: "noindex",
});
</script>

<template>
  <NuxtLayout>
    <main>
      <div class="container error-page">
        <p class="status-code" lang="en">{{ error.statusCode }}</p>
        <h1 v-colorful-heading class="error-heading">{{ heading }}</h1>
        <p class="error-description">{{ description }}</p>
        <div class="error-actions">
          <button type="button" class="back" @click="clearError({ redirect: '/' })">
            <IconChevronLeft aria-hidden="true" />
            トップへ戻る
          </button>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>

<style>
.error-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;

  .status-code {
    margin: 0;
    font-size: clamp(min(4rem, 20vw), 2rem + 5vw, 6rem);
    font-weight: 800;
    line-height: 1;
    color: rgb(var(--text-faint));
  }

  .error-heading {
    width: auto;
    text-box: normal;
    padding: 1rem 0 0.5rem;
    line-height: var(--line-height-heading);
  }

  .error-description {
    margin: 0;
    color: rgb(var(--text-muted));
    text-wrap: balance;
  }

  .error-actions {
    width: 100%;
    padding: 2rem 0 1rem;
  }

  .back {
    display: inline-flex;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 320px;
    padding: 0.75rem 1.5rem;
    font-family: unset;
    font-size: 1rem;
    color: rgb(var(--text));
    cursor: pointer;
    background-color: rgb(var(--surface));
    border: var(--border-width) solid transparent;
    border-radius: var(--radius-sm);
    transition: var(--transition);

    @media (hover: hover) {
      &:hover {
        border-color: rgb(var(--text));
      }
    }

    @media (hover: none) {
      &:active {
        border-color: rgb(var(--text));
      }
    }
  }
}
</style>
