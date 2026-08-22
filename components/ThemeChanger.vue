<script lang="ts" setup>
import { IconSparkles, IconLoader2, IconX } from "@tabler/icons-vue";

import { applyTheme, themeConstraints, themeVariables } from "~/libs/theme";

import type { ThemeGenerationResponse } from "~/libs/theme";

const defaultMessage = "Caution: All prompts are recorded.";
const fallbackMessage = "Something went wrong. Please try another word.";

const dialogId = useId();
const isGenerating = ref(false);
const promptModel = defineModel<string>();
const modalRef = ref<HTMLDialogElement>();
const responseMessage = ref(defaultMessage);

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
        constraints: themeConstraints,
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
    modalRef.value?.close();
  } finally {
    isGenerating.value = false;
  }
};
const onDialogClose = () => {
  isGenerating.value = false;
  responseMessage.value = defaultMessage;
};
const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter" && !event.isComposing) {
    generateTheme();
  }
};
</script>

<template>
  <button
    type="button"
    aria-label="テーマ変更"
    class="modal-open-button"
    command="show-modal"
    :commandfor="dialogId"
  >
    <IconSparkles aria-hidden="true" />
  </button>
  <dialog
    :id="dialogId"
    ref="modalRef"
    closedby="any"
    :aria-busy="isGenerating"
    @close="onDialogClose"
  >
    <div class="modal-content" lang="en">
      <button
        type="button"
        class="modal-close-button"
        lang="ja"
        aria-label="閉じる"
        command="close"
        :commandfor="dialogId"
      >
        <IconX aria-hidden="true" />
      </button>
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
  width: var(--tap-target-size);
  height: var(--tap-target-size);
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
    width: var(--tap-target-icon-size);
    height: var(--tap-target-icon-size);
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
    padding: min(2rem, 5vw);
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

.modal-close-button {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--tap-target-size);
  height: var(--tap-target-size);
  color: rgb(var(--text));
  background: none;
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: var(--transition);

  svg {
    width: var(--tap-target-icon-size);
    height: var(--tap-target-icon-size);
  }

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

.modal-description {
  font-size: 1.25rem;
  line-height: var(--line-height-tight);
  margin: 0 0 1.5rem;
  padding-inline: min(2rem, 5%);
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
  font-size: var(--font-size-title);
  width: 100%;
  min-height: 4rem;
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
  font-size: var(--font-size-title);
  position: absolute;
  right: 0;
  top: 0;
  min-height: 4rem;
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

@media screen and (max-width: 37.5rem) {
  .modal-content {
    padding: 1rem;
  }

  .modal-description {
    font-size: 1.125rem;
  }

  .theme-change-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    #theme-changer-input {
      font-size: 1rem;
      min-height: 2.5rem;
      padding-left: 0.5rem;
    }

    .theme-change-button {
      position: static;
      align-self: stretch;
      justify-content: center;
      font-size: 1rem;
      min-height: 2.5rem;
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
