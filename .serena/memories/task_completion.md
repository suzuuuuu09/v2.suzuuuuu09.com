# Task Completion Checklist

## After Making Changes

1. Run `bun prepare` to codegen PandaCSS if modifying styles/panda.config.ts
2. Run `bun build` to verify production build succeeds
3. Run `bun dev` to test locally
4. Check TypeScript with `bun astro check` if modifying types
5. Verify no console errors in browser DevTools

## File Modifications

- Always use TypeScript syntax
- Follow existing component patterns
- Update related documentation if needed
- Add semantic tokens to PandaCSS if adding new colors/tokens
