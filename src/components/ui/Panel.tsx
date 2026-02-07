import { ReactNode } from "react";
import { sva } from "styled-system/css";

interface Props {
	title: string;
	children?: ReactNode;
	visible?: "lg" | "base" | "always";
}

const panelStyles = sva({
	slots: ["root", "title"],
	base: {
		root: {
			w: "full",
			bg: "sz.bg-on.500",
			borderRadius: "xl",
			px: "4",
			py: "6",
			shadow: "sm",
			borderWidth: "1px",
			borderColor: "sz.border/20",
		},
		title: {
			fontSize: "lg",
			fontWeight: "bold",
			color: "sz.text.main",
			mb: "4",
			px: "2",
		},
	},
	variants: {
		visible: {
			lg: {
				root: {
					display: { base: "none", lg: "block" },
				},
			},
			base: {
				root: {
					display: { base: "block", lg: "none" },
				},
			},
			always: {
				root: {
					display: "block",
				},
			},
		},
	},
});

export default function Panel(props: Props) {
	const { title, children, visible = "always" } = props;
	const styles = panelStyles({ visible });

	return (
		<section className={styles.root}>
			<h2 className={styles.title}>{title}</h2>
			{children}
		</section>
	);
}
