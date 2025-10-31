// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import expressiveCode from "astro-expressive-code";

import remarkMath from "remark-math";
import remarkCallout from "@r4ai/remark-callout";
import remarkBreaks from "remark-breaks";
import remarkWikiLinks from "./src/lib/remark/remark-wiki-links";
import remarkEmbedLinks from "./src/lib/remark/remark-embed-link";
import remarkGistEmbed from "./src/lib/remark/remark-gist-embed";

import rehypeKatex from "rehype-katex";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";

// https://astro.build/config
export default defineConfig({
  site: "https://suzuuuuu09.com",
  integrations: [
    sitemap(),
    react(),
    expressiveCode({
      themes: ["tokyo-night"],
      styleOverrides: {
        codeFontFamily: "var(--moralerspace-neon)",
        uiFontFamily: "var(--ibm-plex-sans-jp)",
      }
    })
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
      remarkBreaks,
      remarkEmbedLinks,
      remarkGistEmbed,
      // remarkYoutubeEmbed
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["nofollow", "noopener", "noreferrer"],
          content: { type: "text", value: "↗" },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          content: /** @param {any} node */ (node) => {
            // headingのlevelに応じて#の数を変える
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
          group: {
            type: "element",
            tagName: "div",
            properties: {
              className: ["heading-wrapper"],
            },
            children: [],
          },
        },
      ],
    ],
    remarkRehype: {
      footnoteLabelTagName: "h4",
            footnoteLabel: "脚注",
    }
  },
});