# 最近の実装内容 (2025年11月)

## 1. Content Collections の修正
**ファイル**: `src/content.config.ts`

### 変更内容
- `schema`を関数形式から直接オブジェクト形式に変更
- `schema: () => ...` → `schema: ...`
- これにより`z`が`undefined`になるエラーを解決

### 対応コレクション
- `blog`: ブログ記事
- `award`: 受賞歴
- `product`: プロダクト

### フィールド構成
```typescript
// 共通フィールド
commonSchema = {
  title: string,
  slug: string,
  description: string (optional),
  isPublish: boolean (default: false)
}

// blog固有
blog: {
  publishDate: date,
  updateDate: date (optional),
  tags: string[] (optional),
  emoji: string (optional),
  category: string (optional)
}

// award固有
award: {
  type: string,
  date: date
}

// product固有
product: {
  publishDate: date,
  updateDate: date (optional),
  tags: string[] (optional),
  thumbnail: string
}
```

## 2. 記事ナビゲーションコンポーネント
**ファイル**: `src/components/features/blog/SideArticle.astro`

### 機能
- 現在の記事の前後の記事を表示
- `isPublish: true`の記事のみ対象
- 新しい順にソートして前後を判定

### デザイン
- **Gridレイアウト**: `gridTemplateColumns: { base: "1fr", md: "1fr 1fr" }`
- 前の記事（新しい）: 左側（column 1）
- 次の記事（古い）: 右側（column 2）
- 片方がない場合でもスペースを維持

### スタイル
- ホバー時のアニメーション
- レスポンシブ対応（モバイル: 縦並び、デスクトップ: 横並び）
- 絵文字 + タイトル表示（2行で省略）

## 3. Markdownエンドポイント
**ファイル**: `src/pages/[collection]/[...slug].md.ts`

### 機能
- 記事URLに`.md`を付けると元のMarkdownが取得可能
- 例: `/blog/my-post.md` → 元のMarkdownファイルの内容

### 実装方式
- 静的ファイルとしてビルド時に生成
- `fs.readFile`で元のMarkdownファイルを読み込み
- フロントマター付きでそのまま返す

### 対応コレクション
- blog
- award  
- product

### エンドポイント例
```
/blog/embed-test.md
/award/my-award.md
/product/my-product.md
```

## 4. ブログページへの統合
**ファイル**: `src/pages/blog/[...slug].astro`

### 変更内容
- `SideArticle`コンポーネントをインポート
- 記事本文の下に配置
- `slug`をpropsとして渡す

### レイアウト
```astro
<s.article>
  <Content />
  <SideArticle slug={entry.data.slug ?? entry.id} />
</s.article>
```

## 技術的な改善点

### TypeScriptエラー対応
- `style`属性をオブジェクト形式に変更
  - `style="-webkit-line-clamp: 2"` 
  - → `style={{ WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}`

### コードの簡略化
- `[collection]/[...slug].md.ts`を約70行に削減（元100行）
- `Promise.all` + `map` + `flat()`で静的パス生成
- 不要な型定義削除

## デザインパターン

### Grid vs Flexbox
- 記事ナビゲーションでGridを採用
- 理由: 片方がない場合でも位置を固定できる
- `gridColumn: { base: "1", md: "2" }`で配置制御

### コンポーネント設計
- `features/blog/`: ブログ機能専用コンポーネント
  - `SideArticle.astro`: 前後記事ナビゲーション
  - `BlogCard.astro`: ブログカード
  - `ArticleInfo.astro`: 記事情報
  - `TableOfContents.astro`: 目次
  - `TagList.astro`: タグリスト

## 今後の拡張性

### Markdownエンドポイント
- awardページ実装時に自動対応
- productページ実装時に自動対応
- 新しいコレクション追加時は`COLLECTIONS`配列に追加するだけ

### 記事ナビゲーション
- 同じコンポーネントをaward/productでも使用可能
- `collection`パラメータで拡張可能
