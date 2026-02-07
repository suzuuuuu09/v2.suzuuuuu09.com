import { visit } from "unist-util-visit";
import { loadDefaultJapaneseParser } from "budoux";

export default function rehypeBudoux() {
  const parser = loadDefaultJapaneseParser();
  return (tree: any) => {
    visit(tree, "text", (node, index, parent) => {
      if (!node.value.trim()) return;

      // コードブロック内のテキストはスキップ
      if (parent && (parent.tagName === "code" || parent.tagName === "pre")) {
        return;
      }

      // BudouxでHTML文字列に変換
      const html = parser.translateHTMLString(node.value);

      // Budouxが生成した<span>タグのみを削除
      const textOnly = html.replace(/<span[^>]*>|<\/span>/g, "");

      // エスケープされた文字を元に戻す
      const decoded = textOnly
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
      node.value = decoded;
    });
  };
}
