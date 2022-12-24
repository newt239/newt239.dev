<template>
  <main>
    <span class="category-name">WORKS</span>
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
                  <th>Creation</th>
                  <td>{{ doc.creation }}</td>
                </tr>
                <tr>
                  <th>Tech</th>
                  <td>{{ doc.tech }}</td>
                </tr>
              </table>
            </div>
          </div>
          <div class="thumbnail">
            <img :src="`/images/work/${doc.thumbnail}`" />
          </div>
        </div>
        <div class="content">
          <ContentRenderer :value="doc" />
        </div>
      </ContentDoc>
    </div>
    <div class="footer">
      <RouterLink class="back" to="/">BACK HOME</RouterLink>
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

    .intro {
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
    }
  }

  .content {
    padding-bottom: 1rem;

    p,
    ul {
      margin: 1rem;
    }

    h2 {
      display: inline-block;
      padding: 0 1rem;
      letter-spacing: 0;
      margin: 0;
      font-size: 1.5rem;
      border-bottom: $color-white 1px solid;
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
        padding: 0 1rem;
      }

      th {
        border-right: 1px $color-white solid;
      }
    }

    code,
    pre {
      padding: 0 0.3rem;
      border-radius: 0.5rem;
      margin: 0 0.2rem;
      background-color: $color-black-secondary;
    }

    pre {
      overflow-x: scroll;
    }
  }
}

.footer {
  padding: 1rem;
  text-align: center;

  .back {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    color: $color-white;

    &::before {
      padding-right: 5px;
      content: url('data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>');
      vertical-align: -0.1rem;
    }
  }
}
</style>
