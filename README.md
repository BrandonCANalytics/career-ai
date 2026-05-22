# BrandonCantrell.ai

An AI-powered portfolio experience for Brandon Cantrell. The app is built as a polished conversational interface for analytics engineering, AI product, GTM analytics, data engineering, and data analyst audiences.

This is not a static portfolio page. It is a small AI-native product layer that personalizes prompts, project ordering, and assistant context from visitor intent.

## Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- shadcn-style UI primitives
- Vercel AI SDK
- OpenAI API with `gpt-4.1-mini`
- PostHog analytics
- OpenNext for Cloudflare deployment

## Key Features

- Role-based personalization through `?role=ae`, `?role=ai`, `?role=gtm`, `?role=de`, and `?role=da`
- Streaming AI chat backed by deterministic local context retrieval
- Curated role-specific prompt chips
- Guardrailed assistant behavior that stays grounded in local portfolio content
- Expandable selected work and technical project evidence
- Resume, GitHub, and LinkedIn actions
- PostHog event tracking for prompt clicks, role views, project engagement, resume downloads, CTA clicks, and chat activity
- Mobile-first responsive layout with dark mode by default

## Project Structure

```text
app/                  Next.js App Router pages, layout, API route, global styles
components/           Portfolio shell, chat UI, project showcase, UI primitives
content/              Structured local portfolio context
lib/                  Retrieval, role normalization, analytics helpers, shared types
public/resumes/       Resume PDFs
scripts/              Smoke, security, and tracking validation scripts
docs/                 Design system and engineering standards
```

## Environment Variables

Create `.env` locally. Do not commit it.

```bash
OPENAI_API_KEY=your_openai_key
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

`OPENAI_API_KEY` is required for chat responses. The PostHog variables are optional for local development, but production analytics require `NEXT_PUBLIC_POSTHOG_KEY`.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Role-targeted examples:

```text
http://localhost:3000?role=ae
http://localhost:3000?role=ai
http://localhost:3000?role=gtm
```

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run test:smoke
npm run test:security
npm run test:tracking
npm run test:all
```

`npm run test:all` runs linting, type checking, smoke checks, security checks, tracking checks, and the Next.js build.

## Cloudflare Deployment

This app uses `@opennextjs/cloudflare`, which deploys the Next.js app to Cloudflare Workers with static assets. The relevant config lives in `wrangler.jsonc` and `open-next.config.ts`.

Build for Cloudflare:

```bash
npm run cf:build
```

Deploy:

```bash
npm run deploy
```

Before production deploy, set these Cloudflare environment variables/secrets:

- `OPENAI_API_KEY` as a secret
- `NEXT_PUBLIC_POSTHOG_KEY` as a production environment variable
- `NEXT_PUBLIC_POSTHOG_HOST` as a production environment variable, if not using the default PostHog US host

The Cloudflare project name is configured as `career-ai`.

## Content Editing

Structured portfolio content lives in `content/`. The assistant uses deterministic retrieval from local JSON and curated context. Keep claims grounded in those files so the chat assistant can answer accurately without inventing experience.

## Git Workflow

Follow `docs/engineering-standards.md`:

- work on feature branches
- use semantic commit messages
- keep commits scoped
- keep `main` deployable
