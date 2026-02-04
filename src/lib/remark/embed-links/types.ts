import type { Node } from "unist";

export interface OgpData {
	title?: string;
	description?: string;
	site_name?: string;
	image?: string;
	favicon?: string;
	[key: string]: string | undefined; // 拡張性を維持しつつ型安全に
}

// 処理可能なサービスのリスト
export type ServiceType =
	| "youtube"
	| "twitter"
	| "spotify"
	| "soundcloud"
	| "google-slides"
	| "github-gist"
	| "codepen"
	| "hatena-blog"
	| "note"
	| "reddit"
	| "other"
	| "skip";

// キャッシュの型定義
export type OgpCache = Map<string, OgpData>;

// プロセッサに渡すコンテキスト
export interface ProcessorContext {
	url: string;
	linkTitle: string;
	node: Node;
	index: number;
	// NOTE: Parent型を使うのは難しいためanyを使う
	parent: any;
	cache: OgpCache;
}

export interface OembedResponse {
	type: string;
	version: string;
	html: string;
	width?: number | string;
	height?: number | string;
	provider_name?: string;
	provider_url?: string;
}
