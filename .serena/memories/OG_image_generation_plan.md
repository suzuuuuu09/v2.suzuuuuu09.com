# OG画像生成の実装計画

## 必要なコンポーネント

### 1. OG画像React コンポーネント (`src/components/OgImage.tsx`)

- Satoriで使用するReactコンポーネント
- OG画像のレイアウトを定義
- タイトル、サイト名などを動的に表示

### 2. 画像生成ユーティリティ (`src/utils/imageGenerator.ts`)

- Satoriを使用してReactコンポーネントからSVGを生成
- sharp / @resvg/resvg-jsを使用してSVGをPNG/WebPに変換
- フォント埋め込みの処理

### 3. APIエンドポイント (`src/pages/api/og/[...title].ts`)

- URLパラメータでタイトルを受け取る
- 画像生成ユーティリティを呼び出す
- PNG/WebP形式で返却
- キャッシュ制御ヘッダーを設定

## 設計方針

- 1200x630px（一般的なOG画像サイズ）で生成
- タイプ別（blog/product等）に対応
- フォントはNoto Sans JPなどを使用（Satoriで扱いやすい）
- キャッシュ戦略は実装後に検討
