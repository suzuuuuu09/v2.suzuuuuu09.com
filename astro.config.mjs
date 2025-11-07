// @ts-check
import { defineConfig } from "astro/config";
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
import remarkEmbedLinks from "./src/lib/remark/remark-embed-link";


// https://astro.build/config
export default defineConfig({
  site: "https://suzuuuuu09.com",

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
      themes: ["tokyo-night"],
      styleOverrides: {
        codeFontFamily: "var(--moralerspace-neon)",
        uiFontFamily: "var(--ibm-plex-sans-jp)",
      },
      defaultProps: {
        wrap: true,
      }
  }),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      }
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
  },

  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkWikiLinks,
      remarkCallout,
      // remarkBreaks,
      remarkEmbedLinks,
    ],
    rehypePlugins: [
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
                className: ["heading-anchor"],
              },
              children: [{ type: "text", value: hashes }],
            };
          },
        },
      ],
    ],
    remarkRehype: {
      footnoteLabelTagName: "h4",
            footnoteLabel: "脚注",
    }
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