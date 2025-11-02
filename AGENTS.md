# Project: YouTube Audiobook Downloader | Tech: Next.js + TypeScript | AI Agent Rules

## BUILD & TEST
- Build: `npm run build` (verify via `tsc --noEmit`)
- Test: `npm test` (if configured)
- Lint: `npm run lint` (auto-fix: `npm run lint -- --fix`)

## CODE STYLE
- TypeScript strict mode REQUIRED (`strict: true` in tsconfig.json)
- Explicit return types for functions; explicit types when inference insufficient
- Avoid `any` (document exceptions); use `as const` for literals; handle nullability (`?` or `| null`)
- Functional components with hooks only (no class components)
- kebab-case files, PascalCase components

## PATTERNS
- Next.js single page application (SPA)
- Use App Router (Next.js 13+) or Pages Router (Next.js 12-)
- Extract reusable logic to custom hooks
- Small, focused components

## SECURITY
- No hardcoded secrets/keys
- Validate all user inputs
- Sanitize YouTube URLs before processing

## GIT
Conventional Commits: `<type>(<scope>): <subject>`

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`

Example: `feat(audio): add YouTube audio extraction using yt-dlp`
