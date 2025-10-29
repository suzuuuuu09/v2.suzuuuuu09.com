import calculateReadingTime from 'reading-time';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toString } from 'mdast-util-to-string';

export const getReadingTime = (text: string): string | undefined => {
  if (!text?.length) return undefined;
  try {
    const { minutes } = calculateReadingTime(toString(fromMarkdown(text)));
    if (minutes && minutes > 0) {
      return `${Math.ceil(minutes)} min`;
    }
    return undefined;
  } catch (e) {
    console.error('Error calculating reading time:', e);
    return undefined;
  }
};