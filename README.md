# Elvin Ediz Immigration Services

## Stack

- **Next.js + Tailwind** public website, deployable as a static Cloudflare Pages site.
- **Sanity Studio** for the client’s content editing.
- **Cloudflare Worker + KV** for the daily immigration-news feed and the AI “Make a post” action.

## Sanity Studio

The Studio is intentionally small. It does not expose authors, categories, or tags.

1. **Create a post** — direct buttons for Insight, News post, Announcement, and Information post.
2. Separate lists for each post type.
3. **Immigration News** — a temporary, daily refreshed Google News list. Selecting **Make a post** creates a Sanity news draft using the configured AI provider.
4. **Q&A** — one document with simple question/answer objects, ready to render as an accordion on the website.
5. **Team** and **Site settings**.

Author information is not a Sanity document. It belongs in the website configuration and is applied consistently by the frontend whenever a post shows an author.

Set `SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`, and `SANITY_STUDIO_NEWSROOM_URL` before running or deploying the Studio. The schema and desk structure are in `sanity.config.ts` and `sanity/`.

## Newsroom Worker

The Worker is at `workers/newsroom`. Create the KV namespace, add its ID to `workers/newsroom/wrangler.jsonc`, and set these Worker secrets:

- `SANITY_WRITE_TOKEN` — Sanity Editor write token
- `AI_API_KEY`
- Optional: `AI_API_URL`, `AI_MODEL`

The Cron trigger refreshes the KV cache once a day. The feed is never permanently stored; only a client-selected item is written to Sanity as a draft. See [workers/newsroom/README.md](workers/newsroom/README.md).

## Local setup

1. Copy `.env.example` to `.env`.
2. Install packages in WSL with `pnpm install`.
3. Run the website with `pnpm dev`.
4. Run/deploy Studio and the Worker from their respective configurations after setting credentials.
