import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts/base';

export async function GET(context: any) {
	const blog = await getCollection('blog', (post) => post.data.isPublish);
	const product = await getCollection('product', (post) => post.data.isPublish);
	const award = await getCollection('award', (post) => post.data.isPublish);

	const allItems = [
		...blog.map((post) => {
			const item: any = {
				...post.data,
				link: `/blog/${post.id}/`,
				pubDate: post.data.publishDate,
			};
			if (item.description === null) delete item.description;
			return item;
		}),
		...product.map((post) => {
			const item: any = {
				...post.data,
				link: `/product/${post.id}/`,
				pubDate: post.data.publishDate,
			};
			if (item.description === null) delete item.description;
			return item;
		}),
		...award.map((post) => {
			const item: any = {
				...post.data,
				link: `/award/${post.id}/`,
				pubDate: post.data.date,
			};
			if (item.description === null) delete item.description;
			return item;
		}),
	];

	// 新しい順でソート
	allItems.sort((a, b) => {
		const dateA = a.publishDate || a.date || new Date(0);
		const dateB = b.publishDate || b.date || new Date(0);
		return new Date(dateB).getTime() - new Date(dateA).getTime();
	});

	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: allItems,
	});
}
