import type { GlobalStyleObject } from "@pandacss/dev";

export const markdownStyles: GlobalStyleObject = {
	"h1, h2, h3, h4, h5, h6": {
		fontWeight: "bold",
		my: "5",
		scrollMarginTop: "28",
		display: "flex",
	},
	h1: {
		fontSize: "3xl",
		borderBottomWidth: "2",
		borderBottomColor: "sz.border",
		pb: "1",
		_lg: {
			fontSize: "4xl",
		},
	},
	h2: {
		fontSize: "2xl",
		borderBottomWidth: "1",
		borderBottomColor: "sz.border",
		mt: "10",
		pb: "1",
		_lg: {
			fontSize: "3xl",
		},
		_sm: {
			mt: "8",
		},
	},
	h3: {
		fontSize: "xl",
		_lg: {
			fontSize: "2xl",
		},
	},
	h4: {
		fontSize: "lg",
		_lg: {
			fontSize: "xl",
		},
	},
	h5: {
		fontSize: "base",
		_lg: {
			fontSize: "lg",
		},
	},
	h6: {
		fontSize: "sm",
		_lg: {
			fontSize: "base",
		},
	},
	a: {
		color: "sz.primary",
		_hover: {
			textDecoration: "underline",
			"&:has(.heading-anchor)": {
				textDecoration: "none",
			},
		},
	},

	p: {
		my: "2",
		fontSize: "base",
		wordBreak: "keep-all",
		overflowWrap: "anywhere",
		_lg: {
			fontSize: "lg",
		},
		color: "sz.text.main",
		code: {
			fontSize: "base",
		},
	},
	code: {
		px: "1",
		py: "0.25",
		bg: "sz.bg-on",
		rounded: "md",
		borderWidth: "1",
		borderColor: "sz.border",
	},
	kbd: {
		display: "inline-block",
		px: "2",
		py: "1",
		fontSize: "sm",
		fontFamily: "var(--moralerspace-neon)",
		fontWeight: "semibold",
		lineHeight: "1",
		color: "sz.text.main",
		bg: "sz.bg-on",
		borderWidth: "1",
		borderColor: "sz.border",
		borderBottomWidth: "2",
		borderRadius: "md",
		shadow: "sm",
		whiteSpace: "nowrap",
	},

	ul: {
		my: "2",
		pl: "6",
		li: {
			listStyleType: "disc",
			"&:has(input[type='checkbox'])": {
				listStyleType: "none",
				ml: "-6",
			},
		},
		ul: {
			li: {
				listStyleType: "circle",
				ul: {
					listStyleType: "square",
					"> li": {
						listStyleType: "square",
						ml: "2",
					},
				},
			},
		},
	},
	ol: {
		my: "2",
		pl: "6",
		li: {
			listStyleType: "decimal",
			"&:has(input[type='checkbox'])": {
				listStyleType: "none",
				ml: "-6",
			},
		},
	},
	"table:not(.github-gist-embed-container table)": {
		width: "full",
		thead: {
			tr: {
				bgColor: "sz.bg-on",
				borderBottomWidth: "1",
				borderBottomColor: "sz.border",
				th: {
					p: "3",
					fontWeight: "bold",
					textAlign: "left",
				},
			},
		},
		tbody: {
			tr: {
				bgColor: "sz.bg",
				borderBottomWidth: "1",
				borderBottomColor: "sz.border",
				td: {
					p: "2",
				},
			},
		},
	},

	blockquote: {
		bgColor: "sz.bg-on",
		borderLeftWidth: "4",
		borderLeftColor: "sz.primary/60",
		my: "8",
		px: "4",
		py: "2",
		shadow: "md",
		fontStyle: "italic",
	},
	details: {
		mt: "4",
		mb: "6",
		summary: {
			mb: "3",
			cursor: "pointer",
			fontWeight: "normal",
		},
	},
	hr: {
		borderColor: "sz.border",
		my: "8",
	},
	mark: {
		bg: "sz.primary/20",
		color: "sz.text.main",
		px: "1",
		py: "0.25",
		borderRadius: "sm",
	},
	img: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		rounded: "lg",
		my: "4",
		mx: "auto",
		w: "auto",
		h: "auto",
		maxH: "600px",
	},
	video: {
		my: "4",
	},
	".caption": {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "1",
		fontSize: "base",
		fontWeight: "bold",
		color: "sz.text.sub",
		svg: {
			flexShrink: "0",
			w: "4",
			h: "4",
		},
	},
	".caption-table": {
		mt: "8",
		_sm: {
			mt: "4",
		},
	},
	".caption-image": {
		mb: "8",
		_sm: {
			mb: "4",
		},
	},

	// rehype-autolink-headingsのアンカーリンク
	".heading-anchor-container": {
		display: "flex",
		alignItems: "center",
		".heading-anchor": {
			marginRight: ".5rem",
			backgroundImage:
				"linear-gradient(to right in oklch, {colors.sz.primary}, {colors.sz.secondary})",
			WebkitBackgroundClip: "text",
			backgroundClip: "text",
			color: "transparent",
			transition: "background-image 0.2s ease-in-out",
			_hover: {
				backgroundImage:
					"linear-gradient(to right in oklch, {colors.sz.primary/60}, {colors.sz.secondary/60})",
			},
		},
	},
	".heading-1": {
		fontSize: "2xl",
		_lg: {
			fontSize: "3xl",
		},
	},
	".heading-2": {
		fontSize: "xl",
		_lg: {
			fontSize: "2xl",
		},
	},
	".heading-3": {
		fontSize: "lg",
		_lg: {
			fontSize: "xl",
		},
	},
	".heading-4": {
		fontSize: "base",
		_lg: {
			fontSize: "lg",
		},
	},
	".heading-5": {
		fontSize: "sm",
		_lg: {
			fontSize: "base",
		},
	},
	".heading-6": {
		fontSize: "xs",
		_lg: {
			fontSize: "sm",
		},
	},

	// Expressiveのコードブロック
	".expressive-code": {
		my: "4",
	},
};
