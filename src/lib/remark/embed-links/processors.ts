import { fetchOGP } from "../../../lib/ogs"; // 既存のインポート
import * as Detect from "./detect";
import * as Templates from "./templates";
import type { ProcessorContext, OgpData, OembedResponse } from "./types";

// キャッシュ付きOGP取得ヘルパー
async function fetchOgpWithCache(
	url: string,
	cache: Map<string, OgpData>,
): Promise<OgpData> {
	if (cache.has(url)) {
		const data = cache.get(url);
		if (data) return data;
	}
	const ogpData = await fetchOGP(url);
	cache.set(url, ogpData);
	return ogpData;
}

// 共通: HTMLノードへの置換処理
function replaceWithHtml(
	ctx: ProcessorContext,
	html: string,
	wrapperClass?: string,
) {
	const node = {
		type: "html", // シンプルにhtmlノードにするか、元の構造に合わせてparagraph > htmlにするか
		value: html,
	};

	// 元のコードが paragraph > div (className) > html 構造だった場合の再現
	if (wrapperClass) {
		ctx.parent.children[ctx.index] = {
			type: "paragraph",
			data: {
				hName: "div",
				hProperties: { className: [wrapperClass] },
			},
			children: [{ type: "html", value: html }],
		};
	} else {
		ctx.parent.children[ctx.index] = node;
	}
}

// --- 各サービス用プロセッサ ---

export async function processYoutube(ctx: ProcessorContext): Promise<void> {
	const endpoint = "https://www.youtube.com/oembed";
	const query = encodeURIComponent(ctx.url);
	const response = await fetch(`${endpoint}?format=json&url=${query}`);

	if (!response.ok) return;

	const data = await response.json();
	let embedHtml = data.html as string;

	embedHtml = embedHtml
		.replace(/width=["']?\d+["']?/g, 'width="100%"')
		.replace(/height=["']?\d+["']?/g, 'height="100%"');

	replaceWithHtml(ctx, embedHtml, "youtube-embed");
}

export async function processTwitter(ctx: ProcessorContext): Promise<void> {
	const tweetId = Detect.extractTwitterId(ctx.url);

	if (tweetId) {
		const endpoint = "https://publish.twitter.com/oembed";
		const query = encodeURIComponent(ctx.url);
		const response = await fetch(
			`${endpoint}?url=${query}&omit_script=true&dnt=true`,
		);

		if (!response.ok) {
			// 埋め込みできないの場合はOGPカード
			await processOgpCard(ctx, "twitter");
			return;
		}

		const data: OembedResponse = await response.json();
		replaceWithHtml(ctx, data.html, "twitter-embed");
	} else {
		// ユーザーページ等はOGPカード
		await processOgpCard(ctx, "twitter");
	}
}

export async function processSpotify(ctx: ProcessorContext): Promise<void> {
	const endpoint = "https://open.spotify.com/oembed";
	const query = encodeURIComponent(ctx.url);
	const response = await fetch(`${endpoint}?url=${query}`);

	if (!response.ok) return;

	const data = await response.json();
	replaceWithHtml(ctx, data.html, "spotify-embed");
}

export async function processSoundcloud(ctx: ProcessorContext): Promise<void> {
	const endpoint = "https://soundcloud.com/oembed";
	const query = encodeURIComponent(ctx.url);
	const response = await fetch(`${endpoint}?format=json&url=${query}`);

	if (!response.ok) return;

	const data = await response.json();
	replaceWithHtml(ctx, data.html, "soundcloud-embed");
}

export async function processGoogleSlides(
	ctx: ProcessorContext,
): Promise<void> {
	const embedUrl = Detect.convertToGoogleSlidesEmbedUrl(ctx.url);
	if (embedUrl) {
		const html = Templates.generateGoogleSlidesEmbedHtml(
			embedUrl,
			ctx.linkTitle,
		);
		replaceWithHtml(ctx, html);
	}
}

export async function processGithubGist(ctx: ProcessorContext): Promise<void> {
	const html = Templates.generateGithubGistEmbedHtml(ctx.url);
	replaceWithHtml(ctx, html);
}

export async function processCodepen(ctx: ProcessorContext): Promise<void> {
	// NOTE: CodePenでoEmbedが使えないので、slug/hashを抽出して手動で埋め込みコードを生成
	const slugHash = Detect.extractCodepenSlugHash(ctx.url);
	if (!slugHash) return;

	const html = Templates.generateCodepenEmbedHtml(slugHash);
	replaceWithHtml(ctx, html);
}

export async function processHatenaBlog(ctx: ProcessorContext): Promise<void> {
	const endpoint = "https://hatena.blog/oembed";
	const query = encodeURIComponent(ctx.url);
	const response = await fetch(`${endpoint}?format=json&url=${query}`);

	if (!response.ok) return;

	const data = await response.json();
	replaceWithHtml(ctx, data.html, "hatena-blog-embed");
}

export async function processNote(ctx: ProcessorContext): Promise<void> {
	const articleId = Detect.extractNoteArticleId(ctx.url);

	if (!articleId) return;

	const embedUrl = `https://note.com/embed/notes/${articleId}`;
	const html = Templates.generateNoteEmbedHtml(embedUrl);

	// Noteは特殊なiframe構造を持っていたため、wrapperClassを指定して再現
	replaceWithHtml(ctx, html, "note-embed");
}

export async function processReddit(ctx: ProcessorContext): Promise<void> {
	const endpoint = "https://www.reddit.com/oembed";
	const query = encodeURIComponent(ctx.url);
	const response = await fetch(`${endpoint}?url=${query}`);

	if (!response.ok) return;

	const data = await response.json();
	replaceWithHtml(ctx, data.html, "reddit-embed");
}

export async function processOgpCard(
	ctx: ProcessorContext,
	typeOverride?: string,
): Promise<void> {
	const ogpData = await fetchOgpWithCache(ctx.url, ctx.cache);
	const typeClass = typeOverride || "external";
	const html = Templates.generateCardHtml(
		ctx.url,
		ogpData,
		ctx.linkTitle,
		typeClass,
	);

	replaceWithHtml(ctx, html);
}
