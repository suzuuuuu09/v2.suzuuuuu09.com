// https://github.com/nasubi-dev/portfoilo-v2/blob/main/astro.config.mjs
import { R2_URL } from "../../consts/base";
import { visit } from "unist-util-visit";

// WikiLinks形式の処理プラグイン
export default function remarkWikiLinks() {
  // 画像/動画用: ![[xxx.webp]] - グループ1がパス
  const mediaWikiLinkRegex = /!\[\[(.*?)(?:\|(.*?))?\]\]/g;

  // 内部リンク用: [[xxx]] - グループ1がパス
  const internalWikiLinkRegex = /(?<!!)\[\[(.*?)(?:\|(.*?))?\]\]/g;

  return (tree: any, file: any) => {
    // frontmatterからtitleを取得し、半角スペースをアンダースコアに置き換え
    const rawTitle = file.data.astro?.frontmatter?.title || "assets";
    const title = rawTitle.replaceAll(" ", "_");
    // メディア（画像・動画）を処理
    visit(tree, "text", (node, index, parent) => {
      if (!node.value.includes("![[")) return;

      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = mediaWikiLinkRegex.exec(node.value)) !== null) {
        // マッチ前のテキスト
        if (match.index > lastIndex) {
          parts.push({
            type: "text",
            value: node.value.slice(lastIndex, match.index),
          });
        }

        // パスとテキストを抽出 - '!'は含まない
        const [fullMatch, path, text] = match;
        const displayText = text || path;

        // パス処理の改善: assets/で始まる場合もそうでない場合も処理
        let r2Url = path;

        // assets/で始まる場合はそのまま
        if (path.startsWith("assets/")) {
          r2Url = `${R2_URL}/${path}`;
        }
        // 拡張子があり、assetsで始まらない場合はassets/を前に追加
        else if (
          /\.(jpe?g|png|gif|webp|avif|svg|mp4|webm|mov)$/i.exec(path) &&
          !path.includes("/")
        ) {
          r2Url = `${R2_URL}/assets/${title}/${path}`;
        }
        // それ以外の場合（既に完全なURLの場合など）はそのまま

        if (/\.(mp4|webm|mov)$/i.exec(path)) {
          // 動画
          parts.push({
            type: "html",
            value: `<video src="${r2Url}" controls width="100%" alt="${displayText}"></video>`,
          });
        } else {
          // 画像 - 直接HTMLとして出力 ASTノードが悪さをする(原因不明)
          parts.push({
            type: "html",
            value: `<img src="${r2Url}" alt="${displayText}" loading="lazy" />`,
          });
        }

        lastIndex = match.index + fullMatch.length;
      }

      // 残りのテキスト
      if (lastIndex < node.value.length) {
        parts.push({ type: "text", value: node.value.slice(lastIndex) });
      }

      // 元のノードを置き換え
      if (parts.length > 0) {
        parent.children.splice(index, 1, ...parts);
        return (index ?? 0) + parts.length;
      }
    });

    // 内部リンクを処理
    visit(tree, "text", (node, index, parent) => {
      if (!node.value.includes("[[") || node.value.includes("![[")) return;

      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = internalWikiLinkRegex.exec(node.value)) !== null) {
        // マッチ前のテキスト
        if (match.index > lastIndex) {
          parts.push({
            type: "text",
            value: node.value.slice(lastIndex, match.index),
          });
        }

        // パスとテキストを抽出
        const [, path, text] = match;
        const displayText = text || path;

        // 内部リンク
        parts.push({
          type: "link",
          url: path,
          children: [{ type: "text", value: displayText }],
        });

        lastIndex = match.index + match[0].length;
      }

      // 残りのテキスト
      if (lastIndex < node.value.length) {
        parts.push({ type: "text", value: node.value.slice(lastIndex) });
      }

      // 元のノードを置き換え
      if (parts.length > 0) {
        parent.children.splice(index, 1, ...parts);
        if (index !== null) return;
        return index + parts.length;
      }
    });
  };
}
