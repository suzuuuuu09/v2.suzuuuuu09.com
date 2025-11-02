---
title: suzuuuuu09.com
author: suzu
slug: suzuuuuu09-com
tags:
  - Astro
  - PandaCSS
  - ArkUI
  - ParkUI
  - TypeScript
thumbnail: "![[suzuuuuu09.com-1758351963075.webp]]"
description: ポートフォリオサイト。
publishDate: 2025-09-20T15:12
updateDate: 2025-11-02
isPublish: true
---
## 概要

## 技術スタック
### フレームワーク
#### Astro
[Astro](https://astro.build)
静的サイト生成に適していて簡単に扱いやすい **Astro** を採用しました。  
パフォーマンスに優れており、非常に高速なページの読み込みがデフォルトで行えるようになっています。また、後述する**Content Collections**もAstroを採用した理由のひとつです。

#### React
[React](https://ja.react.dev)
UIフレームワークに**React**を使用しました。

### スタイリング・デザイン
#### Panda CSS
[Panda CSS - Build modern websites using build time and type-safe CSS-in-JS](https://panda-css.com)
スタイリングには**Panda CSS**を採用しました。  
Chakra UI開発チームによって作られた`サーバーファースト時代における CSS-in-JS の課題を解決することを目的とした新しい CSS-in-JS エンジン`です。(公式ページより)  
Tailwind CSSやUno CSSのようなユーティリティクラスを活用したCSSフレームワークと違い、高い保守性があります。(余談ですが、当初はこのサイトはUnoCSSで作っていましたが、保守性が低さからサイトを一度作り直しています)

#### フォント
[IBM Plex Sans JP - Google Fonts](https://fonts.google.com/specimen/IBM+Plex+Sans+JP)
[GitHub - yuru7/moralerspace: Moralerspace は、欧文フォント Monaspace と日本語フォント IBM Plex Sans JP 等を合成したプログラミング向けフォントです。](https://github.com/yuru7/moralerspace)
フォントは**IBM Plex Sans JP**と**Moralerspace**を使用しました。  
IBM Plex Sans JPは視認性が高く、ブログや資料などの文字量が多い場所でも読みやすくなっています。また、このフォントは学園アイドルマスターでも採用されています。  ([`ソース`](https://twitter.com/gomafu_1729_80/status/1765019850613883101))  
Moralerspaceは欧文フォントMonaspaceと日本語フォントIBM Plex Sans JPを合成したプログラミング向けフォントです。IBM Plex Sans JPをベースにしていることから、サイトに一体感を持たせるために採用しました。

#### 絵文字
[GitHub - twitter/twemoji: Emoji for everyone. https://twemoji.twitter.com/](https://github.com/twitter/twemoji)
絵文字はTwitter(現X)が開発した**Twemoji**を採用しています。  
絵文字を入力することで自動でSVG画像に変換してくれます。  
😄⭐☔←こんな感じ

#### astro-iconify
[GitHub - manuelmeister/astro-iconify: Inline and sprite-based SVGs in Astro using up to date Iconify service](https://github.com/manuelmeister/astro-iconify)
アイコンはすべて**astro-iconify**を使っています。  
Astro-iconifyを使うことでmdiやdeviconなどのアイコンやロゴを簡単に扱うことができます。
もともとは[`Astro Icon`](https://iconify.design/docs/usage/svg/astro/)を使っていましたが、アイコンを使うために別途でパッケージが必要なのが煩わしかったのでAstro Iconは採用しませんでした。

### コンテンツ管理
#### Content Collections
[Content collections \| Docs](https://docs.astro.build/ja/guides/content-collections/)
Astroを採用したもうひとつの理由です。  
Content CollectionsはAstroのプロジェクトフォルダ内にsrc/contentディレクトリを作ることでディレクトリ内にあるMarkdownファイルを簡単に管理することができます。また、titleやslugなどのデータを型安全に処理することができます。

### ホスティング
#### Cloudflare Pages
[フル スタックアプリケーション \| Cloudflare](https://www.cloudflare.com/ja-jp/developer-platform/products/pages/)
ホスティングには**Cloudflare Pages**を使用しました。  
知り合いから「Cloudflare Pagesが楽で使いやすい」と聞いたので使ってみました。
## 技術スタック
- **UIフレームワーク**: Ark UI
## 画像・動画
![[suzuuuuu09.com-1758351963075.webp]]

## リンク
### デプロイ先
https://suzuuuuu09.com

## 参考記事


[ObsidianをCMSにしたら、思ったより本格的だった話 #cloudflare - Qiita](https://qiita.com/nasubi_dev/items/2237101b170f7327e4a0)
Contentの管理方法を参考にしました。

[Adding reading time to Astro without the hassle \| Blog – Jahir Fiquitiva](https://jahir.dev/blog/astro-reading-time)
記事の読了時間の計算方法についての書き方を参考にしました。

[URL をリンクカードに変換する Remark プラグインを作る \| SIWL.dev](https://siwl.dev/blog/articles/remark-bare-link/)
リンクカードを作成する際のfavicon情報を取得する方法を参考にしました。

[ローカル環境でもOGPを確認したい【localhost OGP チェッカー】](https://zenn.dev/yamap_web/articles/a7c027bb307987)
OGPの作成時の確認手段として使いました。
