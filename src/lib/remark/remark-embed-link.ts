import { visit } from 'unist-util-visit';
import type { Root, Link } from 'mdast';
import { fetchOGP } from '../../utils/ogp';
import {
  createYouTubeEmbedHtml,
  createTwitterEmbedHtml,
  createSpotifyEmbedHtml,
  createGoogleSlidesEmbedHtml,
  createGithubGistEmbedHtml,
  createCodepenEmbedHtml,
  createGridCardHtml,
  createStandardCardHtml,
} from '../../utils/createEmbedHtml';

export default function remarkEmbedLinks() {
  const cache = new Map();

  return async function transformer(tree: Root) {
    const promises: Promise<void>[] = [];

    visit(tree, 'link', (node: Link, index: number | undefined, parent: any) => {
      if (!parent || typeof index !== 'number') return;

      const url = node.url;

      // リンクのテキスト（タイトル）を取得
      const linkTitle =
        node.children?.[0]?.type === 'text' ? node.children[0].value : '';

      // インラインコード内のリンクはスキップ
      const isInlineCode = node.children?.[0]?.type === 'inlineCode';
      if (isInlineCode) return;

      // URLタイプを判定
      const urlType = getUrlType(url);

      // HTTPで始まらないリンクはスキップ
      if (urlType === 'skip') return;

      /**
       * キャッシュを考慮してOGPデータを取得する関数
       * @param {string} url - OGPを取得するURL
       * @returns {Promise<any>} - OGPデータ
       */
      const getOgpWithCache = async (url: string) => {
        if (cache.has(url)) {
          return cache.get(url);
        } else {
          const ogpData = await fetchOGP(url);
          cache.set(url, ogpData);
          return ogpData;
        }
      };

      switch (urlType) {
        case 'youtube': {
          // YouTubeの動画
          const youtubeId = extractYouTubeId(new URL(url));

          if (!youtubeId) return;

          const embedSrc = `https://www.youtube.com/embed/${youtubeId}`;
          const htmlValue = createYouTubeEmbedHtml(embedSrc, linkTitle);
          parent.children[index] = {
            type: 'html',
            value: htmlValue,
          };
          
          break;
        }
        case 'twitter': {
          // Twitterのツイートまたはユーザーページ
          const tweetId = extractTwitterId(url);
          if (tweetId) {
            // ツイートの場合は埋め込み
            const htmlValue = createTwitterEmbedHtml(url, tweetId, linkTitle);
            parent.children[index] = {
              type: 'html',
              value: htmlValue,
            };
          } else {
            // ユーザーページの場合はOGPカード
            const promise = (async () => {
              const ogpData = await getOgpWithCache(url);

              const title = ogpData.title || linkTitle || url;
              const site = ogpData.site_name;
              const description = ogpData.description || '';

              const htmlValue = createGridCardHtml(url, title, site, 'twitter', ogpData, description);

              parent.children[index] = {
                type: 'html',
                value: htmlValue,
              };
            })();
            promises.push(promise);
          }
          break;
        }
        case 'spotify': {
          // Spotifyの埋め込み
          const spotifyData = extractSpotifyId(url);
          if (!spotifyData) return;

          const embedUrl = `https://open.spotify.com/embed/${spotifyData.type}/${spotifyData.id}`;
          const embedHtml = createSpotifyEmbedHtml(embedUrl);
          parent.children[index] = {
            type: 'html',
            value: embedHtml,
          };
          break;
        }
        case 'google-slides': {
          // Google Slidesの埋め込み
          const embedUrl = convertToGoogleSlidesEmbedUrl(url);
          if (embedUrl) {
            const htmlValue = createGoogleSlidesEmbedHtml(embedUrl, linkTitle);
            parent.children[index] = {
              type: 'html',
              value: htmlValue,
            };
          }
          break;
        }
        case 'github-gist': {
          // GitHub Gistの埋め込み
          const htmlValue = createGithubGistEmbedHtml(url);
          parent.children[index] = {
            type: 'html',
            value: htmlValue,
          };
          break;
        }
        case 'codepen': {
          // Codepenの埋め込み
          const slugHash = extractCodepenSlugHash(url);
          if (!slugHash) return;  // スラッグハッシュが取得できない場合はスキップ

          const htmlValue = createCodepenEmbedHtml(slugHash);
          parent.children[index] = {
            type: 'html',
            value: htmlValue,
          };
          break;
        }
        case 'other': {
          // その他のリンク（OGP取得）
          const promise = (async () => {
            const ogpData = await getOgpWithCache(url);

            const title = ogpData.title || linkTitle || url;
            const description = ogpData.description || '';
            const site = ogpData.site_name;
            const imageHtml = ogpData.image
              ? `<div class="link-card-image"><img src="${ogpData.image}" alt="${title}" loading="lazy" /></div>`
              : '';

            // サイトクラス名
            const siteClass = urlType === 'other' ? 'external' : urlType;

            let htmlValue: string;
            htmlValue = createStandardCardHtml(url, title, site, siteClass, imageHtml, description, ogpData.favicon);

            parent.children[index] = {
              type: 'html',
              value: htmlValue,
            };
          })();
          promises.push(promise);
          break;
        }
      }
    });

    await Promise.all(promises);
  };
}

/**
 * URLのタイプを判定する関数
 * @param {string} url - 判定するURL
 * @returns {string} - URLタイプ
 */
function getUrlType(url: string): string {
  // // YouTubeの動画URLかどうか判定
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const youtubeMatch = youtubeRegex.exec(url);

  if (youtubeMatch) {
    return 'youtube';
  }

  if (!url.startsWith('http')) {
    return 'skip';
  }

  // 各種サイトの判定
  if (url.includes('x.com') || url.includes('twitter.com')) return 'twitter';
  if (url.includes('open.spotify.com')) return 'spotify';
  if (url.includes('docs.google.com/presentation')) return 'google-slides';
  if (url.includes('gist.github.com')) return 'github-gist';
  if (url.includes('codepen.io')) return 'codepen';

  // それ以外は外部リンク
  return 'other';
}

// YoutubeのリンクからVideoIDを取得する
function extractYouTubeId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, '');

  if (host === 'youtu.be') {
    const id = url.pathname.split('/').find(Boolean);
    return id || null;
  }

  if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'youtube-nocookie.com') {
    // /watch?v=
    if (url.pathname === '/watch') {
      const v = url.searchParams.get('v');
      return v || null;
    }
    // /shorts/<id>
    if (url.pathname.startsWith('/shorts/')) {
      const id = url.pathname.split('/').filter(Boolean)[1];
      return id || null;
    }
    // /embed/<id> をそのまま扱う
    if (url.pathname.startsWith('/embed/')) {
      const id = url.pathname.split('/').filter(Boolean)[1];
      return id || null;
    }
  }

  return null;
}

// TwitterのリンクからツイートIDを取得する
function extractTwitterId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const host = urlObj.hostname.replace(/^www\./, '');
    
    // x.com または twitter.com
    if (host === 'x.com' || host === 'twitter.com') {
      // ツイートURL: /username/status/tweetId
      const pathRegex = /^\/[^/]+\/status\/(\d+)/;
      const pathMatch = pathRegex.exec(urlObj.pathname);
      if (pathMatch) {
        return pathMatch[1];
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

function extractSpotifyId(url: string): { type: string; id: string } | null {
  try {
    const urlObj = new URL(url);
    const host = urlObj.hostname.replace(/^www\./, '');

    if (host === 'open.spotify.com') {
      const pathRegex = /^\/(?:intl-[a-z]{2}\/)?(track|album|playlist|artist|show|episode)\/([a-zA-Z0-9]+)(?:\?.*)?$/;
      const pathMatch = pathRegex.exec(urlObj.pathname);
      if (pathMatch) {
        return {
          type: pathMatch[1],
          id: pathMatch[2],
        };
      }
    }

    return null;
  } catch {
    return null;
  }
}

// Google SlidesのURLを埋め込み用URLに変換する
function convertToGoogleSlidesEmbedUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const host = urlObj.hostname.replace(/^www\./, '');

    if (host === 'docs.google.com' && urlObj.pathname.includes('/presentation/')) {
      // 既に埋め込みURLの場合はそのまま返す
      if (urlObj.pathname.includes('/embed') || urlObj.pathname.includes('/pubembed')) {
        return url;
      }

      // /presentation/d/e/{long-id}/pub 形式の場合（公開用URL）
      // long-id は通常、2PACX- で始まる長い文字列
      const pubLongIdRegex = /\/presentation\/d\/e\/(2PACX-[a-zA-Z0-9_-]+)/;
      const pubLongIdMatch = pubLongIdRegex.exec(urlObj.pathname);
      if (pubLongIdMatch) {
        const presentationId = pubLongIdMatch[1];
        return `https://docs.google.com/presentation/d/e/${presentationId}/pubembed?start=false&loop=false&delayms=3000`;
      }

      // /presentation/d/{id}/edit 形式または /d/{id} 形式から埋め込みURLを生成
      const idRegex = /\/presentation\/d\/([a-zA-Z0-9_-]+)/;
      const idMatch = idRegex.exec(urlObj.pathname);
      if (idMatch) {
        const presentationId = idMatch[1];
        // /e/ が含まれていない場合のみ（通常の編集URL）
        if (!urlObj.pathname.includes('/e/')) {
          return `https://docs.google.com/presentation/d/${presentationId}/embed?start=false&loop=false&delayms=3000`;
        }
      }
    }

    return null;
  } catch {
    return null;
  }
}

function extractCodepenSlugHash(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const host = urlObj.hostname.replace(/^www\./, '');

    if (host === 'codepen.io') {
      // URL形式: /username/pen/slugHash
      const pathRegex = /^\/[^/]+\/pen\/([a-zA-Z0-9_-]+)/;
      const pathMatch = pathRegex.exec(urlObj.pathname);
      if (pathMatch) {
        return pathMatch[1];
      }
    }
  } catch {
    return null;
  }
  return null;
}