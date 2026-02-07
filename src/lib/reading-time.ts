import calculateReadingTime from "reading-time";
import { fromMarkdown } from "mdast-util-from-markdown";
import { toString } from "mdast-util-to-string";

export const getReadingTime = (text: string): string | undefined => {
	if (!text?.length) return undefined;
	try {
		// ![[...]] 形式のWikiリンクは計算しない
		const cleanedText = text.replaceAll(/!\[\[.*?\]\]/g, "");

		const { minutes } = calculateReadingTime(
			toString(fromMarkdown(cleanedText)),
		);
		if (minutes && minutes > 0) {
			return `${Math.ceil(minutes)} min`;
		}
		return undefined;
	} catch {
		return undefined;
	}
};
