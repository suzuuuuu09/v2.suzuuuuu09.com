---
title: Markdownテスト記事
publishDate: 2025-08-09
updateDate: 2025-09-30
tags:
  - test
  - markdown
  - list
  - code
  - style
emoji: 📝
slug: md-test
description: Markdownの基本的な記法をテストするための記事です。スタイルなどの状態を確認することを目的としています．
category: tech
---

```markdown
# H1 見出し
## H2 見出し
### H3 見出し
#### H4 見出し
##### H5 見出し
###### H6 見出し
```

# H1 見出し
## H2 見出し
### H3 見出し
#### H4 見出し
##### H5 見出し
###### H6 見出し

基本的にはH1, H5, H6は使わないでください。

## テキストスタイル

```markdown
**太字** や *斜体* や ~~打ち消し線~~ を使います。

`インラインコード` や <mark>ハイライト</mark> も $InlineMath$ 使えます。
```

**太字** や *斜体* や ~~打ち消し線~~ を使います。
  
`インラインコード` や <mark>ハイライト</mark> も $InlineMath$ 使えます。

## リスト

```markdown
- アイテム1
- アイテム2
  - アイテム2-1
  - アイテム2-2
- アイテム3
```

- アイテム1
- アイテム2
  - アイテム2-1
  - アイテム2-2
- アイテム3

```markdown
1. アイテムA
2. アイテムB
   1. アイテムB-1
   2. アイテムB-2
3. アイテムC
```

1. アイテムA
2. アイテムB
   1. アイテムB-1
   2. アイテムB-2
3. アイテムC

```markdown
- [x] タスク1
- [ ] タスク2(未完了)
- [x] タスク3(完了)
```

- [x] タスク1
- [ ] タスク2(未完了)
- [x] タスク3(完了)

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

コードブロックの書き方はこれを参考にしてください

https://expressive-code.com

## テーブル

```markdown
|   a   | b     |   c   |     d |
| ----- | :---- | :---: | ----: |
| aaaaa | bbbbb | ccccc | ddddd |
| aaaa  | bbbb  | cccc  |  dddd |
| aaa   | bbb   |  ccc  |   ddd |
```

|   a   | b     |   c   |     d |
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

[`GitHub`](https://github.com/suzuuuuu09)への外部リンクです。
内部リンクの例：[トップページ](/)

[Zenn.dev](https://zenn.dev/)

[`Zenn.dev`](https://zenn.dev/)

## 画像

```markdown
![代替テキスト|700x24](https://placehold.jp/24/cc9999/993333/150x100.png)
```

![代替テキスト|700x24](https://placehold.jp/24/cc9999/993333/150x100.png)

## 区切り線
```markdown
---
```

---

## 絵文字

🚀 ロケット 🎉 お祝い  
💡 アイデア ✅ チェック  
❤️ ハート ⭐️ 星  
絵文字はTwemojiに置き換わります。

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

## 複雑なHTMLとの組み合わせ

<details>
<summary>詳細を表示</summary>

この部分は折りたたまれています。
**Markdown記法**も使えます。

- リストアイテム1
- リストアイテム2

</details>

## キーボードマークアップ
<kbd>Ctrl</kbd>+<kbd>C</kbd>を押すとコピーすることができます。

## リンク
https://www.youtube.com/watch?v=dQw4w9WgXcQ

