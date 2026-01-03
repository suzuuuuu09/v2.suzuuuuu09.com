import { getCollection } from "astro:content";

export async function getBlogPosts() {
	const posts = await getCollection("blog");
	return posts
	  .filter((post) => post.data.isPublish)
		.sort((a, b) => {
			const dateA = a.data.publishDate;
			const dateB = b.data.publishDate;
			return dateB.getTime() - dateA.getTime();
		});
}

export async function getAwardPosts() {
	const posts = await getCollection("award");
	return posts
	  .filter((post) => post.data.isPublish)
		.sort((a, b) => {
			const dateA = a.data.date;
			const dateB = b.data.date;
			return dateB.getTime() - dateA.getTime();
		});
}

export async function getProductPosts() {
	const posts = await getCollection("product");
	return posts
	  .filter((post) => post.data.isPublish)
		.sort((a, b) => {
			const dateA = a.data.publishDate;
			const dateB = b.data.publishDate;
			return dateB.getTime() - dateA.getTime();
		});
}

export async function getAllPosts() {
	const blogPosts = await getBlogPosts();
	const awardPosts = await getAwardPosts();
	const productPosts = await getProductPosts();

	return [...blogPosts, ...awardPosts, ...productPosts].sort((a, b) => {
		const dateA = "date" in a.data ? a.data.date : a.data.publishDate;
		const dateB = "date" in b.data ? b.data.date : b.data.publishDate;
		return dateB.getTime() - dateA.getTime();
	});
}

