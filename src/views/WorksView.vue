<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
    <main>
        <h2>WORKS</h2>
        <div class="work">
            <RouterView />
        </div>
    </main>
</template>

<style lang="scss">
.work {
    border: 1px $color-white solid;
    border-radius: 1rem;
    .about {
        display: flex;
        justify-content: space-between;
        .thumbnail {
            width: 50%;
            height: auto;
            border-radius: 0 1rem 0 0;
        }
        @include mq(tablet) {
            flex-direction: column-reverse;
            .thumbnail {
                width: 100%;
                border-radius: 1rem 1rem 0 0;
            }
        }
    }
    .content {
        margin: 1rem;
    }
}
</style>