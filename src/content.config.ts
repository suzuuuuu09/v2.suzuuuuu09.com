import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 共通のスキーマ
const commonSchema = z.object({
  title: z.string(),
  author: z.string().optional(),
  slug: z.string(),
  description: z.string().nullable().default(""),
  isPublish: z.boolean().default(false),
})

// blog コレクション
const blogCollection = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: commonSchema.extend({
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    emoji: z.string().optional(),
    category: z.string().optional(),
  }),
});

// product コレクション
const productCollection = defineCollection({
  loader: glob({ base: './src/content/product', pattern: '**/*.md' }),
  schema: commonSchema.extend({
    publishDate: z.coerce.date(),
    updateDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string(),
  }),
})

// Award コレクション
const awardCollection = defineCollection({
  loader: glob({ base: './src/content/award', pattern: '**/*.md' }),
  schema: commonSchema.extend({
    type: z.string(),
    date: z.coerce.date(), // 受賞日または開催日
  }),
})

// コレクションをエクスポート
export const collections = {
  blog: blogCollection,
  award: awardCollection,
  product: productCollection,
};