<script setup lang="ts">
import { ref, onMounted } from "vue"
import { RouterLink, RouterView } from 'vue-router'
import moment from "moment"
import { AtomSpinner } from 'epic-spinners'

const time = ref(moment().format('HH:mm'));
const day = ref(moment().format('YY/MM/DD'));
const DoW = ref(moment().format('ddd'));

onMounted(() => {
  setInterval(() => {
    time.value = moment().format('HH:mm');
  }, 1000 * 60)
});
</script>

<template>
  <RouterLink to="/" class="headerWrapper">
    <header>
      <div class="headerMain">
        <img src="/img/logo.svg" />
        <h1>newt</h1>
      </div>
      <div class="headerWidget">
        <div>{{ day }}</div>
        <div>{{ time }}</div>
        <div>{{ DoW }}</div>
      </div>
    </header>
  </RouterLink>
  <div class="wrapper">
    <RouterView />
    <div class="copyright">© 2022 newt</div>
  </div>
  <div class="overlay">
    <AtomSpinner :animation-duration="1000" :size="70" :color="'hsl(213, 47%, 47%)'" />
  </div>
</template>

<style lang="scss">
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 0.5rem;
}

.headerWrapper {
  display: block;
  position: sticky;
  width: 92%;
  transform: translateX(4%);
  top: 0;
  color: $color-white;
  background-color: $color-black;
  padding: 0.8rem 1rem 1rem;
  border: 0.1rem $color-white solid;
  border-top: 0;
  border-radius: 0 0 2rem 2rem;
  z-index: 10;
  filter: drop-shadow(2px 4px 6px black);

  &:hover {
    opacity: 1;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: top;

    .headerMain {
      display: flex;
      align-items: center;
      gap: min(5vh, 5vw);

      img {
        max-height: min(10vh, 10vw);
      }

      h1 {
        margin: 0;
        font-size: min(5vh, 5vw);
        font-weight: 800;
      }
    }

    .headerWidget {
      text-align: right;
      font-size: min(2.5vh, 2.5vw);
      line-height: min(3vh, 3vw);
      letter-spacing: .1rem;
    }
  }
}

.wrapper {
  padding: 0 0.5rem;

  .copyright {
    padding: 1rem;
    width: 100%;
    text-align: center;
  }
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  background-color: $color-black;

  .atom-spinner {
    margin: 0 auto;
    margin-top: 50vh;
  }
}
</style>
