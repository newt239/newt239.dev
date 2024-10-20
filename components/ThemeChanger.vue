<script lang="ts" setup>
import { IconSparkles } from "@tabler/icons-vue";

const isModalOpen = ref(false);

const promptModel = defineModel();
const generateTheme = async () => {
  console.log("generating...");
  const data = await $fetch("/api/ai-theme", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: promptModel.value,
    }),
  });
  const variables = data.variables;
  const r = document.documentElement;
  if (r) {
    variables.forEach((v: any) => {
      console.log(v);
      r.style.setProperty(`${v.name}`, v.rgb);
    });
    isModalOpen.value = false;
  }
  return;
}
</script>

<template>
  <button class="modalToggle" v-on:click="isModalOpen = true;">
    <IconSparkles />
  </button>
  <Teleport to="#modal-target">
    <div class="themeChanger" v-if="isModalOpen">
      <div class="modalOverlay" v-on:click="isModalOpen = false;"></div>
      <div class="themeChangeModal">
        <p class="themeChangeDescription">Enter a prompt to generate a new theme.</p>
        <div class="themeChangeForm">
          <input type="text" id="themeChangerInput" v-model="promptModel" placeholder="fairy tale" />
          <button v-on:click="generateTheme" class="themeChangeButton">Generate</button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style>
.modalToggle {
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

.modalOverlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100dvh;
  z-index: 100;
  color: rgb(var(--color-white));
  backdrop-filter: blur(8px);
}

.themeChangeModal {
  position: fixed;
  top: 50dvh;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  width: min(90%, 500px);
  border-radius: 1rem;
  background-color: rgb(var(--color-back));
  border: 1px solid rgb(var(--color-back-secondary) / 0.8);
  z-index: 1000;
}

.themeChangeDescription {
  font-size: 2rem;
  margin: 0 0 2rem;
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
}
</style>