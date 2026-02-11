// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import expressiveCode from "astro-expressive-code";

import remarkMath from "remark-math";
import remarkCallout from "@r4ai/remark-callout";
import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";

import remarkWikiLinks from "./src/lib/remark/remark-wiki-links";
// import remarkFileTree from "./src/lib/remark/remark-file-tree";
// import remarkEmbedLinks from "./src/lib/remark/remark-embed-link";
import remarkEmbedLinks from "./src/lib/remark/embed-links";
import rehypeCaption from "./src/lib/rehype/rehype-caption";
import rehypeBudoux from "./src/lib/rehype/rehype-budoux";

// https://astro.build/config
export default defineConfig({
	site: "https://suzuuuuu09.com",
	output: "static",
	adapter: cloudflare({
		imageService: "compile",
	}),

	integrations: [
		sitemap({
			i18n: {
				defaultLocale: "ja",
				locales: {
					ja: "ja-JP",
				},
			},
		}),
		react(),
		expressiveCode({
			themes: ["catppuccin-latte", "catppuccin-mocha"],
			customizeTheme: (theme) => {
				// テーマのtypeに応じてnameを設定
				theme.name = theme.type;
			},
			styleOverrides: {
				codeFontFamily: "var(--moralerspace-neon)",
				uiFontFamily: "var(--ibm-plex-sans-jp)",
				codeFontSize: "0.95rem",
				uiFontSize: "1rem",
			},
			defaultProps: {
				wrap: false,
			},
		}),
		partytown({
			config: {
				forward: ["dataLayer.push"],
			},
		}),
	],

	image: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "content.suzuuuuu09.com",
				port: "",
				pathname: "/**",
			},
		],
		service: {
			entrypoint: "astro/assets/services/sharp",
		},
	},

	markdown: {
		remarkPlugins: [
			// remarkFileTree,
			remarkMath,
			remarkWikiLinks,
			remarkCallout,
			remarkEmbedLinks,
		],
		rehypePlugins: [
			rehypeCaption,
			rehypeBudoux,
			rehypeKatex,
			rehypeSlug,
			[
				rehypeExternalLinks,
				{
					target: "_blank",
					rel: ["nofollow", "noopener", "noreferrer"],
					content: { type: "text", value: "↗️" },
				},
			],
			[
				rehypeAutolinkHeadings,
				{
					behavior: "prepend",
					content: /** @param {any} node */ (node) => {
						// headingのlevelに応じて#の数を変える
						// h1 から h6 まで対応
						const level = Number.parseInt(node.tagName.substring(1), 7);
						const hashes = "#".repeat(level);

						return {
							type: "element",
							tagName: "span",
							properties: {
								className: [`heading-anchor heading-${level}`],
							},
							children: [{ type: "text", value: hashes }],
						};
					},
					properties: {
						className: ["heading-anchor-container"],
					},
				},
			],
		],
		remarkRehype: {
			footnoteLabelTagName: "h4",
			footnoteLabel: "脚注",
		},
	},
	vite: {
		ssr: {
			external: ["@resvg/resvg-js"],
		},
		optimizeDeps: {
			exclude: ["@resvg/resvg-js"],
		},
	},
});
