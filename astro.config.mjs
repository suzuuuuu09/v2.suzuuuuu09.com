// @ts-check

import cloudflare from "@astrojs/cloudflare";
import partytown from "@astrojs/partytown";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import remarkCallout from "@r4ai/remark-callout";
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import remarkMath from "remark-math";
import rehypeBudoux from "./src/lib/rehype/rehype-budoux";
import rehypeCaption from "./src/lib/rehype/rehype-caption";
import remarkEmbedLinks from "./src/lib/remark/embed-links";
import remarkWikiLinks from "./src/lib/remark/remark-wiki-links";

// https://astro.build/config
export default defineConfig({
	site: "https://suzuuuuu09.com",
	output: "static",
	adapter: cloudflare(),

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
		domains: ["content.suzuuuuu09.com"],
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
