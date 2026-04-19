import type { Code, Html, Root } from "mdast";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { getFileTreeIcon } from "../../consts/icons/file-tree";

export type FileTreeIconThemeMode = "theme" | "light" | "dark";

type RemarkFileTreeOptions = {
	iconThemeMode?: FileTreeIconThemeMode;
};

const resolveIconColors = (
	lightColor: string,
	darkColor: string,
	iconThemeMode: FileTreeIconThemeMode,
) => {
	if (iconThemeMode === "light") {
		return { lightColor, darkColor: lightColor };
	}
	if (iconThemeMode === "dark") {
		return { lightColor: darkColor, darkColor };
	}
	return { lightColor, darkColor };
};

const getIconNerdFont = (
	fileName: string,
	iconThemeMode: FileTreeIconThemeMode,
	isOpenDirectory = false,
): string => {
	const icon = getFileTreeIcon(fileName, isOpenDirectory);
	const colors = resolveIconColors(
		icon.lightColor,
		icon.darkColor,
		iconThemeMode,
	);
	return `<span class="tree-icon" style="--tree-icon-light:${colors.lightColor};--tree-icon-dark:${colors.darkColor};">${icon.text}</span>`;
};

/**
 * Remarkプラグイン本体
 */
const remarkFileTree: Plugin<[RemarkFileTreeOptions?], Root> = (
	options = {},
) => {
	const iconThemeMode = options.iconThemeMode ?? "theme";

	return (tree) => {
		visit(tree, "code", (node: Code, index, parent) => {
			if (node.lang !== "tree" || typeof index !== "number" || !parent) {
				return;
			}

			const lines = node.value.trim().split("\n");

			const treeHtml = lines
				.map((line, i) => {
					// 1. プレフィックス（記号または空白）の解析
					const match = new RegExp(/^([│\s├└─\t]+)/).exec(line);
					const prefix = match ? match[0] : "";

					// 2. インデントの深さを計算
					// タブは2スペース分、記号類も適切にカウント
					const normalizedPrefix = prefix
						.replace(/\t/g, "  ")
						.replace(/──/g, "  ")
						.replace(/[│├└]/g, " ");

					// 2文字で1階層として計算
					const depth = Math.floor(normalizedPrefix.length / 2);

					const contentPart = line.replace(/^[│\s├└─\t]+/, "");
					const [namePart, ...commentParts] = contentPart.split("#");
					const comment = commentParts.join("#").trim();
					const fileName = namePart.trim();

					if (!fileName) return "";

					const isDirectory = fileName.endsWith("/");
					let isOpenDirectory = false;
					if (isDirectory) {
						const nextLine = lines[i + 1];
						if (nextLine) {
							const nextPrefixMatch = new RegExp(/^([│\s├└─\t]+)/).exec(
								nextLine,
							);
							const nextPrefix = nextPrefixMatch
								? nextPrefixMatch[0].replace(/\t/g, "  ")
								: "";
							if (nextPrefix.length > prefix.replace(/\t/g, "  ").length) {
								isOpenDirectory = true;
							}
						}
					}

					const icon = getIconNerdFont(
						fileName,
						iconThemeMode,
						isOpenDirectory,
					);
					const indentWidth = depth * 1.5;

					return `
          <div class="tree-line" style="padding-left: ${indentWidth}rem;">
            ${depth > 0 ? `<div class="tree-guide" style="left: ${indentWidth - 0.75}rem;"></div>` : ""}
            <span class="tree-icon-wrapper">${icon}</span>
            <span class="tree-name">${fileName}</span>
            ${comment ? `<span class="tree-comment"># ${comment}</span>` : ""}
          </div>
        `.trim();
				})
				.filter(Boolean)
				.join("");

			const containerHtml: Html = {
				type: "html",
				value: `
          <div class="file-tree-container">
            <div class="file-tree-header">
              <span>PROJECT STRUCTURE</span>
            </div>
            <div class="file-tree-scroll-container">
              <div class="file-tree-content">
                ${treeHtml}
              </div>
            </div>
          </div>
        `,
			};

			parent.children[index] = containerHtml;
		});
	};
};

export default remarkFileTree;
