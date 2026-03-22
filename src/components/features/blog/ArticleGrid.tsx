import { Grid } from "@/components/ui/Grid";

export default function ArticleGrid({ children }: { children: React.ReactNode }) {
	return (
		<Grid variant="article">
			{children}
		</Grid>
	)
}