<script lang="ts" setup>
import { ChevronLeftIcon } from "vue-tabler-icons";
</script>

<template>
  <main>
    <div class="category-name">WORKS</div>
    <div class="work">
      <ContentDoc v-slot="{ doc }">
        <div class="about">
          <div class="intro">
            <h1>{{ doc.title }}</h1>
            <div class="summary">
              <table>
                <tr v-if="doc.github">
                  <th>GitHub</th>
                  <td>
                    <a
                      :href="`https://github.com/${doc.github}`"
                      target="_blank"
                      >{{ doc.github }}</a
                    >
                  </td>
                </tr>
                <tr>
                  <th>製作時期</th>
                  <td>{{ doc.creation }}</td>
                </tr>
                <tr>
                  <th>使用技術</th>
                  <td>{{ doc.tech }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="thumbnail">
            <img :src="`/images/${doc.thumbnail}`" />
          </div>
        </div>
        <div class="content">
          <ContentRenderer :value="doc" />
        </div>
      </ContentDoc>
    </div>
    <div class="after-content">
      <NuxtLink class="back" to="/">
        <chevron-left-icon />
        BACK HOME
      </NuxtLink>
    </div>
  </main>
</template>

<style lang="scss">
.work {
  border: 1px $color-white solid;
  border-radius: 1rem;

  a,
  p > code {
    word-break: break-all;
  }

  a[target="_blank"]::after {
    padding-left: 5px;
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='icon icon-tabler icon-tabler-external-link' width='24' height='24' viewBox='0 0 24 24' stroke-width='2' stroke='hsl(213, 47%, 47%)' fill='none' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath stroke='none' d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5' /%3E%3Cline x1='10' y1='14' x2='20' y2='4' /%3E%3Cpolyline points='15 4 20 4 20 9' /%3E%3C/svg%3E");
    vertical-align: -0.3rem;
    color: $color-link;
  }

  .about {
    display: flex;
    justify-content: space-between;
    .intro {
      h1 {
        padding: 0 1rem;
        margin-top: 1rem;
      }
      .summary {
        table {
          border-spacing: 0 0.5rem;
          th,
          td {
            padding: 0 1rem;
          }
          th {
            border-right: 1px $color-white solid;
          }
        }
      }
    }
    .thumbnail {
      width: 50%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0 1rem 0 0;
      }
    }
    @include mq(tablet) {
      flex-direction: column-reverse;
      .thumbnail {
        width: 100%;
        img {
          border-radius: 1rem 1rem 0 0;
        }
      }
      .intro h3 {
        margin: 0;
      }
    }
  }
  .content {
    padding-bottom: 1rem;
    p {
      margin: 1rem;
    }
    ul {
      margin: 0.5rem 1.5rem;
    }
    h2 {
      display: inline-block;
      padding: 1rem 1rem 0;
      letter-spacing: 0;
      margin: 0;
      font-size: 1.5rem;
      border-bottom: $color-white 1px solid;
    }
    h3 {
      padding-left: 1rem;
    }
    h2,
    h3,
    h4,
    h5 {
      a {
        color: $color-white;
      }
    }
    table {
      margin: 0 1rem;
      border-spacing: 0 0.5rem;
      th,
      td {
        text-align: left;
        padding: 0 1rem;
      }
      th {
        border-bottom: 1px $color-white solid;
      }
    }
    code,
    pre {
      padding: 0.2rem;
      margin: 0;
      border-radius: 0.5rem;
      background-color: $color-black-secondary;
    }
    pre {
      margin: 0.5rem 0;
    }
    pre {
      overflow-x: scroll;
    }
    .imageWrapper {
      text-align: center;
      img {
        max-width: calc(100% - 1rem);
        max-height: 50vh;
        filter: drop-shadow(2px 4px 6px black);
        border-radius: 0.5rem;
      }
    }
  }
}
.after-content {
  padding: 1rem;
  text-align: center;
  .back {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: $color-white;
  }
}
</style>
