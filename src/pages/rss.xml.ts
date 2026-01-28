import { getAllPosts } from "../lib/post";
import rss, { type RSSFeedItem } from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../consts/base";

export async function GET(context: any) {
	const posts = await getAllPosts();

	const allItems: RSSFeedItem[] = posts.map((post): RSSFeedItem => {
		const collection = post.collection;
		const pubDate =
			"date" in post.data ? post.data.date : post.data.publishDate;

		return {
			title: post.data.title,
			description: post.data.description || "",
			link: `/${collection}/${post.id}/`,
			pubDate: pubDate,
			enclosure: {
				url: new URL(
					`/api/og/${collection}/${post.data.slug}.png`,
					context.site,
				).toString(),
				length: 0,
				type: "image/png",
			},
		};
	});

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: allItems,
	});
}
