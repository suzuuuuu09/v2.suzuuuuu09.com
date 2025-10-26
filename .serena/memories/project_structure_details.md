# プロジェクト構造の詳細

## ディレクトリ構成

### `/src/components/`
コンポーネントの分類と役割:

#### `bases/` - 基礎コンポーネント
サイト全体で使用される基本的なレイアウトコンポーネント
- `Header.astro`: サイトヘッダー
- `Footer.astro`: サイトフッター
- `FloatingBackground.tsx`: 背景エフェクト用Reactコンポーネント (現在空)

#### `sections/` - セクションコンポーネント
ページを構成する大きなセクション単位のコンポーネント
- `ProfileSection.astro`: プロフィールセクション
- `CareerSection.astro`: 経歴セクション
- `SkillSection.astro`: スキルセクション
- `BlogSection.astro`: ブログセクション
- `ProductSection.astro`: プロダクトセクション
- `AwardSection.astro`: 受賞歴セクション

#### `shared/` - 共有コンポーネント
複数箇所で再利用されるコンポーネント
- `ContentContainer.tsx`: コンテンツコンテナ (Panda CSS CVA使用)
- `IconCard.astro`: アイコンカード
- `SectionLayout.astro`: セクションレイアウト
- `SectionTitle.astro`: セクションタイトル

#### `ui/` - UIコンポーネント
小さな単位のUIパーツ
- `Avatar.astro`: アバター表示

#### `features/` - 機能コンポーネント
特定の機能を持つコンポーネント (現在は空)

### ルートレベルコンポーネント
`/src/components/` 直下のコンポーネント:
- `BaseHead.astro`: HTMLヘッド要素 (メタデータ、SEO)
- `Header.astro`: ヘッダー (レガシー?)
- `Footer.astro`: フッター (レガシー?)
- `HeaderLink.astro`: ヘッダーリンク
- `FormattedDate.astro`: 日付フォーマット用

## `/src/layouts/`
ページテンプレート
- `BaseLayout.astro`: 基本レイアウト
  - サイト全体の共通レイアウト
  - Header, Footerを含む
- `BlogPost.astro`: ブログ記事用レイアウト
  - 記事メタデータ表示
  - 記事本文表示

## `/src/pages/`
ファイルベースルーティング
- `index.astro`: トップページ
- `about.astro`: アバウトページ
- `rss.xml.js`: RSSフィード生成
- `blog/index.astro`: ブログ一覧ページ
- `blog/[...slug].astro`: 動的ブログ記事ページ

## `/src/content/`
コンテンツコレクション
- `blog/`: ブログ記事 (Markdown/MDX)
  - `first-post.md`
  - `second-post.md`
  - `third-post.md`
  - `markdown-style-guide.md`
  - `using-mdx.mdx`
- `profile.md`: プロフィール情報

## `/src/assets/`
画像などの静的アセット
- `icon.svg`: サイトアイコン
- `blog-placeholder-*.jpg`: ブログ用プレースホルダー画像

## `/src/styles/`
グローバルスタイル
- `global.css`: サイト全体のスタイル

## ルートレベルファイル

### 設定ファイル
- `consts.ts`: サイト定数
  - `SITE_TITLE`, `SITE_DESCRIPTION`
  - `CONTACT_LINKS`: SNSリンク配列
  - `NAVIGATION_LINKS`: ナビゲーションリンク配列
- `types.ts`: 型定義
  - `ContactLink` interface
- `content.config.ts`: コンテンツコレクション設定
  - `blog` collection定義
  - フロントマタースキーマ

## `/styled-system/`
Panda CSS生成ファイル (自動生成、編集不可)
- `css/`: CSSユーティリティ
- `jsx/`: JSXスタイルコンポーネント
- `patterns/`: パターンスタイル
- `tokens/`: デザイントークン
- `types/`: 型定義

## `/public/`
静的ファイル配信ディレクトリ
- `fonts/`: フォントファイル

## アーキテクチャの特徴

### 1. ハイブリッドアプローチ
- Astro: 静的ページ生成とルーティング
- React: インタラクティブなUIコンポーネント
- 部分的Hydration: 必要な箇所のみJavaScriptを実行

### 2. コンテンツ駆動
- Content Collections API使用
- Markdown/MDXベースのコンテンツ管理
- 型安全なフロントマター

### 3. モジュラー設計
- コンポーネントの責務を明確に分離
- 再利用性を重視した設計
- 階層的なディレクトリ構造

### 4. スタイリング戦略
- Panda CSS: ユーティリティファースト
- デザイントークンによる一貫性
- コンポーネントレベルでのスタイル定義
