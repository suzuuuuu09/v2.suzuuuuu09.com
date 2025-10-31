---
title: SveltekitでPandaCSSによって生成されたstyled-systemモジュールが見つからない問題とその対処法
slug: panda-cantfind-ss-module
author: suzu
emoji: 🔍
description: SveltekitでPandaCSSを使用する際に発生するstyled-systemモジュールが見つからない問題の解決方法
category: tech
tags:
  - Svelte
  - PandaCSS
  - TypeScript
publishDate: 2025-10-05
updateDate: 2025-11-01
isPublish: true
---

## 🔍 問題の概要

SveltekitプロジェクトでPandaCSSを導入した際に、`styled-system/css`モジュールが見つからないというTypeScriptエラーが発生する問題について解説します。

## 📋 発生条件

この問題は以下の手順で再現されます：

### 1. プロジェクトセットアップ
Svelteのプロジェクトを**Svelte library**テンプレートを使用してセットアップ

### 2. PandaCSSの導入
PandaCSS公式ドキュメントのSvelteセットアップガイドに従って設定

https://panda-css.com/docs/installation/svelte

### 3. PandaCSSの使用
以下のようなコードを記述した際にエラーが発生

```svelte title="+page.svelte"
<script lang="ts">
  import { css } from 'styled-system/css';
</script>

<div class={css({ color: 'red' })}>
  Hello PandaCSS!
</div>
```

## ❌ エラー内容

```text
Cannot find module 'styled-system/css' or its corresponding type declarations.
```

TypeScriptが`styled-system`モジュールを認識できず、型定義も見つからないというエラーが表示されます。

## ✅ 解決方法

この問題は、TypeScriptの**モジュール解決設定**が原因で発生します。

### 修正手順

`tsconfig.json`ファイルの`compilerOptions`セクションを以下のように変更してください：

```diff title="tsconfig.json"
{
  "compilerOptions": {
-    "module": "NodeNext",
-    "moduleResolution": "NodeNext",
+    "module": "esnext",
+    "moduleResolution": "bundler"
  }
}
```

### 変更の詳細

| 設定項目 | 変更前 | 変更後 | 説明 |
|---------|--------|--------|------|
| `module` | `NodeNext` | `esnext` | 最新のESモジュール形式を使用 |
| `moduleResolution` | `NodeNext` | `bundler` | バンドラー（Vite）による解決を使用 |

## 🔧 なぜこの修正で解決するのか

- **NodeNext**: Node.jsの最新のモジュール解決ルールを使用（厳密だが制限が多い）
- **bundler**: Viteなどのバンドラーが提供する柔軟なモジュール解決を使用

PandaCSSが生成する`styled-system`は、バンドラー環境での使用を前提としているため、`bundler`モードでの解決が必要です。

## 🎯 まとめ

- SvelteKitでPandaCSSを使用する際は、TypeScriptの設定調整が必要
- `moduleResolution: "bundler"`が推奨設定
- この設定により、PandaCSSが正常に動作するようになります

## 🔗 関連リンク

https://github.com/chakra-ui/panda/issues/2658

https://www.typescriptlang.org/docs/handbook/module-resolution.html
