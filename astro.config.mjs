// @ts-check
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import expressiveCode from "astro-expressive-code";

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

  markdown: {
    rehypePlugins: [
      rehypeSlug,
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