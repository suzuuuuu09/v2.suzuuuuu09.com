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
# H1 見出し
## H2 見出し
### H3 見出し
#### H4 見出し
##### H5 見出し
###### H6 見出し

## テキストスタイル

この文はテストです。**太字**や*斜体*や~~打ち消し線~~を含んでいます。

`インラインコード`もテストしましょう。
<mark>ハイライト</mark>も可能です。

> これは引用文です。  
> 複数行にわたる引用もできます。

## リスト

### 順序なしリスト
- アイテム1
- アイテム2
  - ネストされたアイテム
  - もう一つのネスト
- アイテム3

### 順序ありリスト
1. 最初のアイテム
2. 二番目のアイテム
   1. ネストされた順序リスト
   2. もう一つのネスト
3. 三番目のアイテム

### チェックリスト
- [x] 完了したタスク
- [ ] 未完了のタスク
- [x] もう一つの完了したタスク

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

| 名前 | 年齢 | 職業 |
|:------:|:------:|:------:|
| 田中太郎 | 25 | エンジニア |
| 佐藤花子 | 30 | デザイナー |
| 鈴木一郎 | 28 | PM |

## 脚注
これは脚注の例です。[^1]

## リンク

[GitHub](https://github.com)への外部リンクです。

内部リンクの例：[トップページ](/)

## 画像

![代替テキスト|700x24](https://placehold.jp/24/cc9999/993333/150x100.png)

## 区切り線

---

## 絵文字

🚀 ロケット
🎉 お祝い  
💡 アイデア
✅ チェック  
❤️ ハート
⭐️ 星

## 注意書き

> **Note**
> これは重要な注意書きです。

> **Warning**  
> これは警告メッセージです。

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

[^1]: これは脚注の内容です。