<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  document.title = "Look Inside View - NEWT HOUSE";
});
</script>

<template>
  <div class="about">
    <div class="intro">
      <h3>Look Inside View</h3>
      <div class="summary">
        <table>
          <tr>
            <th>GitHub</th>
            <td>
              <a href="https://github.com/newt239/look-inside-view" target="_blank">newt239/look-inside-view</a>
            </td>
          </tr>
          <tr>
            <th>Creation</th>
            <td>2021/06 - 2021/09</td>
          </tr>
          <tr>
            <th>Tech</th>
            <td>Pannellum, Firebase ( Firestore, Storage )</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="thumbnail">
      <img src="/img/look-inside-view_thumbnail.webp" />
    </div>
  </div>
  <div class="content">
    <p>栄東高校・中学校の校舎内を360度の画像で紹介するサイトです。2021年度のオンライン文化祭用の作品で、同じ同好会のメンバー3人と制作しました。</p>
    <h4>Pannellum</h4>
    <p>
      360度画像のビューワーとして、パノラマビューワーである
      <a href="https://github.com/mpetroff/pannellum" target="_blank">Pannellum</a>を利用しました。
    </p>
    <h4>サイトデザイン</h4>
    <p>
      2020年の初め頃から海外で注目を集めている「ニューモーフィズム」を採用しました。これはベースのレイヤーから要素を押し出したり窪ませているように見せることで境界に滑らかな印象を与えることができるデザイン手法で、美しく洗練された印象に仕上げることができるというものです。
    </p>
    <h4>関連リンク</h4>
    <ul>
      <li>
        <a href="https://look-inside-view.web.app/" target="_blank">Look Inside View - shfes'21</a>
      </li>
    </ul>
  </div>
</template>