import { loadDefaultJapaneseParser } from "budoux";
import type { Root } from "hast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const rehypeBudoux: Plugin<[], Root> = () => {
	const parser = loadDefaultJapaneseParser();
	return (tree: Root) => {
		visit(tree, "text", (node, index, parent) => {
			if (!node.value.trim()) return;

			// コードブロック内のテキストはスキップ
			if (
				parent?.type === "element" &&
				(parent.tagName === "code" || parent.tagName === "pre")
			) {
				return;
			}

			// BudouxでHTML文字列に変換
			const html = parser.translateHTMLString(node.value);

			// Budouxが生成した<span>タグのみを削除
			const textOnly = html.replaceAll(/<span[^>]*>|<\/span>/g, "");

			// エスケープされた文字を元に戻す
			const decoded = textOnly
				.replaceAll("&lt;", "<")
				.replaceAll("&gt;", ">")
				.replaceAll("&amp;", "&")
				.replaceAll("&quot;", '"')
				.replaceAll("&#39;", "'");
			node.value = decoded;
		});
	};
};

export default rehypeBudoux;
