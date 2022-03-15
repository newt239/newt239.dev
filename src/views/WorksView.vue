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
    border: 0.3rem $color-text solid;
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
        .intro {
            h3 {
                margin: 1rem 0;
                padding-left: 1rem;
                border-bottom: $color-text 0.3rem solid;
                font-size: 2rem;
                line-height: 2.5rem;
                font-weight: 800;
            }
        }
    }
    .content {
        margin: 1rem;
    }
}
</style>