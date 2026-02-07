# Style & Convention Guidelines

## TypeScript

- Strict mode enabled
- Path aliases: @/_ → src/_, ~/_ → public/_
- JSX: react-jsx import source
- Types in separate .ts files or inline

## Styling with PandaCSS

- Use semantic tokens: sz.primary, sz.bg, sz.text.main, sz.border, etc.
- Light/dark mode with: { base: "light-value", \_dark: "dark-value" }
- Responsive breakpoints: sm (≤640px), md (641-768px), lg (≥769px)
- Custom conditions: dark, light

## Naming Conventions

- React Components: PascalCase (.tsx)
- Astro Components: PascalCase (.astro)
- Utilities: camelCase (.ts)
- Constants: UPPER_SNAKE_CASE
- CSS Classes: kebab-case

## Code Organization

- Keep components focused and single-responsibility
- Use composition over inheritance
- Prefer functional components
- Extract reusable logic to utils/

## Markdown Content

- Stored in src/content/{collection}/
- Frontmatter with metadata (title, description, date, etc.)
- Support for LaTeX math (remark-math + rehype-katex)
- Wiki links support (remark-wiki-links)
- Callout/admonition support (@r4ai/remark-callout)

## Colors & Tokens

- Callout colors: callout-blue, callout-cyan, callout-green, callout-orange, callout-red, callout-purple, callout-gray
- Primary: #3951E2 (light) / #5a73f5 (dark)
- Secondary: #6bbaa3 (light) / #7ecbb3 (dark)
- Fonts: IBM Plex Sans JP (main), Moralerspace Neon (code)
