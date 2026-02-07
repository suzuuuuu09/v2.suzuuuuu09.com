import type { ServiceType } from "./types";

/**
 * URLのタイプを判定する
 */
export function detectUrlType(url: string): ServiceType {
  const youtubeRegex =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  if (youtubeRegex.test(url)) return "youtube";

  if (!url.startsWith("http")) return "skip";

  if (url.includes("x.com") || url.includes("twitter.com")) return "twitter";
  if (url.includes("open.spotify.com")) return "spotify";
  if (url.includes("docs.google.com/presentation")) return "google-slides";
  if (url.includes("gist.github.com")) return "github-gist";
  if (url.includes("codepen.io")) return "codepen";
  if (url.includes("hatenablog.com")) return "hatena-blog";
  if (url.includes("note.com")) return "note";
  if (url.includes("soundcloud.com")) return "soundcloud";
  if (url.includes("reddit.com")) return "reddit";
  if (url.includes("speakerdeck.com")) return "speaker-deck";

  return "other";
}

export function extractTwitterId(url: string): string | null {
  // try-catch回避のため正規表現のみで抽出
  // x.com または twitter.com の /username/status/tweetId 形式
  const regex =
    /^https?:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/[^/]+\/status\/(\d+)/;
  const match = regex.exec(url);
  return match ? match[1] : null;
}

export function convertToGoogleSlidesEmbedUrl(url: string): string | null {
  // 公開用URL: /presentation/d/e/{long-id}/pub
  const pubMatch = /\/presentation\/d\/e\/(2PACX-[a-zA-Z0-9_-]+)/.exec(url);
  if (pubMatch) {
    const presentationId = pubMatch[1];
    return `https://docs.google.com/presentation/d/e/${presentationId}/pubembed?start=false&loop=false&delayms=3000`;
  }

  // 編集用URLなど: /presentation/d/{id}/edit -> embed
  const idMatch = /\/presentation\/d\/([a-zA-Z0-9_-]+)/.exec(url);
  if (idMatch && !url.includes("/e/")) {
    // /e/ (publish) を除外
    const presentationId = idMatch[1];
    // 既にembedが含まれているかチェック
    if (url.includes("/embed") || url.includes("/pubembed")) {
      return url;
    }
    return `https://docs.google.com/presentation/d/${presentationId}/embed?start=false&loop=false&delayms=3000`;
  }

  return null;
}

export function extractCodepenSlugHash(url: string): string | null {
  const match = /\/pen\/([a-zA-Z0-9_-]+)/.exec(url);
  return match ? match[1] : null;
}

export function extractNoteArticleId(url: string): string | null {
  const match = /note\.com\/[^/]+\/n\/([a-z0-9]+)/.exec(url);
  return match ? match[1] : null;
}
