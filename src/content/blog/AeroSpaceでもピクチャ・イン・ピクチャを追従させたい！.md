---
title: AeroSpaceでもピクチャ・イン・ピクチャを追従させたい！
slug: aerospace-how-to-follow-pip
author: suzu
emoji: 🛸
description: AeroSpaceでワークスペースを切り替えた際に、YouTube等のPiPウィンドウを自動追従させる設定方法を紹介する。
category: tech
tags:
  - AeroSpace
isPublish: true
publishDate: 2026-04-26T00:46
updateDate: 2026-04-26T02:13
---
## はじめに
私は MacOS のタイル型ウィンドウマネージャーに [`AeroSpace`](https://nikitabobko.github.io/AeroSpace/guide) を使っています。非常に便利なツールですが、一つだけ不満がありました。それは、YouTube 等のアプリでピクチャー・イン・ピクチャー (PiP) を使用してワークスペースを切り替えると、PiP ウィンドウが元のワークスペースに取り残されてしまうことです。  
\
なので、今回はそれを改善していけたらなと思います。
## 環境

```text
MacBook Air
チップ: Apple M3
macOS: macOS Sequpia 15.5
ブラウザ: Vivaldi
```

## やり方
### 1. PiP ウィンドウ名を確認

ブラウザや環境によって PiP のウィンドウのタイトル (window-title) が異なります。ブラウザの PiP を開いた状態で以下のコマンドを実行し、自分の環境でのウィンドウ名を確認してください。
```bash
aerospace list-windows --all --format "%{app-name} | %{window-title}"
```


実行結果の例:
```text
Finder | Documents
Vivaldi | ピクチャーインピクチャー
```

私の環境では、「ピクチャーインピクチャー」でした。移行はこの名前で進めるので、もし別のタイトルでしたら、下記のものを置き換えてください。
### 2. workspace change のフックを設定
`aerospace.toml` に、ワークスペースを切り替えたときにスクリプトを実行する設定を記述します。

```toml title=aerospace.toml
exec-on-workspace-change = [
  '/bin/bash',
  '-c',
  '~/.config/aerospace/pip-follow.sh',
]
```

### 3. PiP 追従スクリプトの作成
次に `~/.config/aerospace/pip-follow.sh` にシェルスクリプトを作成します。ウィンドウを移動させるものです。

```tree
~/.config/aerospace/
	aerospace.toml
	pip-follow.sh     # ← 新しく作成
```

```bash title=~/.config/aerospace/pip-follow.sh
#!/bin/bash
# 現在のフォーカスしているワークスペース名を取得
current_workspace=$(aerospace list-workspaces --focused)

# 特定のタイトルを持つウィンドウを探し、現在のワークスペースに召喚する
aerospace list-windows --all | grep "ピクチャーインピクチャー" | awk '{print $1}' | while read window_id; do
  if [ -n "$window_id" ]; then
    aerospace move-node-to-workspace --window-id "$window_id" "$current_workspace"
  fi
done
```

スクリプトを作成したら、実行権限を与えておきましょう。
```bash
chmod +x ~/.config/aerospace/pip-follow.sh
```

## 補足
PiP ウィンドウがタイルとして分割されると使い勝手が悪いため、 `on-window-detected` で常にフローティング表示する設定を併用しておくと使いやすくなるのでオススメです。

```toml
[[on-window-detected]]
if.app-id = 'om.vivaldi.Vivaldi' # 各自のブラウザIDに置き換えてください。
if.window-title-regex-substring = "ピクチャーインピクチャー"
run = ['layout floating']
```

## おわりに
以上、AeroSpace の PiP を自動追従させる方法でした。
