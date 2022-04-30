<script setup lang="ts">
import { ref } from 'vue';

type contactsProp = {
  name: string;
  icon: string;
  id: string;
  url: string;
  color?: string;
}[]

const contacts = ref<contactsProp>([
  {
    name: "GitHub",
    icon: "/img/github.svg",
    id: "@newt239",
    url: "https://github.com/newt239",
    color: "#FFF"
  }, {
    name: "QiIta",
    icon: "/img/qiita.png",
    id: "@newt239",
    url: "https://qiita.com/newt239",
    color: "#55C500"
  }
]);
</script>

<template>
  <div class="contacts">
    <a class="contact" :style="'border: 1px ' + contact.color + ' solid;color: ' + contact.color"
      v-for="contact in contacts" :key="contact.name" :href="contact.url" :alt="contact.name" target="_blank">
      <div>
        <img :src="contact.icon" />
        <span>{{ contact.id }}</span>
      </div>
    </a>
  </div>
</template>

<style lang="scss" scoped>
.contacts {
  display: flex;
  gap: 1rem;

  .contact {
    padding: 1rem;
    border-radius: 1rem;
    transition: all 0.5s;

    div {
      display: flex;
      align-items: center;
      gap: 1rem;

      img {
        height: 1.5rem;
      }
    }
  }

  @include mq(mobile) {
    flex-direction: column;
  }
}
</style>