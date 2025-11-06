<script lang="ts" setup>
import { IconSparkles, IconLoader2 } from "@tabler/icons-vue";

const isGenerating = ref(false);
const promptModel = defineModel<string>();
const modalRef = ref();
const responseMessage = ref("Caution: All prompts are recorded.");

const generateTheme = async () => {
  if (!promptModel.value) {
    promptModel.value = "fairy tale";
  }
  isGenerating.value = true;
  const res = await fetch("https://api.newt239.dev/ai/generate-theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: promptModel.value,
    }),
  });
  const data = await res.json();
  const content = JSON.parse(data.body);
  const r = document.documentElement;
  if (r && content) {
    if (content.type === "success") {
      if (content.variables.length === 0) {
        isGenerating.value = false;
        responseMessage.value =
          "Something went wrong. Please try another word.";
      } else {
        content.variables.forEach((v: { name: string; value: string }) => {
          r.style.setProperty(`${v.name}`, v.value);
        });
        onModalClose();
      }
    } else {
      isGenerating.value = false;
      responseMessage.value = content.message;
    }
  }
  return;
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
    <IconSparkles aria-hidden />
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
          :disabled="isGenerating"
          @click="generateTheme"
        >
          <IconSparkles
            v-if="isGenerating === false"
            aria-label="Generating..."
          />
          <IconLoader2 v-else aria-hidden />
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
  color: rgb(var(--color-text));
  background-color: rgb(var(--color-back));
  border: 2px solid rgb(var(--color-text));
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    scale: 1.1;
    color: rgb(var(--color-link));
    border-color: rgb(var(--color-link));
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
    border-radius: 1rem;
    color: rgb(var(--color-text));
    background-color: rgb(var(--color-back));
    border: 2px solid rgb(var(--color-back-secondary) / 0.8);
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
  font-size: 2rem;
  line-height: 2.5rem;
  margin: 0 0 2rem;
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
  color: rgb(var(--color-text));
  background-color: rgb(var(--color-back));
  border: 1px solid rgb(var(--color-text));
  border-radius: 2rem;
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
  background-color: rgb(var(--color-text));
  color: rgb(var(--color-back));
  border: 1px solid rgb(var(--color-text));
  border-radius: 2rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: rgb(var(--color-text));
    background-color: rgb(var(--color-back));
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

@media screen and (max-width: 600px) {
  .modal-content {
    padding: 1rem;
  }

  .modal-description {
    font-size: 1.5rem;
    line-height: 2rem;
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
