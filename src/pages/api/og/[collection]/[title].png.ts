import type { APIRoute, APIContext } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../../../../components/features/og/OgImage";

const COLLECTIONS = ["blog", "award", "product"] as const;

export const getStaticPaths = async () => {
  // COLLECTIONを動的に取得
  const paths = [];
  for (const collection of COLLECTIONS) {
    let posts = await getCollection(collection);
    posts = posts.filter((post) => post.data.isPublish);

    paths.push(
      ...posts.map((post) => ({
        params: { collection, title: post.data.slug },
      }))
    );
  }
  return paths;
}

export const GET: APIRoute = async ({ params }: APIContext) => {
  // defaultコレクションの場合は特殊処理
  if (params.collection === "default") {
    const image = await generateOgImage(params.title as string, false);
    return new Response(image instanceof Buffer ? new Uint8Array(image) : image, {
      headers: { "Content-Type": "image/png" },
    });
  }

  // その他のコレクションは通常処理
  const posts = await getCollection(params.collection as typeof COLLECTIONS[number]);
  const filteredPosts = posts.filter((post) => post.data.isPublish);
  const post = filteredPosts.find((post) => post.data.slug === params.title);
  if (!post) {
    throw new Error("Post not found");
  }

  const image = await generateOgImage(post.data.title, true);
  return new Response(image instanceof Buffer ? new Uint8Array(image) : image, {
    headers: { "Content-Type": "image/png" },
  });
}