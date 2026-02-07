import { visit } from "unist-util-visit";
import type { Root, Link } from "mdast";
import { detectUrlType } from "./detect";
import * as Processors from "./processors";
import type { OgpCache, ProcessorContext } from "./types";

export default function remarkEmbedLinks() {
  const cache: OgpCache = new Map();

  return async function transformer(tree: Root) {
    const promises: Promise<void>[] = [];

    visit(
      tree,
      "link",
      (node: Link, index: number | undefined, parent: any) => {
        if (!parent || typeof index !== "number") return;

        let url = node.url;

        // Twitter URL正規化
        url = url.replace(/x\.com/i, "twitter.com");

        const linkTitle =
          node.children?.[0]?.type === "text" ? node.children[0].value : "";

        // インラインコード除外
        const isInlineCode = node.children?.[0]?.type === "inlineCode";
        if (isInlineCode) return;

        const urlType = detectUrlType(url);
        if (urlType === "skip") return;

        const ctx: ProcessorContext = {
          url,
          linkTitle,
          node,
          index,
          parent,
          cache,
        };

        let promise: Promise<void> | undefined;

        switch (urlType) {
          case "youtube":
            promise = Processors.processYoutube(ctx);
            break;
          case "twitter":
            promise = Processors.processTwitter(ctx);
            break;
          case "spotify":
            promise = Processors.processSpotify(ctx);
            break;
          case "soundcloud":
            promise = Processors.processSoundcloud(ctx);
            break;
          case "google-slides":
            promise = Processors.processGoogleSlides(ctx);
            break;
          case "github-gist":
            promise = Processors.processGithubGist(ctx);
            break;
          case "codepen":
            promise = Processors.processCodepen(ctx);
            break;
          case "hatena-blog":
            promise = Processors.processHatenaBlog(ctx);
            break;
          case "note":
            promise = Processors.processNote(ctx);
            break;
          case "reddit":
            promise = Processors.processReddit(ctx);
            break;
          case "speaker-deck":
            promise = Processors.processSpeakerDeck(ctx);
            break;
          case "other":
            promise = Processors.processOgpCard(ctx, "other");
            break;
        }

        if (promise) {
          promises.push(promise);
        }
      },
    );

    await Promise.all(promises);
  };
}
