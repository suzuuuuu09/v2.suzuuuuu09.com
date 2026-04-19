---
title: Astroで記事のURLの末尾に.mdをつけたときに生のMarkdownで表示する
slug: astro-url-md
author: suzu
emoji: 🧾
description: AstroのContent collectionで管理している記事のURLの末尾に.mdをつけた時にtext/markdownで返す方法について解説する。
category: tech
tags:
  - Astro
isPublish: true
publishDate: 2026-01-11T21:26
updateDate: 2026-04-19T15:22
---

## 概要

Qiita や esa.io などで搭載されている記事の末尾に `.md` つけると、生の Markdown データを取得できるようにする機能を Astro で実装します。

## 環境

- **Astro**: v5.15.1
- Astro の Content Collections で記事を管理していること

## 実際の動き

- `/blog/example` → 通常の HTML として表示
- `/blog/example.md` → `text/markdown` 形式で Markdown の生データを表示

## ディレクトリ構成

当サイトでは次のようなディレクトリ構成で記事を管理しています。`award`、`blog`、`product` と複数のコレクションがあり、これらを一括で処理する行えるようにしました。

```tree
src/pages/
├─ award/
│   └─ [...slug].astro
├─ blog/
│   └─ [...slug].astro
└─ product/
    └─ [...slug].astro
```

## エンドポイントの実装

ここで `src/pages/[collection]/[...slug].md.ts` として新しくエンドポイント用のファイルを作ります。

```tree
src/pages/
└─ [collection]/
    └─ [...slug].md.ts  # ← Markdownで返すエンドポイント
```

ディレクトリの名前を `[collection]` にすることで動的パラメータを用いて複数のコレクションを一括で処理できるようになります。

```ts title=src/pages/[collection]/[...slug].md.ts
import { getAllPosts, type AllPost } from "@/utils/post";

export async function getStaticPaths() {
  const entries = await getAllPosts();
  return entries.map((entry) => ({
    params: {
      collection: entry.collection, // award, blog, product
      slug: entry.data.slug,
    },
    props: { entry },
  }));
}

export async function GET({ props }: { props: { entry: AllPost } }) {
  const { entry } = props;
  const markdown = entry.body;

  return new Response(markdown, {
    status: 200,
    headers: {
      // text/markdownとして設定
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
```

## おわりに

Astro の動的ルーティングとエンドポイント機能を組み合わせることで、意外と簡単に実装できました。
