// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), react()],

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
  },
});
