import { visit } from 'unist-util-visit';
import type { Root, Link } from 'mdast';
import ogs from 'open-graph-scraper';

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

              const htmlValue = createGridCardHtml(url, title, site, 'twitter', ogpData);

              parent.children[index] = {
                type: 'html',
                value: htmlValue,
              };
            })();
            promises.push(promise);
          }
          break;
        }
        case 'google-slides': {
          if (url) {
            const htmlValue = createGoogleSlidesEmbedHtml(url);
            parent.children[index] = {
              type: 'html',
              value: htmlValue,
            };
          }
          break;
        }
        case 'github':
        case 'zenn':
        case 'qiita':
        case 'note':
        case 'other': {
          // その他のリンク（OGP取得）
          const promise = (async () => {
            const ogpData = await getOgpWithCache(url);

            const title = ogpData.title || linkTitle || url;
            const site = ogpData.site_name;
            const imageHtml = ogpData.image
              ? `<div class="link-card-image"><img src="${ogpData.image}" alt="${title}" loading="lazy" /></div>`
              : '';

            // サイトクラス名
            const siteClass = urlType === 'other' ? 'external' : urlType;

            // Zenn, Qiita、または画像のあるカードの場合はグリッドレイアウトを使用
            let htmlValue: string;
            if (urlType === 'zenn' || urlType === 'qiita' || ogpData.image) {
              htmlValue = createGridCardHtml(url, title, site, siteClass, ogpData);
            } else {
              // 他のサイトは通常のレイアウト
              htmlValue = createStandardCardHtml(url, title, site, siteClass, imageHtml);
            }

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

// OGP情報を取得するヘルパー関数
async function fetchOGP(url: string) {
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
    
    return {
      title: ogTitle,
      description: ogDescription,
      image: ogImage,
      site_name: ogSiteName,
    };
  } catch (error) {
    console.warn(`Failed to fetch OGP for ${url}:`, error);
    return {
      title: '',
      description: '',
      image: '',
      site_name: new URL(url).hostname,
    };
  }
}

/**
 * URLのタイプを判定する関数
 * @param {string} url - 判定するURL
 * @returns {string} - URLタイプ
 */
function getUrlType(url: string): string {
  // YouTubeの動画URLかどうか判定
  const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/;
  const youtubeMatch = youtubeRegex.exec(url);

  if (youtubeMatch) {
    return 'youtube';
  }

  if (!url.startsWith('http')) {
    return 'skip';
  }

  // 各種サイトの判定
  if (url.includes('github.com')) return 'github';
  if (url.includes('zenn.dev')) return 'zenn';
  if (url.includes('qiita.com')) return 'qiita';
  if (url.includes('note.com')) return 'note';
  if (url.includes('x.com') || url.includes('twitter.com')) return 'twitter';
  if (url.includes('docs.google.com/presentation')) return 'google-slides';

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

function createTwitterEmbedHtml(url: string, tweetId: string, linkTitle: string): string {
  // Twitter公式の埋め込みScript
  return `
<div class="twitter-embed-container">
  <blockquote class="twitter-tweet" data-theme="light">
    <a href="${url}">${linkTitle || 'Tweet'}</a>
  </blockquote>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>`;
}

function createYouTubeEmbedHtml(embedSrc: string, linkTitle: string): string {
  // figure で中央寄せ。iframe はアスペクト比維持で横幅100%
  return `\n<figure style="display:flex;justify-content:center;max-width:100%;">
  <iframe
    src="${embedSrc}"
    title="${linkTitle || 'YouTube video'}"
    style="width:100%;aspect-ratio:16/9;border:0;"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
</figure>\n`;
}

function createGoogleSlidesEmbedHtml(embedUrl: string): string {
  return `
<div class="google-slides-embed-container">
  <iframe
    src="${embedUrl}"
    frameborder="0"
    allowfullscreen="true"
    mozallowfullscreen="true"
    webkitallowfullscreen="true"
    style="width:100%;aspect-ratio:12/7;border:0;border-radius:8px;"
  ></iframe>
</div>`;
}

function createGridCardHtml(url: string, title: string, site: string, siteClass: string, ogpData: any): string {
  const imageRatioClass = ogpData.image ? 'link-card-with-image' : '';

  return `<div class="link-card ${siteClass} link-card-grid ${imageRatioClass}">
    <a href="${url}" target="_blank">
      <div class="link-card-grid-container">
        <div class="link-card-image-container">
          ${
            ogpData.image
              ? `<img src="${ogpData.image}" alt="${title}" loading="lazy" onload="this.naturalWidth > this.naturalHeight * 1.2 ? this.parentNode.parentNode.classList.add('wide-image') : ''" />`
              : `<div class="no-image"></div>`
          }
        </div>
        <div class="link-card-content">
          <h4>${title}</h4>
          <span class="link-card-site">${site}</span>
        </div>
      </div>
    </a>
  </div>`;
}

function createStandardCardHtml(url: string, title: string, site: string, siteClass: string, imageHtml: string): string {
  return `
  <div class="link-card ${siteClass}">
    <a href="${url}" target="_blank">
      ${imageHtml}
      <div class="link-card-content">
        <h4>${title}</h4>
        <span class="link-card-site">${site}</span>
      </div>
    </a>
  </div>`;
}
