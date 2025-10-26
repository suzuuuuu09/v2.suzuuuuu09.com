# コーディングスタイルと規約

## ファイル命名規則

### Astroコンポーネント
- PascalCase: `BaseLayout.astro`, `ProfileSection.astro`, `HeaderLink.astro`
- 配置場所により命名:
  - `bases/`: 基礎コンポーネント
  - `sections/`: セクションコンポーネント (末尾に`Section`)
  - `shared/`: 共有コンポーネント
  - `ui/`: UIコンポーネント

### TypeScript/Reactファイル
- PascalCase: `ContentContainer.tsx`, `FloatingBackground.tsx`
- `.tsx`: React/JSXコンポーネント
- `.ts`: 型定義や設定ファイル

### 設定ファイル
- kebab-case: `astro.config.mjs`, `panda.config.ts`, `content.config.ts`

## TypeScript規約

### 型定義
- 型定義は `src/types.ts` に集約
- インターフェースを使用: `interface ContactLink`
- exportによる型の公開

### インポートエイリアス
```typescript
import { ... } from "@/...";  // src/へのエイリアス
import { ... } from "~/...";  // public/へのエイリアス
```

## Astroコンポーネント規約

### Props定義
```typescript
interface Props {
  title?: string;
  // propsの型定義
}

const { title } = Astro.props;
```

### ファイル構成
1. インポート文
2. Props型定義
3. スクリプトロジック
4. テンプレート部分

## Reactコンポーネント規約

### Panda CSSの使用
```typescript
import { css } from 'styled-system/css';
import { cva } from 'styled-system/css';

// CVA (Class Variance Authority) パターン
export const componentRecipes = cva({
  base: { /* 基本スタイル */ },
  variants: { /* バリアント */ }
});

// styled関数を使用したコンポーネント作成
import { s } from 'styled-system/jsx';
export const Component = s('div', componentRecipes);
```

### スタイリングアプローチ
- Panda CSSのユーティリティを優先
- カスタムレシピ(CVA)を使用して再利用可能なスタイルパターンを定義
- セマンティックトークン(`sz.*`)を活用

## コンテンツコレクション

### ブログ記事のフロントマター
```yaml
---
title: string (必須)
description: string (必須)
pubDate: date (必須)
updatedDate: date (オプション)
heroImage: image (オプション)
---
```

### ファイル形式
- Markdown (`.md`) またはMDX (`.mdx`)を使用
- `src/content/blog/`に配置

## コーディング原則

### 1. 型安全性
- TypeScript strictモードを使用
- 型推論を活用しつつ、必要に応じて明示的な型注釈

### 2. コンポーネント設計
- 単一責任の原則
- 再利用可能なコンポーネントは`shared/`に配置
- セクション単位のコンポーネントは`sections/`に配置

### 3. スタイリング
- Panda CSSのトークンシステムを使用
- マジックナンバーを避け、テーマトークンを使用
- レスポンシブデザインを考慮

### 4. パフォーマンス
- Astroの静的生成を活用
- 画像はSharpで最適化
- 必要な場所のみでReactを使用(部分的hydration)

## 設定ファイル

### tsconfig.json
- Astroの strict設定を継承
- パスエイリアス設定済み
- React JSXサポート

### panda.config.ts
- プリフライトCSS有効
- カスタムカラートークン定義
- `src/**/*.{astro,tsx,jsx,ts,js}`をスキャン対象に設定
