import ogs from 'open-graph-scraper';

/**
 * faviconのURLを正規化する関数
 */
function normalizeFaviconUrl(url: string, favicon: string): string {
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
  } catch (err) {
    console.warn(`Failed to normalize favicon URL for ${url}:`, err);
    return "";
  }
}

// open-graph-scraperでOGP情報を取得する
export async function fetchOGP(url: string) {
  try {
    const options = {
      url,
      timeout: 5000,
    };

    const { result } = await ogs(options);
    
    // open-graph-scraperの結果から必要な情報を抽出
    const ogTitle = result.ogTitle || result.twitterTitle || '';
    const ogDescription = result.ogDescription || result.twitterDescription || '';
    const ogImage = result.ogImage?.[0]?.url || result.twitterImage?.[0]?.url || '';
    const ogSiteName = result.ogSiteName || new URL(url).hostname;
    
    // faviconを取得（検証なしで正規化のみ）
    const favicon = normalizeFaviconUrl(url, result.favicon || '');
    
    return {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      site_name: ogSiteName,
      favicon: favicon,
    };
  } catch (error) {
    console.warn(`Failed to fetch OGP for ${url}:`, error);
    return {
      title: '',
      description: '',
      image: '',
      site_name: new URL(url).hostname,
      favicon: '',
    };
  }
}
