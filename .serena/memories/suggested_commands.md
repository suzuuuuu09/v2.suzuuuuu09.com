# 開発コマンド

## パッケージマネージャー
このプロジェクトは **Bun** を使用しています。

## 主要コマンド

### 依存関係のインストール
```bash
bun install
```

### 開発サーバーの起動
```bash
bun dev
# または
nr dev
```
- ローカル開発サーバーが `localhost:4321` で起動します

### ビルド
```bash
bun build
```
- プロダクションビルドが `./dist/` に生成されます

### プレビュー
```bash
bun preview
```
- ビルドしたサイトをローカルでプレビューします

### Panda CSSコード生成
```bash
bun prepare
# または
panda codegen
```
- Panda CSSの型定義とユーティリティを `styled-system/` に生成します
- 新しいスタイルを追加した際は必ず実行してください

### Astro CLI
```bash
bun astro [command]
# 例: bun astro add
# 例: bun astro check
```

## その他の便利なコマンド

### ヘルプの表示
```bash
bun astro -- --help
```

## システムコマンド (macOS/Darwin)

### ファイル操作
- `ls -la`: ファイル一覧表示
- `cd [directory]`: ディレクトリ移動
- `mkdir [name]`: ディレクトリ作成
- `rm [file]`: ファイル削除
- `rm -rf [directory]`: ディレクトリ削除

### 検索
- `grep -r "pattern" .`: パターン検索
- `find . -name "*.astro"`: ファイル名で検索

### Git操作
- `git status`: 変更状態確認
- `git add .`: 変更をステージング
- `git commit -m "message"`: コミット
- `git push`: リモートにプッシュ
- `git pull`: リモートから取得
