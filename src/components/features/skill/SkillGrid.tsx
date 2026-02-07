import { styled as s } from "styled-system/jsx";

export const SkillGrid = s("div", {
	base: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fill,minmax(100px,1fr))",
		alignItems: "start",
		justifyContent: "center",
		textAlign: "center",
		alignContent: "stretch",
		justifyItems: "center",
		mb: "8",
	},
});
