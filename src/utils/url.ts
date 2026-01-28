/**
 * faviconのURLを正規化する
 */
export function normalizeFaviconUrl(url: string, favicon: string): string {
	if (!favicon || favicon === "") return "";

	try {
		// 既に完全なURLの場合
		if (/^https?:\/\//.test(favicon)) {
			return favicon;
		}

		// 相対パスの場合
		const baseUrl = new URL(url);
		if (favicon.startsWith("//")) {
			return `${baseUrl.protocol}${favicon}`;
		} else if (favicon.startsWith("/")) {
			return `${baseUrl.origin}${favicon}`;
		} else {
			return `${baseUrl.origin}/${favicon}`;
		}
	} catch {
		return "";
	}
}
