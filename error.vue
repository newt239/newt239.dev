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

usePageSeo({ title: heading.value });
useSeoMeta({ robots: "noindex" });
</script>

<template>
  <NuxtLayout>
    <div>
      <div class="container error-page">
        <p class="status-code" lang="en">{{ error.statusCode }}</p>
        <h1 v-colorful-heading class="error-heading">{{ heading }}</h1>
        <p class="error-description">{{ description }}</p>
        <div class="error-actions">
          <button type="button" class="back-button surface-button" @click="clearError({ redirect: '/' })">
            <IconChevronLeft aria-hidden="true" />
            トップへ戻る
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.error-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  min-height: calc(100dvh - var(--header-height));
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
    padding: 0;
    text-box: normal;
    line-height: var(--line-height-heading);
  }

  .error-description {
    margin: 0;
    color: rgb(var(--text-muted));
    text-wrap: balance;
  }

  .error-actions {
    width: 100%;
    padding: 1rem 0 0;
  }
}
</style>
