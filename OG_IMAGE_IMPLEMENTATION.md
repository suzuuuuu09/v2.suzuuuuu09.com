# OG画像生成機能の実装ガイド

## 概要

このプロジェクトでは、Satori、sharp、@resvg/resvg-jsを使用して、動的にOG画像を生成するAPIエンドポイントを実装しました。

## 実装ファイル

### 1. OG画像コンポーネント (`src/components/OgImage.tsx`)

Satoriで使用するReactコンポーネント。タイプ別（blog/product/about/default）のグラデーション背景を持つOG画像レイアウトを定義します。

**主な機能:**
- 1200x630pxのサイズで画像を生成
- タイプ別のカラースキーム（紫、ピンク、青など）
- タイトルとサイト名の動的配置
- 装飾用の円形背景

### 2. 画像生成ユーティリティ (`src/utils/imageGenerator.ts`)

Satoriを使用してSVGを生成し、@resvg/resvg-jsとsharpで画像形式に変換します。

**主な機能:**
- `generateSvg()`: Satoriを使用してReactコンポーネントからSVGを生成
- `convertSvgToImage()`: SVGをPNG/WebP/JPEGに変換
- `generateOgImage()`: SVG生成から画像変換まで一括処理
- `getContentType()`: 画像形式に応じたContent-Typeを返す

### 3. APIエンドポイント (`src/pages/api/og/[...title].ts`)

動的OG画像を生成して返すAPIルート。

**エンドポイント:**
```
GET /api/og/{title}?type={type}&format={format}
```

**パラメータ:**
- `title`: OG画像に表示するタイトル（URLエンコード必須）
- `type` (オプション): 画像タイプ (`blog`/`product`/`about`/`default`) - デフォルト: `blog`
- `format` (オプション): 出力形式 (`png`/`webp`/`jpeg`) - デフォルト: `png`

**レスポンス:**
- `Content-Type`: `image/png` (またはwebp/jpeg)
- `Cache-Control`: `public, max-age=86400` (24時間キャッシュ)

### 4. レイアウト更新

#### BlogLayout (`src/layouts/BlogLayout.astro`)
ブログ記事用のOG画像を自動生成し、メタタグに設定します。

#### BaseLayout (`src/layouts/BaseLayout.astro`)
通常のページ用のOG画像をタイトルから生成します。

#### BaseHead (`src/components/BaseHead.astro`)
リユーザブルなHead要素。`useGeneratedOg`フラグで動的生成を制御可能です。

## 使用方法

### ブログページでのOG画像設定

BlogLayout を使用するページでは、自動的に以下の処理が実行されます：

```astro
// src/pages/blog/[...slug].astro の例
<BlogLayout
  title={entry.data.title}
  headings={headings}
  frontmatter={articleInfo}
>
  {/* ページ内容 */}
</BlogLayout>
```

生成されるOG画像URL:
```
/api/og/{ブログタイトル}?type=blog
```

### 手動でOG画像を生成する場合

```typescript
import { generateOgImage } from '@/utils/imageGenerator';

const imageBuffer = await generateOgImage({
  title: 'My Title',
  type: 'blog',
  siteName: 'suzuuuuu09.com',
  format: 'png'
});
```

## デプロイメント設定

### Astro 設定 (`astro.config.mjs`)

```javascript
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  // ... その他の設定
});
```

**注意:**
- `output: "server"` はOG画像APIをSSRで実行するために必須です
- `@astrojs/node` アダプターをインストールしてください

## キャッシュ戦略

現在、以下のキャッシュ戦略を実装しています：

- **HTTP キャッシュ**: 24時間のブラウザキャッシュ（Cache-Control: `public, max-age=86400`）
- **生成時刻**: 同じタイトルなら毎回同じ画像を生成

## トラブルシューティング

### APIが機能しない場合

1. アダプターがインストールされているか確認：
   ```bash
   bun add -D @astrojs/node
   ```

2. `prerender = false` が API ルートに設定されているか確認

3. サーバーが起動しているか確認：
   ```bash
   bun run dev
   ```

### 画像生成に時間がかかる場合

- 大きなタイトルテキストを短くする
- フォーマットをPNGからWebPに変更（高速）

## パフォーマンス最適化

### 推奨設定

```typescript
// より高速な生成のためWebPを使用
/api/og/MyTitle?type=blog&format=webp
```

### CDNキャッシュの設定

本番環境では、CDN（Cloudflareなど）でOG画像URLをキャッシュすることを推奨します：

```
Cache-Key: /api/og/*
TTL: 86400秒（24時間）
```

## 今後の改善案

1. **データベースキャッシュ**: 生成したOG画像をディスクに保存して再利用
2. **複数フォント対応**: 日本語、中国語、絵文字の最適化
3. **動的レイアウト**: 記事の内容に基づいたレイアウト変更
4. **プリビュー機能**: 管理画面でOG画像をプレビュー
5. **自動最適化**: 異なるSNSプラットフォーム向けの自動調整

## 参考リンク

- [Satori Documentation](https://github.com/vercel/satori)
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [@resvg/resvg-js](https://www.npmjs.com/package/@resvg/resvg-js)
- [Astro API Routes](https://docs.astro.build/en/core-concepts/endpoints/)
