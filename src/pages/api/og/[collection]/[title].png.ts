import type { APIRoute, APIContext } from "astro";
import { generateOgImage } from "../../../../components/features/og/OgImage";
import { getAllPosts } from "../../../../lib/post";

const COLLECTIONS = ["blog", "award", "product"] as const;

export const getStaticPaths = async () => {
  const allPosts = await getAllPosts();
  const paths = [];

  for (const collection of COLLECTIONS) {
    const posts = allPosts.filter((post) => post.collection === collection);

    paths.push(
      ...posts.map((post) => ({
        params: { collection, title: post.data.slug },
      })),
    );
  }
  return paths;
};

export const GET: APIRoute = async ({ params }: APIContext) => {
  const allPosts = await getAllPosts();
  const post = allPosts.find(
    (post) =>
      post.collection === params.collection && post.data.slug === params.title,
  );
  if (!post) {
    throw new Error("Post not found");
  }

  const image = await generateOgImage(post.data.title, true, params.collection);
  return new Response(image instanceof Buffer ? new Uint8Array(image) : image, {
    headers: { "Content-Type": "image/png" },
  });
};
