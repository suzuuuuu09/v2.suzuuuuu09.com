import type { Parent, Root, Text } from "mdast";
import { visit } from "unist-util-visit";
import type { VFile } from "vfile";
import { R2_URL } from "../../consts/base";

export default function remarkWikiLinks() {
	return (tree: Root, file: VFile) => {
		const mediaWikiLinkRegex = /!\[\[(.*?)(?:\|(.*?))?\]\]/g;
		const internalWikiLinkRegex = /(?<!!)\[\[(.*?)(?:\|(.*?))?\]\]/g;

		const rawTitle =
			(file.data.astro as { frontmatter: { title?: string } })?.frontmatter
				?.title || "assets";
		const title = rawTitle.replaceAll(" ", "_");

		visit(
			tree,
			"text",
			(node: Text, index: number | undefined, parent: Parent | undefined) => {
				if (!parent || index === undefined) return;
				if (!node.value.includes("[[")) return;

				const isMedia = node.value.includes("![[");
				const regex = isMedia ? mediaWikiLinkRegex : internalWikiLinkRegex;
				const parts: (
					| Text
					| {
							type: "html" | "link";
							value?: string;
							url?: string;
							children?: any;
					  }
				)[] = [];
				let lastIndex = 0;
				let match: RegExpExecArray | null;

				while ((match = regex.exec(node.value)) !== null) {
					if (match.index > lastIndex) {
						parts.push({
							type: "text",
							value: node.value.slice(lastIndex, match.index),
						});
					}

					const [fullMatch, path, text] = match;
					const displayText = text || path;

					if (isMedia) {
						const isVideo = /\.(mp4|webm|mov)$/i.exec(path);
						let r2Url = path.startsWith("assets/")
							? `${R2_URL}/${path}`
							: `${R2_URL}/assets/${title}/${path}`;

						if (isVideo) {
							parts.push({
								type: "html",
								value: `<video src="${r2Url}" controls width="100%"></video>`,
							});
						} else {
							// 生成したい画像幅のリスト
							const widths = [640, 1024, 1200];

							// 各サイズごとのURLを生成
							const srcset = widths
								.map((w) => {
									const params = new URLSearchParams();

									params.set("href", r2Url);
									params.set("w", w.toString()); // 幅を設定
									params.set("f", "webp"); // WebPに変換
									params.set("q", "80"); // 画質

									return `/_image?${params.toString()} ${w}w`;
								})
								.join(", ");

							// フォールバック用のメインURL（一番大きいサイズなど）
							const defaultParams = new URLSearchParams();
							defaultParams.set("href", r2Url);
							defaultParams.set("w", "1000");
							defaultParams.set("f", "webp");
							const src = `/_image?${defaultParams.toString()}`;

							parts.push({
								type: "html",
								value: `
									<img 
										src="${src}" 
										srcset="${srcset}" 
										sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px" 
										alt="${displayText}" 
										loading="lazy" 
										decoding="async" 
										style="max-width: 100%; height: auto;" 
									/>`,
							});
						}
					} else {
						// 内部リンク処理
						parts.push({
							type: "link",
							url: path,
							children: [{ type: "text", value: displayText }],
						});
					}
					lastIndex = match.index + fullMatch.length;
				}

				if (lastIndex < node.value.length) {
					parts.push({ type: "text", value: node.value.slice(lastIndex) });
				}

				if (parts.length > 0) {
					parent.children.splice(index, 1, ...(parts as any));
				}
			},
		);
	};
}
