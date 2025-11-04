# SSRモードでのRenderUndefinedEntryError 修正

## 問題
- SSRモード（`output: "server"`）に切り替えたことで、`getStaticPaths()`が実行されず、`Astro.props.entry`が渡されない
- その結果、`render(entry)`で未定義のエントリを処理しようとしてエラーが発生

## 解決方法
以下3つのファイルで、SSRモード対応の動的エントリ取得を実装：

### 1. src/pages/blog/[...slug].astro
- `getStaticPaths()`は引き続き定義（静的生成のため）
- SSRで実行時、propsが渡されない場合、`slug`パラメータからコレクション内でエントリを検索
- 見つからない、または非公開の場合は404にリダイレクト

### 2. src/pages/award/[...slug].astro
- blogと同様の対応を実施

### 3. src/pages/product/[...slug].astro
- blogと同様の対応を実施

## 修正コード例
```astro
const { slug } = Astro.params;
let entry = Astro.props.entry;

if (!entry) {
  const blogEntries = await getCollection('blog');
  const foundEntry = blogEntries.find(e => (e.data.slug ?? e.id) === slug);
  
  if (!foundEntry || !foundEntry.data.isPublish) {
    return Astro.redirect('/404');
  }
  
  entry = foundEntry;
}
```

## メリット
- SSR時でも正しくエントリをレンダリング可能
- 動的OG画像生成APIが正常に動作
- 非公開記事への直接アクセスを防止
