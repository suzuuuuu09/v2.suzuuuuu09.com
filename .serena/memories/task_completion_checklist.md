# タスク完了時のチェックリスト

## コード変更後の必須作業

### 1. スタイリング変更時

Panda CSSの設定やスタイルを変更した場合:

```bash
bun prepare
# または
panda codegen
```

- `styled-system/` ディレクトリが更新されます
- 型定義が再生成されます

### 2. 型チェック

TypeScript/Astroの型チェックを実行:

```bash
bun astro check
```

### 3. ビルドの確認

本番環境用のビルドが成功することを確認:

```bash
bun build
```

### 4. 開発サーバーでの動作確認

変更内容をローカルで確認:

```bash
bun dev
```

- ブラウザで `http://localhost:4321` にアクセス
- 変更箇所が正しく動作しているか確認

## コンテンツ変更時

### ブログ記事追加時

1. `src/content/blog/` に `.md` または `.mdx` ファイルを作成
2. フロントマターを正しく記述:
   - `title`: 必須
   - `description`: 必須
   - `pubDate`: 必須
   - `updatedDate`: オプション
   - `heroImage`: オプション
3. 開発サーバーで記事が表示されることを確認
4. RSSフィードが更新されることを確認 (`/rss.xml`)

## コンポーネント追加時

### 新規コンポーネント作成

1. 適切なディレクトリに配置:
   - 基礎: `components/bases/`
   - セクション: `components/sections/`
   - 共有: `components/shared/`
   - UI: `components/ui/`
   - 機能: `components/features/`
2. 命名規則に従う (PascalCase)
3. 必要に応じて型定義を `src/types.ts` に追加
4. Panda CSSを使用する場合は `bun prepare` を実行

## デプロイ前の確認事項

### 1. サイトURLの設定

`astro.config.mjs` の `site` プロパティが正しいことを確認:

```javascript
export default defineConfig({
  site: "https://suzuuuuu09.com", // 実際のURLに変更
  // ...
});
```

### 2. 本番ビルドのテスト

```bash
bun build
bun preview
```

- ビルド成功を確認
- プレビューで表示確認

### 3. 必須チェック項目

- [ ] すべてのリンクが動作する
- [ ] 画像が正しく表示される
- [ ] レスポンシブデザインが機能している
- [ ] メタデータ(SEO)が適切に設定されている
- [ ] サイトマップが生成されている
- [ ] RSSフィードが有効

## Git操作

### コミット前

1. 変更内容を確認:

```bash
git status
git diff
```

2. ステージング:

```bash
git add .
# または個別ファイル
git add src/components/NewComponent.astro
```

3. コミット:

```bash
git commit -m "適切なコミットメッセージ"
```

### プッシュ

```bash
git push origin master
```

## トラブルシューティング

### スタイルが反映されない

```bash
# Panda CSSを再生成
bun prepare
# 開発サーバーを再起動
# Ctrl+C で停止後
bun dev
```

### ビルドエラー

```bash
# 依存関係を再インストール
rm -rf node_modules
bun install
# Panda CSSを再生成
bun prepare
# 再ビルド
bun build
```

### 型エラー

```bash
# 型チェック
bun astro check
# tsconfig.jsonを確認
# 必要に応じてPanda CSSを再生成
bun prepare
```
