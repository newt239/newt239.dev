<script lang="ts" setup>
import { IconSparkles, IconLoader2 } from "@tabler/icons-vue";

const isGenerating = ref(false);
const promptModel = defineModel();
const modalRef = ref();
const responseMessage = ref("");

const generateTheme = async () => {
  console.log("generating...");
  isGenerating.value = true;
  const res = await fetch(
    "https://api.newt239.dev/ai/generate-theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: promptModel.value,
    }),
  }
  );
  const data = await res.json();
  const content = JSON.parse(data.body);
  const r = document.documentElement;
  if (r && content) {
    if (content.type === "success") {
      if (content.variables.length === 0) {
        isGenerating.value = false;
        responseMessage.value = "Something went wrong. Please try another word.";
      } else {
        content.variables.forEach((v: any) => {
          console.log(v);
          r.style.setProperty(`${v.name}`, v.rgb);
        });
        onModalClose();
      }
    } else {
      isGenerating.value = false;
      responseMessage.value = content.message;
    }
  }
  return;
}
const onModalOpen = () => {
  modalRef.value.showModal();
  document.addEventListener('click', handleBackdropClick);
}
const onModalClose = () => {
  modalRef.value.close();
  isGenerating.value = false;
  responseMessage.value = "";
  document.removeEventListener('click', handleBackdropClick);
}
const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    generateTheme();
  }
}
const handleBackdropClick = (event: MouseEvent) => {
  if (event.target instanceof HTMLDialogElement) {
    onModalClose();
  }
}
</script>

<template>
  <button class="modalOpenButton" v-on:click="onModalOpen" ref="openButtonRef">
    <IconSparkles />
  </button>
  <dialog :aria-busy="isGenerating" ref="modalRef">
    <div class="modalContent">
      <p class="modalDescription">Enter a prompt to generate a new theme.</p>
      <div class="themeChangeForm">
        <input type="text" id="themeChangerInput" placeholder="fairy tale" v-model="promptModel" :onkeydown="onKeyDown"
          autofocus />
        <button v-on:click="generateTheme" class="themeChangeButton" :disabled="isGenerating">
          <IconSparkles v-if="isGenerating === false" />
          <IconLoader2 v-else />
          Generate
        </button>
      </div>
      <p class="modalMessage" aria-live="polite">{{ responseMessage }}</p>
    </div>
  </dialog>
</template>

<style scoped>
.modalOpenButton {
  width: 2.5rem;
  height: 2.5rem;
  color: rgb(var(--color-text));
  background-color: rgb(var(--color-back));
  border: 1px solid rgb(var(--color-text));
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;

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

  .modalContent {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.9);
    position: fixed;
    top: 50dvh;
    left: 50%;
    padding: 2rem;
    width: min(90%, 600px);
    border-radius: 1rem;
    background-color: rgb(var(--color-back));
    border: 1px solid rgb(var(--color-back-secondary) / 0.8);
    z-index: 1000;
    transition: all 0.3s;
    transition-behavior: allow-discrete;
  }

  &::backdrop {
    opacity: 0;
    transition: all 0.3s;
    transition-behavior: allow-discrete;
  }

  &[open] {
    .modalContent {
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

.modalDescription {
  font-size: 2rem;
  margin: 0 0 3rem;
}

.themeChangeForm {
  position: relative;
}

#themeChangerInput {
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

.themeChangeButton {
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
  .modalContent {
    padding: 1rem;
  }

  .modalDescription {
    font-size: 1.5rem;
    line-height: 2rem;
  }

  .themeChangeForm {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    #themeChangerInput {
      font-size: 1rem;
      height: 2.5rem;
      padding-left: 0.5rem;
    }

    .themeChangeButton {
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

  .modalMessage {
    font-size: 0.5rem;
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