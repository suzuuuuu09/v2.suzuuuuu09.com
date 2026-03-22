import type { Element, Root } from "hast";
import type { Plugin } from "unified";
import type { Parent } from "unist";
import { visit } from "unist-util-visit";

type CaptionType = "image" | "video" | "table";

const rehypeCaption: Plugin<[], Root> = () => {
	return (tree: Root) => {
		visit(
			tree,
			"element",
			(
				node: Element,
				index: number | undefined,
				parent: Parent | undefined,
			) => {
				// <em>[!image]text</em> か <em>[!table]text</em> <em>[!video]text</em>を探す
				if (
					node.tagName !== "em" ||
					!node.children ||
					node.children.length === 0
				) {
					return;
				}

				// emタグの中身がテキストノードのみかチェックする
				const textNode = node.children[0];
				if (textNode.type !== "text" || !textNode.value) {
					return;
				}

				const captionRegex = /\[!(image|video|table)\]\s*(.*)$/;
				const match = captionRegex.exec(textNode.value.trim());

				if (!match) {
					return;
				}

				const type = match[1] as CaptionType; // image か table
				const text = match[2].trim();

				// mdiアイコン
				const iconSvg = mdiIcon(type);

				// <div class="caption"><svg>...</svg><span>text</span></div> に置き換え
				const captionNode = {
					type: "element",
					tagName: "figcaption",
					properties: { className: [`caption caption-${type}`] },
					children: [
						{
							type: "raw",
							value: iconSvg,
						},
						{
							type: "element",
							tagName: "span",
							properties: {},
							children: [{ type: "text", value: text }],
						},
					],
				};

				if (index !== undefined && parent) {
					parent.children[index] = captionNode;
				}
			},
		);
	};
};

export default rehypeCaption;

export function mdiIcon(type: CaptionType): string {
	const icons: Record<CaptionType, string> = {
		image: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM5 19v-4l3.5-4.5L12 15l4.5-6L19 11v8H5z"/></svg>`,
		video: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4z"/></svg>`,
		table: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM7 19H5v-4h2v4zm0-6H5v-4h2v4zm0-6H5V5h2v2zm4 12h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2V5h2v2zm4 12h-2v-4h2v4zm0-6h-2v-4h2v4zm0-6h-2V5h2v2z"/></svg>`,
	};
	return icons[type];
}
