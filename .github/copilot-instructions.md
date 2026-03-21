# Copilot Instructions for v2.suzuuuuu09.com

## Project Overview

This is a personal website/blog built with **Astro 5**, deployed on **Cloudflare Pages**. The site uses:
- **Panda CSS** for styling (NOT Tailwind)
- **React 19** for interactive components
- **Biome** for formatting (tabs, double quotes)
- **Bun** as the package manager and runtime
- **dotenvx** for environment variable management

## Build, Test, and Lint Commands

```bash
# Development
bun dev                # Start dev server at localhost:4321
bun dev:host          # Dev server accessible from network

# Build & Preview
bun build             # Build for production
bun preview           # Preview production build with Wrangler Pages

# Code Quality
bun format            # Format code with Biome
bun lint              # Lint code with Biome

# Styling
bun prepare           # Generate Panda CSS styled-system (run after config changes)
```

**Note:** All commands use `dotenvx run --` to load environment variables. The project uses `.env` and `.env.keys` files.

## Architecture

### Content Collections

The site has three Astro content collections defined in `src/content.config.ts`:

1. **blog**: Blog posts with categories (tech/idea/private/work), optional emoji
2. **product**: Portfolio items requiring either `thumbnail` OR `carousel` (XOR validation)
3. **award**: Awards/achievements with type and date

All collections use glob loaders and share common frontmatter fields (title, slug, tags, description, isPublish).

### Markdown Processing Pipeline

Custom remark/rehype plugins extend Astro's markdown capabilities:

**Remark plugins** (process markdown AST):
- `remarkWikiLinks`: Converts `![[assets/image.webp]]` → images/videos from R2, `[[/path|text]]` → internal links
- `remarkEmbedLinks`: Embeds external links with Open Graph metadata
- `remarkCallout`: Custom callout/admonition blocks
- `remarkMath`: LaTeX math support

**Rehype plugins** (process HTML AST):
- `rehypeCaption`: Custom caption handling
- `rehypeBudoux`: Japanese line breaking with BudouX
- `rehypeKatex`: Renders LaTeX math
- `rehypeSlug` + `rehypeAutolinkHeadings`: Auto-generates heading anchors with `#` symbols
- `rehypeExternalLinks`: Adds target="_blank" and rel attributes with ↗️ suffix

### Styling System

**Panda CSS** generates a type-safe styled-system from `panda.config.ts`:

- Global styles split into modules: `base`, `embed`, `emoji`, `markdown`
- Custom semantic tokens namespace: `sz.*` (e.g., `sz.primary`, `sz.bg`, `sz.text.main`)
- Color tokens have light/dark variants (`s-primary` / `s-primary-dark`)
- Responsive conditions: `sm` (≤640px), `md` (641-768px), `lg` (≥769px)
- Theme conditions: `dark` / `light` via `[data-theme]` attribute
- Custom fonts: IBM Plex Sans JP, Moralerspace Neon (loaded via globalFontface)

The `styled-system/` directory is auto-generated - **never edit it directly**. Run `bun prepare` after changing `panda.config.ts`.

### Asset Management

Images/videos are stored in **Cloudflare R2** (not in `/public`):
- Base URL: `R2_URL` constant from `src/consts/base`
- Wiki-style links in markdown automatically resolve to R2
- Supports: `![[filename.webp]]`, `![[assets/path/to/file.mp4]]`

### Path Aliases

Configured in `tsconfig.json`:
- `@/*` → `./src/*`
- `~/*` → `./public/*`
- `styled-system/*` → `styled-system/*` (Panda CSS output)

## Key Conventions

### Code Style

- **Tabs** for indentation (enforced by Biome)
- **Double quotes** for strings
- JSX framework: React with `react-jsx` transform
- Imports are auto-organized by Biome

### Content Structure

```
src/content/
├── blog/           # Blog posts
├── product/        # Portfolio items
├── award/          # Awards/achievements
├── about.md        # About page
├── career.md       # Career timeline
└── privacy-policy.md
```

All markdown content uses frontmatter with schema validation. Set `isPublish: true` to make content visible.

### Plugin Development

When creating custom remark/rehype plugins:
1. Place in `src/lib/remark/` or `src/lib/rehype/`
2. Export as default function
3. Register in `astro.config.mjs` under `markdown.remarkPlugins` or `markdown.rehypePlugins`
4. Use `visit()` from `unist-util-visit` for AST traversal
5. Return transformed tree (remark) or undefined (rehype mutates in place)

### Expressive Code Configuration

Syntax highlighting uses dual themes:
- Light: `catppuccin-latte`
- Dark: `catppuccin-mocha`
- Custom fonts: Moralerspace Neon (code), IBM Plex Sans JP (UI)
- Theme names set to match `theme.type` for conditional styling

### Environment Variables

All scripts use `dotenvx run --` wrapper. Store secrets in `.env` (gitignored) and encrypted keys in `.env.keys` (committed).

## Deployment

The site is configured for **Cloudflare Pages** with static output. The adapter is included but output mode is `"static"`.
