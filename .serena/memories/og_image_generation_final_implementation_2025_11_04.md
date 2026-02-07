# OGP画像生成機能 - 最終実装完了 (2025年11月4日)

## ✅ 実装完了

### 1. コンポーネント実装

#### src/components/OgImage.tsx

- Reactコンポーネント、Satoriで使用
- タイプ別カラースキーム:
  - blog: 紫 (#667eea → #764ba2)
  - product: ピンク (#f093fb → #f5576c)
  - about: シアン (#4facfe → #00f2fe)
  - default: 紫 (#667eea → #764ba2)
- 1200x630pxサイズ
- IBMPlexSansJPフォント使用

#### src/utils/og-image-generator.ts

- `loadFonts()`: public/fonts/IBMPlexSansJP-{Regular,Bold}.ttfを読み込み
- `generateSvg()`: SatoriでリアクトコンポーネントからSVG生成
- `convertSvgToImage()`: @resvg/resvg-js → sharpで画像変換
- `generateOgImage()`: 統合関数
- `getContentType()`: MIME タイプ返却

### 2. APIエンドポイント

#### src/pages/api/og.ts

- GET /api/og?title=...&type=...
- パラメータ:
  - title: 必須、URLエンコード対応
  - type: オプション (blog|product|about|default) - デフォルト: default
  - format: オプション (png|webp|jpeg) - デフォルト: png
- キャッシュ: 24時間
- レスポンス: image/png

### 3. 設定変更

#### astro.config.mjs

- output: "static" → "server" に変更
- SSRモード有効化により動的APIが機能

### 4. テスト結果 ✅

すべてのタイプでOG画像生成を確認：

```
GET /api/og?title=テストOG画像&type=blog      → 200 OK (紫グラデーション)
GET /api/og?title=プロダクト&type=product     → 200 OK (ピングラデーション)
GET /api/og?title=アバウト&type=about         → 200 OK (シアングラデーション)
GET /api/og?title=デフォルト&type=default     → 200 OK (紫グラデーション)
```

## 注意点

- SSRモード: プロダクション環境では @astrojs/node または @astrojs/vercel などのアダプターが必須
- 日本語フォント: public/fonts/IBMPlexSansJP-{Regular,Bold}.ttf が必要
- 画像生成時間: 初回2-3秒（以降キャッシュ活用推奨）

## ファイル削除済み

- src/utils/imageGenerator.ts (古い破損ファイル - 削除済み)

## 使用方法

### ブログ記事でのOG画像URL例

```html
<meta
  property="og:image"
  content="https://suzuuuuu09.com/api/og?title=ブログタイトル&type=blog"
/>
```

### プログラムでの利用

```typescript
import { generateOgImage } from "@/utils/og-image-generator";

const buffer = await generateOgImage({
  title: "My Title",
  type: "blog",
  format: "png",
});
```
