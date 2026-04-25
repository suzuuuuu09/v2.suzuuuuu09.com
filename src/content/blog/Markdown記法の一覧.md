---
title: Markdown記法の一覧
tags:
  - Markdown
emoji: 📝
slug: markdown-guide
description: このブログ内で使えるMarkdown記法をまとめる。
category: tech
isPublish: true
publishDate: 2025-08-09
updateDate: 2026-04-25T21:27
---

# H1 見出し

## H2 見出し

### H3 見出し

#### H4 見出し

##### H5 見出し

###### H6 見出し

```markdown
# H1 見出し

## H2 見出し

### H3 見出し

#### H4 見出し

##### H5 見出し

###### H6 見出し
```

基本的には H1, H5, H6 は使わないでください。

## テキストスタイル

```markdown
**太字** や _斜体_ や ~~打ち消し線~~ を使います。

`インラインコード` や <mark>ハイライト</mark> も $InlineMath$ 使えます。
```

**太字** や _斜体_ や ~~打ち消し線~~ を使います。

`インラインコード` や <mark>ハイライト</mark> も $InlineMath$ 使えます。

## リスト

```markdown
- アイテム1
- アイテム2
  - アイテム2-1
  - アイテム2-2
- アイテム3
```

- アイテム 1
- アイテム 2
  - アイテム 2-1
  - アイテム 2-2
- アイテム 3

```markdown
1. アイテムA
2. アイテムB
   1. アイテムB-1
   2. アイテムB-2
3. アイテムC
```

1. アイテム A
2. アイテム B
   1. アイテム B-1
   2. アイテム B-2
3. アイテム C

```markdown
- [x] タスク1
- [ ] タスク2(未完了)
- [x] タスク3(完了)
```

- [x] タスク 1
- [ ] タスク 2(未完了)
- [x] タスク 3(完了)

## コードブロック

```python title="hello.py" ins={2} del={3} {6}
def hello_world():
    print("Hello, World!")
    print("こんにちは、世界！")

if __name__ == "__main__":
    hello_world()
```

```diff lang="python"
+print("Hello, World!")
-print("こんにちは、世界！")
```

```bash title="Bash terminal example"
echo "Hello, World!"
```

コードブロックの書き方は Expressive Code のドキュメントを参考にしてください。

https://expressive-code.com

## テーブル

```markdown
_[!table]テーブルの例_
| a | b | c | d |
| ----- | :---- | :---: | ----: |
| aaaaa | bbbbb | ccccc | ddddd |
| aaaa | bbbb | cccc | dddd |
| aaa | bbb | ccc | ddd |
```

_[!table] テーブルの例_

| a     | b     |   c   |     d |
| ----- | :---- | :---: | ----: |
| aaaaa | bbbbb | ccccc | ddddd |
| aaaa  | bbbb  | cccc  |  dddd |
| aaa   | bbb   |  ccc  |   ddd |

## 脚注

```markdown
これは脚注の例です。[^1]
[^1]: これは脚注の内容です。
```

これは脚注の例です。[^1]
[^1]: これは脚注の内容です。

## リンク

```markdown
[`GitHub`](https://github.com/suzuuuuu09)への外部リンクです。
内部リンクの例：[トップページ](/)

[Zenn.dev](https://zenn.dev/)

[`Zenn.dev`](https://zenn.dev/)
```

[`GitHub`](https://github.com/suzuuuuu09) への外部リンクです。
内部リンクの例：[トップページ](/)

[Zenn.dev](https://zenn.dev/)

[`Zenn.dev`](https://zenn.dev/)

## 画像

```markdown
![代替テキスト](https://placehold.jp/24/cc9999/993333/150x100.png)
_[!image] 画像の例_
```

![代替テキスト](https://placehold.jp/24/cc9999/993333/150x100.png)
_[!image] 画像の例_

## 区切り線

```markdown
---
```

---

## 絵文字

🚀 ロケット 🎉 お祝い  
💡 アイデア ✅ チェック  
❤️ ハート ⭐️ 星  
絵文字は Twemoji に置き換わります。

## 数式

```markdown
$\KaTeX$ を使用した数式が使えます。
```

$\KaTeX$ を使用した数式が使えます。

https://katex.org

https://github.com/remarkjs/remark-math

### インライン数式

```markdown
$E = mc^2$ などのインライン数式も使えます。
```

$E = mc^2$ などのインライン数式も使えます。

### ブロック数式

```markdown
$$
\int_a^b f(x) \,dx = F(b) - F(a)
$$

のようなブロック数式を使うこともできます。
```

$$
\int_a^b f(x) \,dx = F(b) - F(a)
$$

のようなブロック数式を使うこともできます。

## コールアウト

コールアウトの実装には以下のライブラリを使用しています。

https://github.com/r4ai/remark-callout

<details>
<summary>利用可能なコールアウト一覧</summary>

> [!note]
> Lorem ipsum dolor sit amet

> [!abstract]
> Lorem ipsum dolor sit amet

> [!summary]
> Lorem ipsum dolor sit amet

> [!tldr]
> Lorem ipsum dolor sit amet

> [!info]
> Lorem ipsum dolor sit amet

> [!todo]
> Lorem ipsum dolor sit amet

> [!tip]
> Lorem ipsum dolor sit amet

> [!hint]
> Lorem ipsum dolor sit amet

> [!important]
> Lorem ipsum dolor sit amet

> [!success]
> Lorem ipsum dolor sit amet

> [!check]
> Lorem ipsum dolor sit amet

> [!done]
> Lorem ipsum dolor sit amet

> [!question]
> Lorem ipsum dolor sit amet

> [!help]
> Lorem ipsum dolor sit amet

> [!faq]
> Lorem ipsum dolor sit amet

> [!warning]
> Lorem ipsum dolor sit amet

> [!caution]
> Lorem ipsum dolor sit amet

> [!attention]
> Lorem ipsum dolor sit amet

> [!failure]
> Lorem ipsum dolor sit amet

> [!fail]
> Lorem ipsum dolor sit amet

> [!missing]
> Lorem ipsum dolor sit amet

> [!danger]
> Lorem ipsum dolor sit amet

> [!error]
> Lorem ipsum dolor sit amet

> [!bug]
> Lorem ipsum dolor sit amet

> [!example]
> Lorem ipsum dolor sit amet

> [!quote]
> Lorem ipsum dolor sit amet

> [!cite]
> Lorem ipsum dolor sit amet

</details>

## 折りたたみ

```markdown
<details>
<summary>詳細を表示</summary>

この部分は折りたたまれています。
**Markdown記法**も使えます。

- リストアイテム1
- リストアイテム2

</details>
```

<details>
<summary>詳細を表示</summary>

この部分は折りたたまれています。
**Markdown 記法**も使えます。

- リストアイテム 1
- リストアイテム 2

</details>

## キーボードマークアップ

```markdown
Windowsでは <kbd>Ctrl</kbd> + <kbd>C</kbd> を押すとコピーすることができます。
macOSでは <kbd>⌘</kbd> + <kbd>C</kbd> を押すとコピーすることができます。
```

Windows では <kbd>Ctrl</kbd> + <kbd>C</kbd> を押すとコピーすることができます。  
macOS では <kbd>⌘</kbd> + <kbd>C</kbd> を押すとコピーすることができます。

## ファイルツリー

````markdown
```tree
src/pages/
├─ award/
│   └─ [...slug].txt   # コメントも書けます
├─ blog/
│   └─ [...slug].json
└─ product/
    ├─ [...slug].astro
    ├─ [...slug].ts
    ├─ index.js
    ├─ example.py
    └─ page.tsx
    ├─ package.json
    ├─ tsconfig.json
```
````





```tree
src/pages/
├─ award/
│   └─ [...slug].txt   # コメントも書けます
├─ blog/
│   └─ [...slug].json
└─ product/
    ├─ [...slug].astro
    ├─ [...slug].ts
    ├─ index.js
    ├─ example.py
    └─ page.tsx
    ├─ package.json
    ├─ tsconfig.json
```

````markdown
```tree
.direnv/
src/
	typst/
		main.typ
	java/
		HelloWorld.java
flake.nix
flake.lock
.direnv
.gitignore
```
````

```tree
.direnv/
src/
	typst/
		main.typ
	java/
		HelloWorld.java
flake.nix
flake.lock
.direnv
.gitignore
```

## 埋め込み

### YouTube

```markdown
<!-- Youtubeの動画 -->
https://youtu.be/zczjerfFrSI

<!-- YoutubeMusicの動画 -->
https://music.youtube.com/watch?v=GFHtlz-wqW4&si=bSsSOvCo8iPfB7jA

<!-- Youtubeのチャンネル -->
https://www.youtube.com/@HikakinTV

<!-- YoutubeMusicのチャンネル -->
https://music.youtube.com/channel/UC_fYA9QRK-aJnFTgvR_4zug
```

https://youtu.be/zczjerfFrSI

https://music.youtube.com/watch?v=GFHtlz-wqW4&si=bSsSOvCo8iPfB7jA

https://www.youtube.com/@HikakinTV

https://music.youtube.com/channel/UCRjVmUQ3CW1kH6vP1VGskWA?si=tMEmi_2_ZvECUUKh

### GitHub

```markdown
<!-- ユーザー -->
https://github.com/suzuuuuu09

<!-- リポジトリ -->
https://github.com/suzuuuuu09/suzuuuuu09

<!-- Github Gistを埋め込む際はscriptタグのembedを使わずにshareでURLをコピーして使用してね -->
https://gist.github.com/suzuuuuu09/966dafbb70727684f28a73c0b80f00a4
```

https://github.com/suzuuuuu09

https://github.com/suzuuuuu09/suzuuuuu09

https://gist.github.com/suzuuuuu09/966dafbb70727684f28a73c0b80f00a4

### Codepen

```markdown
<!-- 右下のshareからURLをコピーしてください -->
https://codepen.io/suzuuuuu09/pen/ZYQqJaJ
```

https://codepen.io/suzuuuuu09/pen/ZYQqJaJ

### Zenn

```markdown
https://zenn.dev/aki_think/articles/c4f5b2a75ff4d4
```

https://zenn.dev/aki_think/articles/c4f5b2a75ff4d4

### Qiita

```md
https://qiita.com/Qiita/items/c686397e4a0f4f11683d
```

https://qiita.com/Qiita/items/c686397e4a0f4f11683d

### Note

```markdown
https://note.com/notemag/n/n0e4bc242c5b6
```

https://note.com/notemag/n/n0e4bc242c5b6

### はてなブログ

```markdown
https://staff.hatenablog.com/entry/2026/01/28/122303
```

https://staff.hatenablog.com/entry/2026/01/28/122303

### X(Twitter)

```markdown
<!-- プロフィール -->
https://x.com/suzuuuuu_09

<!-- ツイート -->
https://twitter.com/suzuuuuu_09/status/1900561016435487007
```

https://twitter.com/suzuuuuu_09

https://twitter.com/suzuuuuu_09/status/1900561016435487007

### Reddit

```markdown
https://www.reddit.com/r/neovim/comments/1ppa4ag/nvimtreesitter_breaking_changes/
```

https://www.reddit.com/r/neovim/comments/1ppa4ag/nvimtreesitter_breaking_changes/

### Google スライド

```md
https://docs.google.com/presentation/d/e/2PACX-1vQJzjtiJ0C-Ngylgck6lNzYZ2kW_FAKZDlGAhUL-aQxTf3If9QMYl8jes_QEoe6hoinu5t4B6Rg7aDq/pub
```

https://docs.google.com/presentation/d/e/2PACX-1vQJzjtiJ0C-Ngylgck6lNzYZ2kW_FAKZDlGAhUL-aQxTf3If9QMYl8jes_QEoe6hoinu5t4B6Rg7aDq/pub

### Speaker Deck

```markdown
https://speakerdeck.com/suzuuuuu09/matsusupo
```

https://speakerdeck.com/suzuuuuu09/matsusupo

### Spotify

```markdown
<!-- Spotifyのトラック -->
https://open.spotify.com/intl-ja/track/5NxmDq0yXBYGfCbMqvIXuv?si=ba8cb6a2448e4ded

<!-- Spotifyのアーティスト -->
https://open.spotify.com/intl-ja/artist/3wCJxpjgYDXbwLn4vmSBEx?si=8i7_ZyROQG-TakyKrWZGQw
```

https://open.spotify.com/intl-ja/track/5NxmDq0yXBYGfCbMqvIXuv?si=ba8cb6a2448e4ded

https://open.spotify.com/intl-ja/artist/3wCJxpjgYDXbwLn4vmSBEx?si=8i7_ZyROQG-TakyKrWZGQw

### Soundcloud

```markdown
https://soundcloud.com/bei-dou-515365507/mega-tskr-ft-camellia-ft
```

https://soundcloud.com/bei-dou-515365507/mega-tskr-ft-camellia-ft
