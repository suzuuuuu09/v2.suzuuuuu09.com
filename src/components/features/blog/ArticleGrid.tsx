import { Grid } from "@/components/ui/Grid";

export default function ArticleGrid({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Grid variant="article">{children}</Grid>;
}
