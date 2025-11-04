import type { APIRoute } from 'astro';
import { generateOgImage, getContentType } from '@/utils/_og-image-generator';

type ImageType = 'blog' | 'product' | 'about' | 'default';

export const GET: APIRoute = async ({ url }) => {
  try {
    const title = url.searchParams.get('title');

    if (!title) {
      return new Response('Title is required', { status: 400 });
    }

    // OG画像を生成
    const imageBuffer = await generateOgImage({
      title: decodeURIComponent(title),
      format: 'png',
    });

    return new Response(imageBuffer as any, {
      headers: {
        'Content-Type': getContentType('png'),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('OG Image Generation Error:', error);
    return new Response('Failed to generate OG image', { status: 500 });
  }
};
