import type { APIRoute, APIContext } from "astro";
import { generateOgImage } from "../../../components/features/og/OgImage";

export const prerender = false;

export const GET: APIRoute = async ({ params }: APIContext) => {
	const image = await generateOgImage("suzuuuuu09.com", false);
	return new Response(image instanceof Buffer ? new Uint8Array(image) : image, {
		headers: { "Content-Type": "image/png" },
	});
};
