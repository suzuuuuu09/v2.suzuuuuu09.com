import ogs from "open-graph-scraper";
import { normalizeFaviconUrl } from "../utils/url";

// open-graph-scraperでOGP情報を取得する
export async function fetchOGP(url: string) {
	try {
		const options = {
			url,
			timeout: 5000,
		};

		const { result } = await ogs(options);

		// open-graph-scraperの結果から必要な情報を抽出
		const ogTitle = result.ogTitle || result.twitterTitle || "";
		const ogDescription =
			result.ogDescription || result.twitterDescription || "";
		const ogImage =
			result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || "";
		const ogSiteName = result.ogSiteName || new URL(url).hostname;

		// faviconを取得（検証なしで正規化のみ）
		const favicon = normalizeFaviconUrl(url, result.favicon || "");

		return {
			title: ogTitle,
			description: ogDescription,
			image: ogImage,
			site_name: ogSiteName,
			favicon: favicon,
		};
	} catch {
		return {
			title: "",
			description: "",
			image: "",
			site_name: new URL(url).hostname,
			favicon: "",
		};
	}
}
