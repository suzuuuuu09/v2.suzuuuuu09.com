# プロジェクト概要

## プロジェクト名
v2.suzuuuuu09.com

## 目的
個人ポートフォリオサイト兼ブログサイト。suzuuuuu09氏の作品、経歴、スキル、ブログ記事を紹介するためのWebサイト。

## 技術スタック

### フロントエンドフレームワーク
- **Astro 5.15.1**: メインフレームワーク
- **React 19.2.0**: UIコンポーネント用
- **TypeScript**: 型安全性を担保

### スタイリング
- **Panda CSS 1.4.3**: ユーティリティファーストのCSSフレームワーク
  - カスタムテーマカラー: `s-primary` (#3951E2), `s-bg` (#faf8ff), `s-bg-on` (#F0F0F0)
  - セマンティックトークン: `sz.primary`, `sz.bg`, `sz.bg-on`, `sz.text.main`, `sz.border`

### その他のライブラリ
- **@astrojs/mdx**: MDXサポート
- **@astrojs/sitemap**: サイトマップ生成
- **@astrojs/rss**: RSSフィード生成
- **astro-iconify**: アイコン表示
- **sharp**: 画像最適化

## パッケージマネージャー
- **Bun**: 依存関係管理とスクリプト実行に使用

## プロジェクト構造

```
src/
├── assets/          # 画像などの静的アセット
├── components/      # コンポーネント
│   ├── bases/       # 基礎コンポーネント (Header, Footer, FloatingBackground)
│   ├── features/    # 機能コンポーネント
│   ├── sections/    # セクションコンポーネント (Profile, Career, Skill, Blog, Product, Award)
│   ├── shared/      # 共有コンポーネント (ContentContainer, IconCard, SectionLayout, SectionTitle)
│   └── ui/          # UIコンポーネント (Avatar)
├── content/         # コンテンツコレクション
│   ├── blog/        # ブログ記事 (Markdown/MDX)
│   └── profile.md   # プロフィール
├── layouts/         # レイアウトコンポーネント
│   ├── BaseLayout.astro
│   └── BlogPost.astro
├── pages/           # ページルーティング
│   ├── index.astro
│   ├── about.astro
│   ├── rss.xml.js
│   └── blog/
├── styles/          # グローバルスタイル
├── consts.ts        # サイト全体の定数
├── types.ts         # 型定義
└── content.config.ts # コンテンツコレクション設定
```

## ページ構成
- **Home** (`/`): トップページ
- **About** (`/about`): アバウトページ
- **Products** (`/product`): プロダクト紹介 (ナビゲーションに記載)
- **Awards** (`/award`): 受賞歴 (ナビゲーションに記載)
- **Blog** (`/blog`): ブログ一覧・記事ページ

## 外部リンク
- Twitter: https://twitter.com/suzuuuuu_09
- GitHub: https://github.com/suzuuuuu09
- Zenn: https://zenn.dev/suzuuuuu09
- Qiita: https://qiita.com/suzuuuuu09
