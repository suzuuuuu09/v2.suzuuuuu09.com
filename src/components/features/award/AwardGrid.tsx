import { Grid } from "@/components/ui/Grid";

export default function AwardGrid({ children }: Readonly<{ children: React.ReactNode }>) {
	return <Grid variant="award">{children}</Grid>;
}
