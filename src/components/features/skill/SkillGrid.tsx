import { Grid } from "@/components/ui/Grid";

export default function SkillGrid({ children }: { children: React.ReactNode }) {
	return (
		<Grid variant="skill">
			{children}
		</Grid>
	);
}