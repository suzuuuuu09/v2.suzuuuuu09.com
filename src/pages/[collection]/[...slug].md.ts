import { getCollection } from "astro:content";

const COLLECTIONS = ["blog", "award", "product"] as const;

export async function getStaticPaths() {
  const paths = await Promise.all(
    COLLECTIONS.map(async (collection) => {
      const entries = await getCollection(collection);
      return entries
        .filter((entry) => entry.data.isPublish)
        .map((entry) => ({
          params: { collection, slug: entry.data.slug ?? entry.id },
          props: { entry },
        }));
    })
  );
  return paths.flat();
}

function formatValue(key: string, value: any): string | null {
  if (value === undefined || value === null) return null;
  if (Array.isArray(value)) {
    const items = value.map((v) => `  - ${v}`).join("\n");
    return `${key}:\n${items}`;
  }
  if (typeof value === "string" && (value.includes(":") || value.includes("#"))) {
    return `${key}: "${value}"`;
  }
  return `${key}: ${value}`;
}

export async function GET({ props }: any) {
  const { entry } = props;
  const data = entry.data;

  // フロントマターを構築
  const frontmatter = {
    title: data.title,
    slug: data.slug,
    description: data.description,
    isPublish: data.isPublish,
    ...(data.publishDate && { publishDate: data.publishDate.toISOString() }),
    ...(data.updateDate && { updateDate: data.updateDate.toISOString() }),
    ...(data.date && { date: data.date.toISOString() }),
    ...(data.tags && { tags: data.tags }),
    ...(data.emoji && { emoji: data.emoji }),
    ...(data.category && { category: data.category }),
    ...(data.type && { type: data.type }),
    ...(data.thumbnail && { thumbnail: data.thumbnail }),
  };

  const frontmatterYaml = Object.entries(frontmatter)
    .map(([key, value]) => formatValue(key, value))
    .filter(Boolean)
    .join("\n");

  const markdown = `---\n${frontmatterYaml}\n---\n\n${entry.body}`;

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
