import { visit } from "unist-util-visit";
import { loadDefaultJapaneseParser } from "budoux";

export default function rehypeBudoux() {
	const parser = loadDefaultJapaneseParser();
	return (tree: any) => {
		visit(tree, "text", (node) => {
			if (!node.value.trim()) return;

			// BudouxでHTML文字列に変換
			const html = parser.translateHTMLString(node.value);
			
			// <span>タグの中身を抽出
			const match = html.match(/>([^<]*)<\/span>/);
			if (match && match[1]) {
				node.value = match[1];
			}
		});
	};
}

