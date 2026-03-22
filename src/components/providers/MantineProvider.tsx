// Mantineを使うために必要なやつ
import { createTheme, MantineProvider } from "@mantine/core";
import type { ReactNode } from "react";

const theme = createTheme({
	breakpoints: {
		xs: "40em",
		sm: "48em",
		md: "64em",
		lg: "80em",
		xl: "96em",
	},
});

interface MantineProviderProps {
	readonly children: ReactNode;
}

export default function CustomMantineProvider({
	children,
}: MantineProviderProps) {
	return <MantineProvider theme={theme}>{children}</MantineProvider>;
}
