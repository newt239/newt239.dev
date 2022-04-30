<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  document.title = "Quiz Flasher - NEWT HOUSE";
});
</script>

<template>
  <div class="about">
    <div class="intro">
      <h3>Quiz Flasher</h3>
      <div class="summary">
        <table>
          <tr>
            <th>Creation</th>
            <td>2019/11 - 2020/07</td>
          </tr>
          <tr>
            <th>Tech</th>
            <td>GAS ( Google Apps Script )</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="thumbnail">
      <img src="/img/quiz-flasher_thumbnail.webp" />
    </div>
  </div>
  <div class="content">
    <p>
      問題データを入れたGoogleスプレッドシートのファイルから、ランダムに問題を出題するWebアプリです。すべてのシートから出題させたり、特定のシートの特定の問題のみで出題させることもできます。自分がJavaScriptを初めて使って作った作品です。バックエンド的に使うのももちろんですが、モーダルウィンドウなどデザイン面で利用したのもこれが初でした。
    </p>
    <h4>API</h4>
    <p>
      クイズ出題の部分はAPI化してあるので仕様を載せておきます。メソッドは全て
      <code>GET</code>です。メンテナンスはしていないためずっと使える保証はないです。なお LINE bot の方はこのAPIを利用しています。
    </p>
    <h5>Base URL</h5>
    <ul>
      <li>
        <code
          class="url">https://script.google.com/macros/s/AKfycbzOi_ACgcxDldiJ-8kVS5Hxxe8i37O168mubm95taRE7kAZ9a9Q/exec</code>
      </li>
    </ul>
    <h5>Parameter</h5>
    <table>
      <tr>
        <th>
          <code>t</code>
        </th>
        <td>
          String
        </td>
        <td>
          タイプ。基本は
          <code>show</code>で固定
        </td>
      </tr>
      <tr>
        <th>
          <code>p</code>
        </th>
        <td>String</td>
        <td>スプレッドシートのid。非公開設定のものは無理</td>
      </tr>
      <tr>
        <th>
          <code>s</code>
        </th>
        <td>Number</td>
        <td>シートの番号。0を始点として何個目のシートか</td>
      </tr>
      <tr>
        <th>
          <code>o</code>
        </th>
        <td>boolean</td>
        <td>
          オプショナル。
          <code>true</code>にすると4列目の文字を回答の末尾に出力。作問者情報を入れたいときなどに使ってください
        </td>
      </tr>
    </table>
    <h5>Example</h5>
    <h6>Request</h6>
    <p>
      GET:
      <code
        class="url">https://script.google.com/macros/s/AKfycbzOi_ACgcxDldiJ-8kVS5Hxxe8i37O168mubm95taRE7kAZ9a9Q/exec?t=show&p=1lnZuqxrFkku0qcfhe_ugUcH05qh7If1jV_g67WzlgH0&s=0</code>
    </p>
    <h6>Response</h6>
    <pre><code>[
  {
    "n": "abc the first:0001",
    "q": "「abc ～the first～」へようこそ！さて、ABC・・・と始まるアルファベットは、全部で何文字でしょう？",
    "a": "26文字",
    "tag": ""
  },{
    "n": "abc the first:0002",
    "q": "人気漫画『ドラえもん』の登場人物で、ジャイアンの苗字は剛田ですが、スネ夫の苗字は何でしょう？",
    "a": "骨川（滑川も正解）",
    "tag": ""
  },{
    "n":"abc the first:0003",
    "q":"格闘家ボブ・サップの出身国はどこでしょう？",
    "a":"アメリカ",
    "tag":""
  }, ...
]</code></pre>
    <h4>関連リンク</h4>
    <h5>Quiz Flasher</h5>
    <ul>
      <li>
        <a class="url"
          href="https://script.google.com/macros/s/AKfycby0uoGf4OGDKWBvfDNUERpDD2M7sny83k9Oj9D69RjDTub4E_o/exec"
          target="_blank">https://script.google.com/macros/s/AKfycby0uoGf4OGDKWBvfDNUERpDD2M7sny83k9Oj9D69RjDTub4E_o/exec</a>
      </li>
    </ul>
    <h5>abcLINEQUIZ [LINE bot]</h5>
    <ul>
      <li>
        <a class="url" href="https://lin.ee/DidtKli" target="_blank">https://lin.ee/DidtKli</a>
      </li>
    </ul>
  </div>
</template>