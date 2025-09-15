# Repository Guidelines

## Project Structure & Module Organization

- Core app in `src/`: `components/` (UI, PascalCase dirs), `hooks/` (React hooks, `useX`), `store/` (Nanostores state), `utils/` (pure helpers), `style/` (TS color tokens, CSS), `types/` (TS types), `App.tsx`, `main.tsx`.
- Static assets in `public/` (icons, `manifest.json`, `robots.txt`).
- Build output in `dist/`. Entry HTML at `index.html`.

## Build, Test, and Development Commands

- Install: `pnpm install` (Node 20+).
- Dev server: `pnpm dev` (Vite, hot reload).
- Build: `pnpm build` (TypeScript build + Vite bundle to `dist/`).
- Preview: `pnpm preview` (serves the production build).
- Lint: `pnpm lint` (ESLint per `eslint.config.js`).
- Format check: `pnpm prettier` (uses `.prettierrc.json`).

## Coding Style & Naming Conventions

- Language: TypeScript + React 19, TailwindCSS 4 + DaisyUI.
- Indentation: 2 spaces; rely on Prettier. Import order and class sorting follow Prettier + Tailwind plugin.
- Names: components and directories PascalCase (e.g., `Header/`), hooks camelCase with `use` prefix (e.g., `useSettings.ts`), utilities and stores lowercase (e.g., `date.ts`, `settings.ts`).
- UI: Prefer Tailwind utility classes; use `clsx` for conditional classes. Keep components focused and reusable.

## Testing Guidelines

- No testing setup yet. When adding tests, prefer Vitest + React Testing Library.
- Co-locate tests: `ComponentName.test.tsx` next to the component or `*.test.ts` for utilities.
- Aim for unit tests on `src/utils/` and store logic; add simple render tests for critical components.

## Commit & Pull Request Guidelines

- Commit style observed: short, imperative subjects (e.g., "a11y fix", "add analytics", "print and mobile fixes"). Keep to ~50 chars when possible; expand in body if needed. Reference issues with `#123`.
- PRs should include: concise description, screenshots/GIFs for UI changes, steps to verify, and any related issues.
- Keep diffs minimal and focused; update docs (`README.md`/this file) when changing commands or structure.

## Security & Configuration Tips

- Do not commit secrets. Public assets live in `public/`; analytics or SEO tags belong in `index.html` as configured.
- PWA metadata is in `public/manifest.json`; update icons/manifest together.

## Agent-Specific Instructions

- Follow the naming/style rules above and avoid unrelated refactors. Prefer small, targeted patches and explain rationale in PRs.
