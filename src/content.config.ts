import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// blog コレクション
const blogCollection = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      author: z.string().optional(),
      description: z.string(),
      // 日付を Date オブジェクトに変換
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

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      slug: z.string().optional(),
      author: z.string().optional(),
      publishDate: z.coerce.date(),
      updateDate: z.coerce.date().optional(),
      tags: z.array(z.string()).optional(),
      thumbnail: z.string(),
    })
})

// Award コレクション
const awardCollection = defineCollection({
  loader: glob({ base: './src/content/award', pattern: '**/*.md' }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      type: z.string(),
      description: z.string(),
      date: z.coerce.date(),
    })
})

// コレクションをエクスポート
export const collections = {
  blog: blogCollection,
  award: awardCollection,
  product: productCollection,
};