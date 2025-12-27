---
title: cinii-mcp-server
author: suzu
slug: cinii-mcp-server
tags:
  - Python
  - FastMCP
thumbnail: "![[cinii-mcp-server-1766844074393.webp]]"
description: CiNiiで論文を検索するMCPサーバー
isPublish: true
publishDate: 2025-12-21T19:26
updateDate: 2025-12-27T23:02
---
## 概要
国立情報学研究所 (NII) が運営する学術論文や研究データプラットフォーム「CiNii」の検索を、AI が直接実行を可能にする MCP サーバーを構築した。

## 機能

キーワード検索だけでなく、著者名や出版社名、本文リンクがあるかなどの CiNii API が提供する様々な条件を組み合わせて調査できる。 
例えば、「2020 年から 2022 年の間に発表された量子コンピュータに関する論文」といった特定の条件の調査も、AI に指示することで簡単に見つけることができる。 
また、特定のテーマについて「どのような先行研究が行われているか」を把握したい際にも非常に有用で、手間のかかる研究調査の効率を大幅に向上させることができる。  
AI がデータベースを直接参照することで、ハルシネーションが起きる確率を大幅に下げることができる。

## 技術スタック
- **言語**: Python
- **MCP 構築**: FastMCP

## 画像・動画
![[cinii-mcp-server-1766844074393.webp]]
![[cinii-mcp-server-1765992216809.webp]]


## リンク
[GitHub - suzuuuuu09/cinii-mcp-server: CiNiiで論文を検索するMCPサーバー](https://github.com/suzuuuuu09/cinii-mcp-server)