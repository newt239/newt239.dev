<script lang="ts" setup>
import { IconChevronLeft } from "@tabler/icons-vue";

useHead({
  titleTemplate: "%s - newt239",
});
</script>

<template>
  <main>
    <div class="container">
      <div class="category-name">Works</div>
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
            <div class="thumbnail-wrapper">
              <img
                class="thumbnail"
                :src="`/images/${doc.thumbnail}`"
                :alt="`${doc.title}のサムネイル画像`"
              />
            </div>
          </div>
          <div class="content">
            <ContentRenderer :value="doc" />
          </div>
        </ContentDoc>
      </div>
      <div class="after-content">
        <NuxtLink class="back link" to="/">
          <IconChevronLeft />
          BACK HOME
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style>
.work {
  border: 1px var(--color-white) solid;
  border-radius: 1rem;

  a,
  p code {
    word-break: break-all;
  }

  a[target="_blank"]::after {
    padding-left: 5px;
    content: url("/assets/icons/external-link.svg");
    vertical-align: -0.3rem;
    color: var(--color-link);
  }

  .about {
    display: flex;
    justify-content: space-between;
    > .intro {
      > h1 {
        padding: 0 1rem;
        margin-top: 1rem;
        view-transition-name: work-name;
      }
      .summary {
        table {
          border-spacing: 0 0.5rem;
          th,
          td {
            padding: 0 1rem;
          }
          th {
            border-right: 1px var(--color-white) solid;
          }
        }
      }
    }
    .thumbnail-wrapper {
      width: 50%;
      > .thumbnail {
        width: 100%;
        object-fit: cover;
        border-radius: 0 1rem 0 0;
        view-transition-name: work-thumbnail;
      }
    }
    @media (max-width: 768px) {
      flex-direction: column-reverse;
      .thumbnail-wrapper {
        width: 100%;
        .thumbnail {
          border-radius: 1rem 1rem 0 0;
        }
      }
      .intro h1 {
        margin: 0px;
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
      border-bottom: var(--color-white) 1px solid;
    }
    h3 {
      padding-left: 1rem;
    }
    h2,
    h3,
    h4,
    h5 {
      a {
        color: var(--color-white);
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
        border-bottom: 1px var(--color-white) solid;
      }
    }
    code,
    pre {
      padding: 0.2rem;
      margin: 0;
      border-radius: 0.5rem;
      background-color: var(--color-black)-secondary;
      cursor: text;
    }
    pre {
      margin: 0.5rem 0;
      overflow-x: auto;
    }
    p:has(img) {
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
    border: none;
    font-size: 1rem;
    color: var(--color-white);
    background-color: transparent;
    cursor: pointer;
  }
}
.category-name {
  view-transition-name: work-title;
}
</style>
