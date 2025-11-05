import type { APIRoute, APIContext } from "astro";
import { getCollection } from "astro:content";
import { generateOgImage } from "../../../components/features/og/OgImage";

export const getStaticPaths = async () => {
  let posts = await getCollection("blog");
  posts = posts.filter((post) => post.data.isPublish);

  return posts.map((post) => ({
    params: { title: post.data.slug },
  }));
}

export const GET: APIRoute = async ({ params }: APIContext) => {
  const blog = await getCollection("blog");
  const post = blog.find((post) => post.data.slug === params.title);
  if (!post) {
    throw new Error("Post not found");
  }

  const image = await generateOgImage(post.data.title);
  return new Response(image instanceof Buffer ? new Uint8Array(image) : image, {
    headers: { "Content-Type": "image/png" },
  });
}