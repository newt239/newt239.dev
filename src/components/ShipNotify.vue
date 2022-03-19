<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
    document.title = "SHIP Notify - NEWT HOUSE";
});
</script>

<template>
    <div class="about">
        <div class="intro">
            <h3>SHIP Notify</h3>
            <div class="summary">
                <table>
                    <tr>
                        <th>GitHub</th>
                        <td>
                            <a
                                href="https://github.com/newt239/SHIP-notify-public"
                                target="_blank"
                            >newt239/SHIP-notify-public</a>
                        </td>
                    </tr>
                    <tr>
                        <th>Creation</th>
                        <td>2021/01 -</td>
                    </tr>
                    <tr>
                        <th>Tech</th>
                        <td>Python ( Discord.py ), Selenium, Heroku, Firebase ( Firestore, Hosting, Authentication )</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="thumbnail">
            <img src="/img/ship-info-screenshot.webp" />
        </div>
    </div>
    <div class="content">
        <p>
            SHIP ( Sakae Higashi Internet Program :
            <a
                href="https://ship.sakae-higashi.jp/"
                target="_blank"
            >SHIPトップ</a> ) や栄東中高ホームページの栄東ニュースを定期的にスクレイピングし、更新があれば通知するシステム。
        </p>
        <h4>システム構成</h4>
        <p>現在DiscordのサーバーとLINE公式アカウント、Twitter、Webで運用中。Discord.pyをHeroku上で常時稼働させ、10分おきにループを回し予めセットしておいた時間になるとSHIPや栄東ニュースのスクレイピングなどを行っている。</p>
        <p>スクレイピングにはseleniumを使っている。中高それぞれの「連絡事項」「学習教材」「学校通信」のページを1日2～5回程度取得している。データベースに保存されていないものが見つかればそのリンクをクリックし、説明文やファイルのダウンロードとSHIP-notify側のデータベースへのアップロードを行っている。</p>
        <div class="imageWrapper">
            <img src="/img/ship-assistant-system-map.webp" />
        </div>
        <h4>Web版</h4>
        <p>
            認証に
            <a
                href="https://firebase.google.com/docs/auth?hl=ja"
                target="_blank"
            >Firebase Authentication</a>を通し学校以外のドメインのアカウントからのログインをブロックしている。
        </p>
        <div class="imageWrapper">
            <img src="/img/ship-assistant-web_post-example.webp" />
        </div>
        <h4>データベース</h4>
        <p>
            当初はHeroku上での利用がサポートされている
            <a
                href="https://devcenter.heroku.com/categories/data-management"
                target="_blank"
            >Heroku Postgres</a>を使っていたが、Web版の実装に伴いクライアント側から直接データの取得が可能な
            <a
                href="https://firebase.google.com/docs/firestore?hl=ja"
                target="_blank"
            >Firebase Cloud Firestore</a>へ移行した。
        </p>
        <h4>関連リンク</h4>
        <h5>SHIP-Assistant on Web</h5>
        <ul>
            <li>
                <a
                    href="https://ship-assistant.web.app/"
                    target="_blank"
                >https://ship-assistant.web.app/</a>
            </li>
        </ul>
        <h5>Notion上で利用方法を説明したページ</h5>
        <ul>
            <li>
                <a
                    href="https://www.notion.so/newt-house/SHIP-Assistant-s-Note-c599cf2125364a80920b0447f76d717a"
                    target="_blank"
                >SHIP Assistant's Note</a>
            </li>
        </ul>
    </div>
</template>