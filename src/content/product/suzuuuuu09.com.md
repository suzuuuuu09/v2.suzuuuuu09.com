---
title: suzuuuuu09.com
author: suzu
slug: suzuuuuu09-com
tags:
  - Astro
  - React
  - PandaCSS
  - TypeScript
  - GSAP
  - CloudflarePages
thumbnail: "![[suzuuuuu09.com-1758351963075.webp]]"
description: AstroとReactを使ったポートフォリオサイト兼ブログサイトを構築した。UXを意識したデザインやアニメーション作成を意識した。遊び心を感じられるようなイースターエッグを仕込んだ。
isPublish: true
publishDate: 2025-09-20T15:12
updateDate: 2026-02-07T23:56
---

## はじめに

こんにちは。はじめまして。**suzu (@suzuuuuu09)** です。私は情報系の大学 1 年で、個人的に Web フロントエンド技術を使った Web 開発をおこなっています。夏休みの機会を利用して、触ったことがなかった技術を使って新しいものを作ろうと思いました。  
そこで今回、Astro と React を使ったポートフォリオサイト兼ブログサイトを制作しましたので、紹介します。

## 画像・動画

![[suzuuuuu09.com-1758351963075.webp]]

## 技術スタック

### フレームワーク

#### Astro

[Astro](https://astro.build)
静的サイト生成に適していて、扱いやすい **Astro** を採用しました。  
パフォーマンスに優れており、非常に高速なページの読み込みがデフォルトで行えるようになっています。また、後述する **Content Collections** も Astro を採用した理由のひとつです。

#### React

[React](https://ja.react.dev)
UI フレームワークに **React** を使用しました。

#### GSAP

[Homepage \| GSAP](https://gsap.com)
アニメーションを行うために、**GSAP** を採用しました。
[`Motion(旧Framer Motion)`](https://motion.dev) の採用も考えましたが、React でしか動かせないのがネックだったので諦めました。

### スタイリング・デザイン

#### Panda CSS

[Panda CSS - Build modern websites using build time and type-safe CSS-in-JS](https://panda-css.com)
スタイリングには **Panda CSS** を採用しました。  
Chakra UI 開発チームによって作られた `サーバーファースト時代における CSS-in-JS の課題を解決することを目的とした新しい CSS-in-JS エンジン` です。(公式ページより)  
Tailwind CSS や UnoCSS のようなユーティリティクラスを活用した CSS フレームワークと違い、高い保守性があります。(余談ですが、当初このサイトは UnoCSS で作っていましたが、保守性が低さからサイトを一度作り直しています)

#### フォント

[IBM Plex Sans JP - Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Sans+JP)
[GitHub - yuru7/moralerspace: Moralerspace は、欧文フォント Monaspace と日本語フォント IBM Plex Sans JP 等を合成したプログラミング向けフォントです。](https://github.com/yuru7/moralerspace)
フォントは本文に **IBM Plex Sans JP** 、コードブロックに **Moralerspace** を使用しました。

#### 絵文字

[GitHub - twitter/twemoji: Emoji for everyone. https://twemoji.twitter.com/](https://github.com/twitter/twemoji)
絵文字は Twitter(現 X) が開発した**Twemoji**を採用しています。  
絵文字を入力すると自動で SVG 画像に変換してくれます。  
😄⭐☔←こんな感じ

#### アイコン

[Iconify Design: All popular icon sets, one framework.](https://iconify.design)
[GitHub - manuelmeister/astro-iconify: Inline and sprite-based SVGs in Astro using up to date Iconify service](https://github.com/manuelmeister/astro-iconify)
アイコンは**astro-iconify**を使っています。  
astro-iconify を使うことで mdi や devicon などのアイコンやロゴを簡単に扱うことができます。
もともとは [`Astro Icon`](https://iconify.design/docs/usage/svg/astro/) を使っていましたが、アイコンを使うために別途でパッケージをインストールする必要があり煩わしかったため、Astro Icon は採用しませんでした。

### コンテンツ管理

#### Content Collections

[Content collections \| Docs](https://docs.astro.build/ja/guides/content-collections/)
Astro を採用したもうひとつの理由です。  
Content Collections は Astro のプロジェクトフォルダ内に src/content ディレクトリを作ることでディレクトリ内にある Markdown ファイルを簡単に管理することができます。また、title や slug などのデータを型安全に処理できます。

### ホスティング

#### Cloudflare Pages

[フル スタックアプリケーション \| Cloudflare](https://www.cloudflare.com/ja-jp/developer-platform/products/pages/)
ホスティングには **Cloudflare Pages** を使用しました。  
知り合いから「Cloudflare Pages が楽で使いやすい」と聞いたので試しに導入してみました。

### OGP 画像の生成

#### Satori & Resvg

[GitHub - vercel/satori: Enlightened library to convert HTML and CSS to SVG](https://github.com/vercel/satori)
[GitHub - thx/resvg-js: A high-performance SVG renderer and toolkit, powered by Rust based resvg and napi-rs.](https://github.com/thx/resvg-js)
**Satori** を使って HTML と CSS から SVG を生成します。生成した SVG を **Resvg** を用いて PNG 画像に変換しています。

#### BudouX

[GitHub - google/budoux](https://github.com/google/budoux)
**BudouX** はタイトルの文を分かち書きするために使いました。

### アナリティクス

#### Google Analytics

[Google Analytics  \|  Google for Developers](https://developers.google.com/analytics?hl=ja)
アナリティクスは **Google Analytics** を使用しています。特にこだわりがなかったので無難なものを選びました。

### コードブロック

#### Expressive Code

[Expressive Code \| Expressive Code](https://expressive-code.com/)
コードブロックに **Expressive Code** を使用しました。Astro との相性も良く、簡単にリッチなコードブロックを扱えるのが特徴です。

## こだわりポイント

### ヘッダーナビゲーション

![[navigation.webp]]

**GSAP**を使ったヘッダーのホバーアニメーションです。  
触っていて楽しさや爽快感を感じられるようなアニメーションを作りました。また、このアニメーションを作ることで、カーソルの位置がナビゲーションのどの位置にあるのか分かりやすくなりました。

### 見出しの「#」レベル

先日 Twitter を見ていたところ、このようなツイートを見かけました。
[md ってレンダリング後も ## とか維持した方が読みやすいので、維持してみた。 | Twitter](https://x.com/voluntas/status/1981896805672501760)
なるほど...確かに読みやすい...てことで当サイトにも実装してみました。

![[suzuuuuu09.com-1762359073619.webp]]

このような感じになりました。見出しのレベルが分かりやすくなりました。  
実装方法について説明します。  
[`rehype-slug`](https://github.com/rehypejs/rehype-slug) と [`rehype-autolink-headings`](https://github.com/rehypejs/rehype-autolink-headings) をインストールします。簡単に説明すると、rehype-slug は見出しに固有 id を持たせるプラグイン。rehype-autolink-headings は見出しにリンクを追加するプラグインです。

```javascript title=astro.config.mjs
import { defineConfig } from "astro/config";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export default defineConfig({
  markdown: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          content: /** @param {any} node */ (node) => {
            // headingのlevelに応じて#の数を変える
            // h1 から h6 まで対応
            const level = Number.parseInt(node.tagName.substring(1), 7);
            const hashes = "#".repeat(level);

            return {
              type: "element",
              tagName: "span",
              properties: {
                className: ["heading-anchor"],
              },
              children: [{ type: "text", value: hashes }],
            };
          },
          group: {
            type: "element",
            tagName: "div",
            properties: {
              className: ["heading-wrapper"],
            },
            children: [],
          },
        },
      ],
    ],
  },
});
```

これで見出しのレベルに応じて「#」の数を変えることが出来ます。

## リンク

### デプロイ先

https://suzuuuuu09.com

## 参考記事・リンク

[ObsidianをCMSにしたら、思ったより本格的だった話 #cloudflare - Qiita](https://qiita.com/nasubi_dev/items/2237101b170f7327e4a0)
Content の管理方法を参考にしました。

[Adding reading time to Astro without the hassle \| Blog – Jahir Fiquitiva](https://jahir.dev/blog/astro-reading-time)
記事の読了時間の計算方法についての書き方を参考にしました。

[URL をリンクカードに変換する Remark プラグインを作る \| SIWL.dev](https://siwl.dev/blog/articles/remark-bare-link/)
リンクカードを作成する際の favicon 情報を取得する方法を参考にしました。

[ローカル環境でもOGPを確認したい【localhost OGP チェッカー】](https://zenn.dev/yamap_web/articles/a7c027bb307987)
OGP 画像作成時の確認手段として使いました。

[BudouXとSatoriを使ってタイトルが分かち書きされたOGP画像を出力する。 - return $lock;](https://retrorocket.biz/archives/use-budoux-with-satori)
OGP 画像のタイトルを分かち書きする方法を参考にしました。
