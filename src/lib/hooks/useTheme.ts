import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

function toTheme(value: string | null | undefined): Theme {
	return value === "dark" ? "dark" : "light";
}

export function useTheme(): Theme {
	const [theme, setTheme] = useState<Theme>("light");

	useEffect(() => {
		const currentTheme = toTheme(
			document.documentElement.dataset.theme ?? localStorage.getItem("theme"),
		);
		setTheme(currentTheme);

		const handleThemeChange = (event: Event) => {
			const customEvent = event as CustomEvent<{ theme: string }>;
			setTheme(toTheme(customEvent.detail?.theme));
		};

		globalThis.addEventListener("themeChange", handleThemeChange);

		return () => {
			globalThis.removeEventListener("themeChange", handleThemeChange);
		};
	}, []);

	return theme;
}
