---
title: QR Code Generator
author: suzu
slug: qr-code-generator
tags:
  - Svelte
  - ArkUI
  - PandaCSS
thumbnail: "![[QR_Code_Generator-1759659688106.webp]]"
description: suzuのアイコンが入ったQRコードを生成できるサイト
publishDate: 2025-10-05
updateDate: 2026-02-07T23:56
isPublish: true
---

## 概要

suzuのアイコンを埋め込んだQRコードを作成できます。これまではアイコン入りQRコード作成サイトで毎回作り直していたため手間がかかっていましたが、その煩わしさを解消するために「QR Code Generator」を作成しました。  
また、今回初めてPandaCSSを試してみました。今までにTailwindCSSとUnoCSSを使ってきた経験から比較すると、一番良かったなと感じたのはclass名が長くなりすぎないことです。TailwindCSSやUnoCSSを使用していると、どうしてもclass名が長くなって可読性が悪くなってしまうので、そこが一番いいなと思いました。

## 技術スタック

- **フロントエンドフレームワーク**: Svelte 5
- **ビルドツール**: Sveltekit with Vite
- **言語**: TypeScript
- **スタイリング**: PandaCSS
- **UIコンポーネント**: Ark UI
- **QRコード生成**: @svelte-put/qr

## 画像・動画

![[QR_Code_Generator-1759659688106.webp]]

## リンク

### デプロイ先

https://qr.suzuuuuu09.com

### GitHub

https://github.com/suzuuuuu09/qr.suzuuuuu09.com
