# OG画像生成実装状況 - 2025年11月4日

## 現在の問題

### 1. ファイル破損状態

- **src/utils/imageGenerator.ts**: 完全に破損（重複インポート、構文エラー）
  - ファイルサイズ: 21KB（異常に大きい）
  - 原因: 複数回の編集で重複内容が積み重なった

- **src/components/OgImage.tsx**: 部分的に破損
  - `export const export default function` という構文エラー
  - 古いコード（装飾要素）と新しいコード（タイトルのみ）が混在

- **src/pages/api/og.ts**: 正常に見える（確認が必要）

### 2. ビルド状態

- 最後のビルド試行: 失敗
- エラー内容: Unexpected token やら構文エラー

### 3. ユーザーの要件

- シンプルな実装を希望
- 機能: 画像にタイトルを載せるだけ
- フォント: public/fonts/IBMPlexSansJP-Regular.ttf と IBMPlexSansJP-Bold.ttf
- 使用ライブラリ: Satori, Sharp, @resvg/resvg-js

### 4. 既存ファイル一覧

- public/fonts/:
  - IBMPlexSansJP-Bold.ttf ✓
  - IBMPlexSansJP-Regular.ttf ✓
  - MoralerspaceNeon-Regular.ttf

## 必要なアクション

### 優先度1（重大）

1. [ ] src/utils/imageGenerator.ts を完全に新しく作成
   - 破損ファイルを削除 → 新規作成
   - 関数: loadFonts(), generateSvg(), convertSvgToImage(), generateOgImage(), getContentType()

2. [ ] src/components/OgImage.tsx を修正
   - export構文のバグ修正
   - 装飾要素を削除してシンプルに（タイトルのみ）

### 優先度2

3. [ ] src/pages/api/og.ts の確認・修正（必要に応じて）

4. [ ] ビルド確認
   - `bun run build` で成功確認

5. [ ] 開発サーバーテスト
   - `bun run dev` で http://localhost:3000/api/og?title=テスト&type=blog にアクセス

## ファイル作成スクリプト（参考）

最簡単な修正方法:

1. `rm -f src/utils/imageGenerator.ts`
2. `cat > src/utils/imageGenerator.ts << 'EOF'` でファイルを直接作成
3. OgImage.tsx も同様に新規作成

## 次のステップ

- ユーザーの指示待ち
- ファイルを1つずつ確認して新規作成する必要あり
