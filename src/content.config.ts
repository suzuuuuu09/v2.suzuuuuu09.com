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
		category: z.enum(["tech", "idea", "private", "work"]).optional(),
	}),
});

const productCollection = defineCollection({
	loader: glob({ base: "./src/content/product", pattern: "**/*.md" }),
	schema: commonSchema
		.extend({
			publishDate: z.coerce.date(),
			updateDate: z.coerce.date().optional(),
			thumbnail: z.string().nullable().optional(),
			carousel: z.array(z.string()).nullable().optional(),
		})
		.refine(
			(data) => {
				const hasThumbnail = data.thumbnail != null; // null と undefined 両方除外
				const hasCarousel = data.carousel != null && data.carousel.length > 0;
				return hasThumbnail !== hasCarousel; // XOR
			},
			{
				message: "thumbnail と carousel はどちらか一方のみ指定してください",
				path: ["thumbnail"],
			},
		),
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
