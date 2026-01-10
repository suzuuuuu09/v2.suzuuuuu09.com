import { loadDefaultJapaneseParser } from "budoux";

interface Props {
	text: string;
	as?: "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "div";
	className?: string;
}

export default function BudouxText({ text, as: Component = "span", className }: Props) {
	const parser = loadDefaultJapaneseParser();
	const rawWords = parser.parse(text);
	const words = rawWords
	  .filter((word) => word.trim().length > 0)
		.map((word) => word.replace(/^\s+|\s+$/g, '')); // 空白を削除

	return (
		<Component className={className}>
			{words.map((word, index) => (
				<span
					key={index}
					style={{ display: "inline-block", whiteSpace: "nowrap" }}
				>
					{word}
				</span>
			))}
		</Component>
	)
}
