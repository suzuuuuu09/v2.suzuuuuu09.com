# パフォーマンス最適化実装 - 2026年2月9日

## 実施した最適化

### 1. Google Tag Manager最適化（Partytown統合）

**変更ファイル**: `src/components/features/ga/GoogleAnalytics.astro`

Google AnalyticsスクリプトをWeb Workerで実行するように変更し、メインスレッドのブロッキングを削減。

```astro
<script type="text/partytown" async src="..." />
<script type="text/partytown" set:html="..." />
```

**効果**: 本番環境で23msのメインスレッド処理時間削減が期待される。

### 2. レスポンシブ画像対応（srcset生成）

**変更ファイル**: `src/lib/remark/remark-wiki-links.ts`

Markdownの`![[image.webp]]`記法で画像を挿入する際、自動的にsrcset属性を生成してレスポンシブ画像を提供。Cloudflare Image Resizingを活用。

**実装内容**:
- 7つの異なる幅（640, 750, 828, 1080, 1200, 1920, 2048px）で画像を提供
- `/cdn-cgi/image/width=X,quality=85,format=auto/` を使用
- `sizes`属性で適切なサイズを指定
- `decoding="async"`で非同期デコード

**生成されるHTML例**:
```html
<img 
  src="https://content.suzuuuuu09.com/assets/..." 
  srcset="/cdn-cgi/image/width=640,quality=85,format=auto/https://content.suzuuuuu09.com/assets/... 640w, ..." 
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  alt="..."
  loading="lazy"
  decoding="async"
/>
```

**効果**: 本番環境で106.4 kBの削減が期待される（特にcinii-mcp-server画像で82.8 kB）。

### 3. キャッシュヘッダー設定

**新規作成**: `public/_headers`

Cloudflare Pagesでのキャッシュ戦略を定義。

**設定内容**:
- 静的アセット（`/_astro/*`）: 1年間キャッシュ（immutable）
- フォント（`/fonts/*`）: 1年間キャッシュ（immutable）
- favicon: 30日間キャッシュ
- HTMLページ: 1時間キャッシュ（再検証必須）

**効果**: リピート訪問時の読み込み時間大幅短縮。

## パフォーマンス分析結果

### ローカル環境（最適化前）
- **LCP**: 326 ms
- **TTFB**: 202 ms
- **レンダー遅延**: 124 ms
- **CLS**: 0.00

### ローカル環境（最適化後）
- **LCP**: 341 ms（ほぼ同等）
- **TTFB**: 197 ms
- **レンダー遅延**: 144 ms
- **CLS**: 0.00

### 本番環境（最適化前）
- **LCP**: 454 ms
- **TTFB**: 16 ms（優秀）
- **レンダー遅延**: 438 ms（課題）
- **CLS**: 0.00（完璧）

**主な課題**:
1. 画像サイズ過剰（106.4 kB無駄）→ **srcsetで解決**
2. キャッシュTTL短い（4時間）→ **_headersで解決**
3. Google Tag Manager（149.6 kB、23ms）→ **Partytownで解決**

## 本番デプロイ後の確認事項

1. **Cloudflare Image Resizing動作確認**
   - srcsetのURLが正しく動作するか
   - 画像が適切なサイズで配信されるか
   
2. **Partytown動作確認**
   - Google Analyticsが正常に動作するか
   - コンソールエラーがないか

3. **キャッシュヘッダー確認**
   - レスポンスヘッダーにCache-Controlが含まれているか
   - 適切なTTLが設定されているか

4. **パフォーマンストレース再実施**
   - LCPが改善されているか（目標: 400ms以下）
   - 画像サイズが削減されているか
   - メインスレッド処理時間が削減されているか

## 追加推奨事項

### Cloudflare R2設定
R2バケット（content.suzuuuuu09.com）のCache-Control設定を延長:
- 画像: `public, max-age=2592000`（30日）
- または: `public, max-age=31536000`（1年）

### 今後の最適化候補
1. **クリティカルCSS抽出**: レンダーブロッキングCSS削減
2. **JavaScript最適化**: コード分割、不要なライブラリ削除
3. **フォント最適化**: サブセット化、WOFF2形式
4. **プリフェッチ**: 主要ページのプリフェッチ
