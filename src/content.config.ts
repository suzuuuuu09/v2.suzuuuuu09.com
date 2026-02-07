import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// 共通のスキーマ
const commonSchema = z.object({
  title: z.string(),
  author: z.string().optional(),
  slug: z.string(),
  tags: z.preprocess((val) => val ?? [], z.array(z.string())),
  description: z.string().nullable().default(""),
  isPublish: z.boolean().default(false),
});

const blogCollection = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: commonSchema.extend({
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    emoji: z.string().optional(),
    category: z.string().optional(),
  }),
});

const productCollection = defineCollection({
  loader: glob({ base: "./src/content/product", pattern: "**/*.md" }),
  schema: commonSchema.extend({
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    thumbnail: z.string(),
  }),
});

const awardCollection = defineCollection({
  loader: glob({ base: "./src/content/award", pattern: "**/*.md" }),
  schema: commonSchema.extend({
    type: z.string(),
    date: z.coerce.date(), // 受賞日または開催日
  }),
});

// コレクションを保存
export const collections = {
  blog: blogCollection,
  award: awardCollection,
  product: productCollection,
};
