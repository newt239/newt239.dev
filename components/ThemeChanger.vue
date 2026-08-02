<script lang="ts" setup>
import { IconSparkles, IconLoader2 } from "@tabler/icons-vue";

import { applyTheme, themeVariables } from "~/libs/theme";

import type { ThemeGenerationResponse } from "~/libs/theme";

const fallbackMessage = "Something went wrong. Please try another word.";

const isGenerating = ref(false);
const promptModel = defineModel<string>();
const modalRef = ref();
const responseMessage = ref("Caution: All prompts are recorded.");

const generateTheme = async () => {
  if (!promptModel.value) {
    promptModel.value = "fairy tale";
  }
  isGenerating.value = true;
  try {
    const res = await fetch("https://api.newt239.dev/ai/generate-theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: promptModel.value,
        requiredVariables: themeVariables,
      }),
    });
    const content: ThemeGenerationResponse = await res.json();
    if (content.type !== "success") {
      responseMessage.value =
        typeof content.error === "string" ? content.error : fallbackMessage;
      return;
    }
    if (content.variables.length === 0) {
      responseMessage.value = fallbackMessage;
      return;
    }
    applyTheme(content.variables);
    onModalClose();
  } finally {
    isGenerating.value = false;
  }
};
const onModalOpen = () => {
  modalRef.value.showModal();
  document.addEventListener("click", handleBackdropClick);
};
const onModalClose = () => {
  modalRef.value.close();
  isGenerating.value = false;
  responseMessage.value = "Caution: All prompts are recorded.";
  document.removeEventListener("click", handleBackdropClick);
};
const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.isComposing) {
    generateTheme();
  }
};
const handleBackdropClick = (event: MouseEvent) => {
  if (event.target instanceof HTMLDialogElement) {
    onModalClose();
  }
};
</script>

<template>
  <button
    ref="openButtonRef"
    type="button"
    aria-label="テーマ変更"
    class="modal-open-button"
    @click="onModalOpen"
  >
    <IconSparkles aria-hidden="true" />
  </button>
  <dialog ref="modalRef" :aria-busy="isGenerating">
    <div class="modal-content">
      <p class="modal-description">Enter a prompt to generate a new theme.</p>
      <div class="theme-change-form">
        <input
          id="theme-changer-input"
          v-model="promptModel"
          type="text"
          placeholder="fairy tale"
          autofocus
          @keydown.enter="onKeyDown"
        />
        <button
          class="theme-change-button"
          :class="{ 'is-generating': isGenerating }"
          :disabled="isGenerating"
          @click="generateTheme"
        >
          <IconSparkles
            v-if="isGenerating === false"
            aria-hidden="true"
          />
          <IconLoader2 v-else aria-hidden="true" />
          Generate
        </button>
      </div>
      <p class="modal-message" aria-live="polite">{{ responseMessage }}</p>
    </div>
  </dialog>
</template>

<style scoped>
.modal-open-button {
  width: 2.5rem;
  height: 2.5rem;
  color: rgb(var(--text));
  background-color: rgb(var(--surface));
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  @media (hover: hover) {
    &:hover {
      border-color: rgb(var(--text));
      color: rgb(var(--text));
    }
  }

  @media (hover: none) {
    &:active {
      border-color: rgb(var(--text));
    }
  }
}

dialog {
  padding: 0;
  transition: all 0.3s;
  transition-behavior: allow-discrete;

  .modal-content {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
    position: fixed;
    top: 50dvh;
    left: 50%;
    padding: 2rem;
    width: min(90%, 600px);
    border-radius: var(--radius-lg);
    color: rgb(var(--text));
    background-color: rgb(var(--bg));
    border: var(--border-width) solid rgb(var(--bg-accent) / 0.8);
    z-index: 1000;
    transition: all 0.3s;
    transition-behavior: allow-discrete;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  &::backdrop {
    opacity: 0;
    transition: all 0.3s;
    transition-behavior: allow-discrete;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }

  &[open] {
    .modal-content {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);

      @starting-style {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
      }
    }

    &::backdrop {
      opacity: 1;
      backdrop-filter: blur(8px);

      @starting-style {
        opacity: 0;
      }
    }
  }
}

.modal-description {
  font-size: 1.25rem;
  line-height: 1.75rem;
  margin: 0 0 1.5rem;
  text-align: center;
  text-wrap: balance;
}

.modal-message {
  text-align: center;
}

.theme-change-form {
  position: relative;
}

#theme-changer-input {
  font-family: unset;
  font-size: 2rem;
  width: 100%;
  height: 4rem;
  padding-left: 1rem;
  color: rgb(var(--text));
  background-color: rgb(var(--bg));
  border: var(--border-width) solid rgb(var(--text));
  border-radius: var(--radius-pill);
}

.theme-change-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: unset;
  font-size: 2rem;
  position: absolute;
  right: 0;
  top: 0;
  height: 4rem;
  padding: 0 1rem;
  background-color: rgb(var(--text));
  color: rgb(var(--bg));
  border: var(--border-width) solid rgb(var(--text));
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition: var(--transition);

  &:hover {
    color: rgb(var(--text));
    background-color: rgb(var(--bg));
  }

  &.is-generating {
    color: rgb(var(--text));
    background-color: rgb(var(--bg));
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    border-radius: inherit;
    padding: 2px;
    background: conic-gradient(
      from var(--theme-beam-angle),
      transparent 0%,
      rgb(var(--accent)) 8%,
      rgb(var(--highlight)) 16%,
      transparent 28%,
      transparent 100%
    );
    -webkit-mask:
      linear-gradient(#fff 0 0) content-box,
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  &.is-generating::before {
    opacity: 1;
  }

  @media (prefers-reduced-motion: no-preference) {
    &.is-generating::before {
      animation: theme-generating-beam 1.2s linear infinite;
    }
  }

  .tabler-icon-sparkles,
  .tabler-icon-loader-2 {
    width: 2rem;
    height: 2rem;
  }

  .tabler-icon-loader-2 {
    animation: spin 1s linear infinite;
  }
}

@property --theme-beam-angle {
  syntax: "<angle>";
  inherits: false;
  initial-value: 0deg;
}

@keyframes theme-generating-beam {
  to {
    --theme-beam-angle: 360deg;
  }
}

@media screen and (max-width: 600px) {
  .modal-content {
    padding: 1rem;
  }

  .modal-description {
    font-size: 1.125rem;
    line-height: 1.5rem;
  }

  .theme-change-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    #theme-changer-input {
      font-size: 1rem;
      height: 2.5rem;
      padding-left: 0.5rem;
    }

    .theme-change-button {
      font-size: 1rem;
      height: 2.5rem;
      padding: 0 0.5rem;
      gap: 0;

      .tabler-icon-sparkles,
      .tabler-icon-loader-2 {
        width: 1.2rem;
        height: 1.2rem;
      }
    }
  }

  .modal-message {
    font-size: 0.75rem;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
