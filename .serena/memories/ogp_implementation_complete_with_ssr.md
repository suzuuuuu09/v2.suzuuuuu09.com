# OGP画像生成 - SSR対応完了 (2025年11月4日)

## ✅ 完全実装完了

### 1. 実装ファイル

#### src/components/OgImage.tsx

- タイプ別グラデーション背景
- blog/product/about/default の4タイプ対応
- IBM Plex Sans JP フォント使用

#### src/utils/og-image-generator.ts

- フォント読み込み
- SVG生成（Satori）
- 画像変換（@resvg/resvg-js + Sharp）
- MIME タイプ返却

#### src/pages/api/og.ts

- GET /api/og?title=...&type=...&format=...
- 動的OG画像生成エンドポイント

### 2. 設定変更

#### astro.config.mjs

```javascript
import node from "@astrojs/node";

export default defineConfig({
  site: "https://suzuuuuu09.com",
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  // ... integrations
});
```

### 3. 依存関係

- @astrojs/node v9.5.0 (新規インストール)
- satori (既存)
- @resvg/resvg-js (既存)
- sharp (既存)

### 4. ビルド結果

✅ 本番ビルド成功

- dist/client/ - クライアント資産
- dist/server/ - サーバーロジック
- @astrojs/node で SSR 対応

### 5. テスト済みシナリオ

```
GET /api/og?title=テストOG画像&type=blog    → ✅ 紫グラデーション
GET /api/og?title=プロダクト&type=product   → ✅ ピンクグラデーション
GET /api/og?title=アバウト&type=about       → ✅ シアングラデーション
GET /api/og?title=デフォルト&type=default   → ✅ 紫グラデーション
```

### 6. 注意事項

- SSRモード: `output: "server"` で動的生成に対応
- アダプター: プロダクションには @astrojs/node が必須
- 画像生成時間: 初回1-2秒、以降キャッシュ推奨

### 7. デプロイメント

本番環境でのデプロイ方法:

**Node.js サーバー:**

```bash
# ビルド
bun run build

# 実行
node dist/server/entry.mjs
```

**Vercel:**

```bash
# package.json に以下を追加
{
  "build": "astro build",
  "start": "node dist/server/entry.mjs"
}
```

### 8. API 使用例

```typescript
// TypeScript での使用
const url = new URL('/api/og', 'https://suzuuuuu09.com');
url.searchParams.set('title', 'ブログタイトル');
url.searchParams.set('type', 'blog');

// HTML での使用
<meta property="og:image" content="https://suzuuuuu09.com/api/og?title=記事タイトル&type=blog">
```

## 次のステップ

1. ページのメタタグで OG 画像 URL を設定
2. ブログレイアウト等で自動的に OG 画像を生成するように統合
3. キャッシュ戦略の検討（CDN キャッシュなど）
