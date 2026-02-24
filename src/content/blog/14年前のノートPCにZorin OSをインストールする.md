---
title: 14年前のノートPCにZorin OSをインストールする
slug: install-zorion-os-laptop
author: suzu
emoji: 💻
description: 14年前のノートPCにZorin OSをインストールしてPCを復活させる。
category: tech
tags:
  - Linux
  - ZorinOS
isPublish: true
publishDate: 2026-02-19T00:49
updateDate: 2026-02-24T13:25
---
## 概要
使わなくなったノート PC が家に眠っていたので、Windows からの移行先として有名で軽量な Zorin OS を入れてみました。

PC に貼っていたシールに 2012 年モデルと記載が...あれ？今って 2026 年だよね？

![[14年前のノートPCにZorin OSをインストールする-1771907130231.webp]]

そんな冗談はさておき、とりあえず入れてこうと思います。

## 環境

| 項目  | 構成                  |
| --- | ------------------- |
| OS  | Windows 10 (移行前)    |
| CPU | Intel Core i3-2350M |
| GPU | CPU 内蔵              |
| RAM | 8GB                 |
| HDD | 640GB               |

## 必要なもの

- USB メモリ 32GB （16GB 以上あった方がいいかも？）
[高速USB3.0メモリ(スライドタイプ) \| エレコムダイレクトショップ本店はPC周辺機器メーカー「ELECOM」の直営通販サイト](https://shop.elecom.co.jp/category/32GB/4953103306622.html)
- インストールするノート PC
- USB メモリに ISO を焼くための Windows
- [`Rufus`](https://rufus.ie/ja/)

インストールする PC が普通に動くなら、その PC で ISO を焼いてもらって OK です。今回インストールするノート PC が重すぎて、ブラウザすら開くのが難しい状況だったので別の Windows で作業しました。  
Rufus は USB メモリに Zorin OS の ISO を焼くために使いました。

## 手順

### 1. USB メモリに ISO を焼く
[`Zorin OSの公式サイト`](https://zorin.com/os/) から ISO をダウンロードします。
ダウンロードした ISO を [`Rufus`](https://rufus.ie/ja/) を使って USB メモリに焼きます。今回は、無料版の Core でやりました。

### 2. ノート PC の起動
先程焼いた USB メモリをノート PC に挿して PC を起動させます。PC を起動するときに、<kbd>F2</kbd>キーを連打して BIOS に入ります。ちなみに私はここで上手くいかなくて 3 回くらいやり直しました。BIOS に入ったら、ブート優先順位を USB が一番上になるようにして保存して終了します。  
\
PC が起動するときに、いくつか項目が出るのでそこで「Try or Install Zorin OS」にカーソルを合わせて<kbd>Enter</kbd>キーを押して起動させます。  
起動したら、「Install Zorin OS」を押します。インストールをせずに「Try Zorin OS」で一度試すこともできます。

> [!WARNING]
> 「Install Zorin OS」を押すと、ドキュメントや写真などの保存していたデータがすべて削除されるのでバックアップを取ってから行ってください。


![[使わなくなったノートPCにZorinOSをインストールする-1771407649888.webp]]


あとは言語の設定やネットワークの設定を指示に従って順番にやっていけば OK です。

## 使用感
実際に使ってみてかなり驚きました。Windows ではブラウザすらまともに起動できなかったのにブラウジングがある程度できるようになりました。また、Windows では起動直後から 3GB 程度メモリを占有されますが、Zorin OS では 1GB 前後とかなり抑えられるのも良いです。

## おわりに
無事 Zorin OS をインストールすることができました。やっぱり元々 Windows を使っていた人をターゲットにしているだけあって、UI も直感的でインストールも非常にスムーズでした。日本語入力も難しい設定がなく簡単に使うことが出来ました。この PC を何に使うかはまだ考えていないので、これから考えていきたいです。  


![[使わなくなったノートPCにZorinOSをインストールする-1771416237971.webp]]
*[!image] いつもの Fastfetch*
