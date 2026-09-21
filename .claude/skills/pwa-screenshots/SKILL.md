---
name: pwa-screenshots
description: newt239.dev の public/screenshots/ を撮り直す手順。PWA のリッチインストール UI 用スクリーンショットを差し替えるとき、または manifest の screenshots を更新するときに使う。
---

# PWA スクリーンショットの撮り直し

`public/screenshots/` は手動撮影で、生成スクリプトは持たない。

## 手順

1. `pnpm run generate` でビルドする
2. `pnpm run serve:static` を起動する（`.output/public` を localhost:3100 で配信）
3. Chrome を `--remote-debugging-port` 付きで立ち上げる
4. CDP の `Emulation.setDeviceMetricsOverride` でビューポートを指定し、`Page.captureScreenshot` で撮る

`--headless --window-size` は使えない。Chrome のウィンドウ幅の下限 500px が効いてしまい、390px を指定しても 500px でレイアウトした結果を切り取った画像になる。

## Chrome のリッチインストール UI の制約

- JPEG か PNG
- 320〜3840px
- 最大辺が最小辺の 2.3 倍以内
- `form_factor` ごとに同一アスペクト比

現在は narrow が 780x1688（390x844 を DPR 2 で撮影）、wide が 1280x800。
