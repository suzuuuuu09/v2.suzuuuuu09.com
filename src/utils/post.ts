import { getCollection } from "astro:content";

export async function getPosts(collection: "blog" | "award" | "product") {
	const posts = await getCollection(collection);
	return posts
		.filter((post) => post.data.isPublish)
		.sort((a, b) => {
			const dateA = "date" in a.data ? a.data.date : a.data.publishDate;
			const dateB = "date" in b.data ? b.data.date : b.data.publishDate;
			return dateB.getTime() - dateA.getTime();
		});
};

export async function getAllPosts() {
	const blogPosts = await getPosts("blog");
	const awardPosts = await getPosts("award");
	const productPosts = await getPosts("product");

	return [...blogPosts, ...awardPosts, ...productPosts].sort((a, b) => {
		const dateA = "date" in a.data ? a.data.date : a.data.publishDate;
		const dateB = "date" in b.data ? b.data.date : b.data.publishDate;
		return dateB.getTime() - dateA.getTime();
	});
}

