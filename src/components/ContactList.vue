<script setup lang="ts">
import { ref } from "vue";

type contactsProp = {
  name: string;
  icon: string;
  id: string;
  url: string;
  color?: string;
}[];

const contacts = ref<contactsProp>([
  {
    name: "GitHub",
    icon: "/img/github.svg",
    id: "@newt239",
    url: "https://github.com/newt239",
    color: "#FFF",
  },
  {
    name: "Qiita",
    icon: "/img/qiita.png",
    id: "@newt239",
    url: "https://qiita.com/newt239",
    color: "#55C500",
  },
  {
    name: "Zenn",
    icon: "/img/zenn.svg",
    id: "@newt_st21",
    url: "https://zenn.dev/newt_st21",
    color: "#3EA8FF",
  },
]);
</script>

<template>
  <div class="contacts">
    <div v-for="contact in contacts" :key="contact.name" class="contact">
      <a
        :href="contact.url"
        :alt="contact.name"
        target="_blank"
        :style="
          'color: 1px ' + contact.color + ' solid;color: ' + contact.color
        "
      >
        <img :src="contact.icon" />
        <span>{{ contact.id }}</span>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contacts {
  margin: 0 5vw;
  display: flex;
  flex-direction: row;
  gap: 1vw;
  .contact {
    transition: all 0.5s;
    padding: 0.5rem;

    a {
      display: flex;
      align-items: center;
      gap: 0.5rem;

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
