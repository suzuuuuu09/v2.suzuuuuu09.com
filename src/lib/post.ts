import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

type BlogEntry = CollectionEntry<"blog"> & { collection: "blog" };
type AwardEntry = CollectionEntry<"award"> & { collection: "award" };
type ProductEntry = CollectionEntry<"product"> & { collection: "product" };

export type AllPost = BlogEntry | AwardEntry | ProductEntry;

export async function getBlogPosts(): Promise<BlogEntry[]> {
	const posts = await getCollection("blog");
	return posts
		.filter((post) => post.data.isPublish)
		.sort((a, b) => {
			const dateA = a.data.publishDate;
			const dateB = b.data.publishDate;
			return dateB.getTime() - dateA.getTime();
		})
		.map((p) => ({ ...p, collection: "blog" as const }));
}

export async function getAwardPosts(): Promise<AwardEntry[]> {
	const posts = await getCollection("award");
	return posts
		.filter((post) => post.data.isPublish)
		.sort((a, b) => {
			const dateA = a.data.date;
			const dateB = b.data.date;
			return dateB.getTime() - dateA.getTime();
		})
		.map((p) => ({ ...p, collection: "award" as const }));
}

export async function getProductPosts(): Promise<ProductEntry[]> {
	const posts = await getCollection("product");
	return posts
		.filter((post) => post.data.isPublish)
		.sort((a, b) => {
			const dateA = a.data.publishDate;
			const dateB = b.data.publishDate;
			return dateB.getTime() - dateA.getTime();
		})
		.map((p) => ({ ...p, collection: "product" as const }));
}

/**
 * @returns すべてのpostを取得する
 */
export async function getAllPosts(): Promise<AllPost[]> {
	const blogPosts = await getBlogPosts();
	const awardPosts = await getAwardPosts();
	const productPosts = await getProductPosts();

	return [...blogPosts, ...awardPosts, ...productPosts].sort((a, b) => {
		const dateA = "date" in a.data ? a.data.date : a.data.publishDate;
		const dateB = "date" in b.data ? b.data.date : b.data.publishDate;
		return dateB.getTime() - dateA.getTime();
	});
}
