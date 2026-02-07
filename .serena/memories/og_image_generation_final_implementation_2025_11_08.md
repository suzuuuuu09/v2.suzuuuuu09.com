# OGP画像生成機能 - 最終実装完了 (2025年11月8日)

## ✅ 実装完了

### 1. 仕様

#### エンドポイント

- **URL形式**: `localhost:4321/api/og/{type}/{slug}.png`
- **例**: `localhost:4321/api/og/blog/md-test.png`
- **パラメータ**:
  - `type`: コレクションタイプ (blog|product|award)
  - `slug`: ページのスラッグ

#### OG画像レイアウト

- **全体サイズ**: 1200x630px
- **背景**: 背景画像（グラデーション）
- **構成要素**:
  1. **背景画像**: 紫→青→緑のグラデーション
  2. **白背景コンテナ**: タイトル周辺のみ（カド丸、パディング40px）
  3. **タイトルテキスト**: 白背景内に黒いテキスト
  4. **サイト名**: 右下にアイコン付き（suzuuuu09.com）

#### スタイル設定

- **背景コンテナ**: `backgroundColor: #faf8ff`、`borderRadius: 16px`
- **タイトル**: IBMPlexSansJP、64px、左寄せ、flexWrap自動折返し
- **サイト名**: MoralerSpaceNeon、48px、`position: absolute`、右下配置

### 2. 実装ファイル

#### src/components/features/og/OgImage.tsx

```jsx
<main style={{ backgroundImage, ...styles }}>
  <div style={{ backgroundColor: "#faf8ff", borderRadius: "16px", padding: "40px" }}>
    {/* タイトル */}
    <div style={{ fontSize: "64px", ...titleStyles }}>
      {words.map(...)}
    </div>
  </div>

  {/* サイト名 */}
  <div style={{ position: "absolute", bottom: "40px", right: "60px" }}>
    {iconSvg && <img ... />}
    suzuuuu09.com
  </div>
</main>
```

### 3. 動作確認 ✅

**テスト結果**:

- ✅ 背景画像が正しく表示
- ✅ 白背景（カド丸）がタイトル周辺に配置
- ✅ タイトルテキストが読みやすい
- ✅ サイト名がアイコン付きで表示
- ✅ URL形式: `/api/og/{type}/{slug}.png`

### 4. フォント設定

- **IBMPlexSansJP**: Regular (400), Bold (700)
- **MoralerSpaceNeon**: Regular (400)
- **アイコン**: SVGを base64 エンコードして埋め込み

### 5. 色設定（panda.config.ts連携）

- **背景色**: `#faf8ff` (sz.bg)
- **テキスト色**: グラデーション (#3951E2 → #474554 → #6bbaa3)
- **グラデーション背景**: 紫青緑系

## 注意点

- SSRモード: @astrojs/nodeまたはアダプター必須
- 日本語フォント: public/fonts/IBMPlexSansJP-\*.ttf が必要
- 画像生成時間: 初回2-3秒（キャッシュ活用推奨）
