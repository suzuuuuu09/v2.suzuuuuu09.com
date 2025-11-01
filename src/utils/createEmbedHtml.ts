export function createTwitterEmbedHtml(url: string, tweetId: string, linkTitle: string): string {
  // Twitter公式の埋め込みScript
  return `
<div class="twitter-embed-container">
  <blockquote class="twitter-tweet" data-theme="light">
    <a href="${url}">${linkTitle || 'Tweet'}</a>
  </blockquote>
  <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
</div>`;
};

export function createYouTubeEmbedHtml(embedSrc: string, linkTitle: string): string {
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
};

export function createSpotifyEmbedHtml(embedUrl: string): string {
  return `
  <div class="spotify-embed-container">
    <iframe
      data-testid="embed-iframe"
      style="border-radius:12px"
      src="${embedUrl}"
      width="100%"
      height="352"
      frameBorder="0"
      allowfullscreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    >
    </iframe>
  </div>
  `;
};

export function createGoogleSlidesEmbedHtml(embedUrl: string, linkTitle: string): string {
  // レスポンシブ対応のGoogle Slides埋め込み
  return `
<div class="google-slides-wrapper">
  <div class="google-slides-container">
    <iframe
      src="${embedUrl}"
      title="${linkTitle || 'Google Slides'}"
      frameborder="0"
      allowfullscreen="true"
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
    ></iframe>
  </div>
</div>`;
};

export function createGithubGistEmbedHtml(embedUrl: string): string {
  // URLからクエリパラメータを除去してから.jsを追加
  const cleanUrl = embedUrl.split('?')[0];
  const scriptUrl = cleanUrl.endsWith('.js') ? cleanUrl : `${cleanUrl}.js`;
  
  return `
<div class="github-gist-embed-container">
  <script src="${scriptUrl}"></script>
</div>`;
};

export function createCodepenEmbedHtml(embedUrl: string): string {
  return `
  <div class="codepen-embed-container">
    <p
      class="codepen"
      data-height="300"
      data-default-tab="html,result"
      data-slug-hash="ZYQqJaJ"
      style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;"
    >
    </p>
    <script async src="https://public.codepenassets.com/embed/index.js"></script>
  </div>
  `;
}

export function createGridCardHtml(url: string, title: string, site: string, siteClass: string, ogpData: any): string {
  const imageRatioClass = ogpData.image ? 'link-card-with-image' : '';
  const faviconHtml = ogpData.favicon 
    ? `<img src="${ogpData.favicon}" alt="${site} favicon" class="link-card-favicon" loading="lazy" />`
    : `<svg class="link-card-favicon-fallback" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48Z"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48Z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48 256 464"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M464 256 48 256"></path></svg>`;

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
          <div class="link-card-site-wrapper">
            ${faviconHtml}
            <span class="link-card-site">${site}</span>
          </div>
        </div>
      </div>
    </a>
  </div>`;
};

export function createStandardCardHtml(url: string, title: string, site: string, siteClass: string, imageHtml: string, favicon?: string): string {
  const faviconHtml = favicon 
    ? `<img src="${favicon}" alt="${site} favicon" class="link-card-favicon" loading="lazy" />`
    : `<svg class="link-card-favicon-fallback" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48Z"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48c-58.07 0-112.67 93.13-112.67 208S197.93 464 256 464s112.67-93.13 112.67-208S314.07 48 256 48Z"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M117.33 117.33c38.24 27.15 86.38 43.34 138.67 43.34s100.43-16.19 138.67-43.34M394.67 394.67c-38.24-27.15-86.38-43.34-138.67-43.34s-100.43 16.19-138.67 43.34"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M256 48 256 464"></path><path fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32" d="M464 256 48 256"></path></svg>`;

  return `
  <div class="link-card ${siteClass}">
    <a href="${url}" target="_blank">
      ${imageHtml}
      <div class="link-card-content">
        <h4>${title}</h4>
        <div class="link-card-site-wrapper">
          ${faviconHtml}
          <span class="link-card-site">${site}</span>
        </div>
      </div>
    </a>
  </div>`;
};
