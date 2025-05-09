<script setup lang="ts">
const items = [
  {
    year: 2024,
    grade: "大学1年",
    items: [
      { term: "3月", title: "サイバーエージェント 長期就業型インターン", src: "https://www.cyberagent.co.jp/careers/students/event/detail/id=28227" },
      { term: "9月", title: "LayerX サマーインターン", src: "https://layerx.co.jp/" },
      { term: "8月", title: "MIXI git challenge #14", src: "https://x.com/newt239/status/1827302836448989582" },
      { term: "8月", title: "技育CAMP vol.11 「みちくさ」 (努力賞)", src: "https://x.com/newt239/status/18045439695196344" },
      { term: "7月 - 現在", title: "CA Tech lounge 会員 (Webフロントエンド)", src: "https://www.cyberagent.co.jp/careers/special/students/tech_lounge/" },
      { term: "6月 - 3月", title: "SecHack365'24 開発駆動コース 仲山ゼミ", src: "https://sechack365.nict.go.jp/" },
      { term: "4月", title: "芝浦工業大学 デザイン工学部 入学", src: "https://www.shibaura-it.ac.jp/" }
    ]
  },
  {
    year: 2023,
    grade: "高校3年",
    items: [
      { term: "3月", title: "栄東高等学校 卒業", src: "https://x.com/newt239/status/1766442681688088755" }
    ]
  },
  {
    year: 2022,
    grade: "高校2年",
    items: [
      { term: "4月", title: "基本情報技術者試験 合格", src: "https://x.com/newt239/status/1511657961013215232" }
    ]
  },
  {
    year: 2005,
    grade: null,
    items: [
      { term: "11月2日", title: "誕生", src: null }
    ]
  },
];

</script>

<template>
  <div class="timeline">
    <h2 class="category-title">Timeline</h2>
    <div v-for="year in items" :key="year.year" class="year-section">
      <div class="year-container">
        <div class="year-text">{{ year.year }}</div>
        <div class="indicator">
          <div class="indicator-dot" />
        </div>
        <div class="post-count">{{ year.grade }}</div>
      </div>
      <template v-for="item in year.items">
        <a v-if="item.src" :key="item.src" :href="item.src" class="post-item" target="_blank">
          <div class="post-container">
            <div class="term-text">{{ item.term }}</div>
            <div class="dash-line-container">
              <div class="dash-line" />
            </div>
            <div class="title-text">{{ item.title }}</div>
          </div>
        </a>
        <div v-else :key="item.title" class="post-item">
          <div class="post-container no-link">
            <div class="term-text">{{ item.term }}</div>
            <div class="dash-line-container">
              <div class="dash-line" />
            </div>
            <div class="title-text">{{ item.title }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>


<style scoped>
.year-section {
  margin-bottom: 1rem;
  margin: 0 auto;
}

.year-container {
  display: flex;
  align-items: center;
  height: 3.75rem;
  width: 100%;
}

.year-text {
  font-weight: bold;
  font-size: 1.5rem;
  color: #4a4a4a;
  text-align: right;
  width: 20%;
  min-width: 6rem;
  transition: color 0.3s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.indicator {
  width: 10%;
  min-width: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0;
  background-color: rgb(var(--color-back));
  z-index: 10;
}

.indicator-dot {
  outline-color: rgb(var(--color-link));
  outline-style: solid;
  outline-offset: -2px;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 9999px;
}

.post-count {
  text-align: left;
  color: rgb(var(--color-text));
  width: min(30rem, 70%);
  transition: color 0.3s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.post-item {
  display: block;
  position: relative;
  width: 100%;
  height: 3.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  border-radius: 0.5rem;

  @media screen and (min-width: 500px) {
    height: 2.5rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.post-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
  height: 100%;

  &.no-link {
    cursor: default;
    text-decoration: none;
  }
}

.term-text {
  font-size: 0.875rem;
  line-height: 0.875rem;
  color: rgb(var(--color-text));
  text-align: right;
  width: 20%;
  min-width: 6rem;
  transition: color 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.dash-line-container {
  display: flex;
  align-items: center;
  width: 10%;
  min-width: 4rem;
  height: 100%;
  position: relative;

  &:before {
    content: "";
    pointer-events: none;
    position: absolute;
    left: calc(50% - 1px);
    top: -50%;
    height: 100%;
    width: 10%;
    border-width: 0 0 0 2px;
    border-style: dashed;
    border-color: rgb(var(--color-text-tertiary));
    transition-property: all;
    transition-timing-function: cubic-bezier(.4, 0, .2, 1);
    transition-duration: .2s;

    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  }
}

.dash-line {
  background-color: rgb(var(--color-text-secondary));
  outline-color: rgb(var(--color-back));
  outline-style: solid;
  outline-width: 4px;
  height: 4px;
  width: 4px;
  margin: 0 auto;
  border-radius: 4px;
  transition: all 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  z-index: 10;
}

.title-text {
  font-weight: bold;
  font-size: 0.7rem;
  line-height: 0.7rem;
  color: rgb(var(--color-text));
  text-align: left;
  width: min(30rem, 70%);
  transition: all 0.2s ease;

  @media screen and (min-width: 360px) {
    font-size: 1rem;
    line-height: 1rem;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.src-text {
  width: calc(100% - 40rem);
  text-align: end;
  color: rgb(var(--color-text-secondary));
}

.post-item[href^="http"]:hover .title-text {
  color: rgb(var(--color-link));
  transform: translateX(4px);
}

.post-item[href^="http"]:hover .dash-line {
  background-color: rgb(var(--color-link));
  height: 20px;
}

.post-item[href^="http"]:hover .term-text,
.post-item[href^="http"]:hover .post-count,
.post-item[href^="http"]:hover .src-text {
  color: rgb(var(--color-link));
}
</style>
