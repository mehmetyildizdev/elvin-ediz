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

1. Copy `.env.example` to `.env.local`.
2. Install packages with `pnpm install`.
3. Run the website with `pnpm dev`.
4. Run Sanity Studio with `pnpm studio` (or `cd sanity && pnpm dev`).

## Sanity Live Editing & Cache Architecture

### 1. Real-Time Live Editing (Presentation & Studio)
Live visual editing and sub-second previews are powered by two complementary layers:

- **`<VisualEditing />`** (`next-sanity/visual-editing` in [`app/layout.tsx`](app/layout.tsx)):
  Attaches postMessage event listeners between Sanity Studio's Presentation iframe and the Next.js app. It enables interactive click-to-edit overlays and mutates text nodes in the DOM in real time as you type.
- **`<SanityLive />`** (`next-sanity/live` in [`sanity/lib/live.ts`](sanity/lib/live.ts) & [`app/layout.tsx`](app/layout.tsx)):
  Maintains a real-time Server-Sent Events (SSE) subscription to Sanity dataset mutations. When non-text attributes change (e.g. selecting a new visual icon, reordering list items, or clicking **Publish**), Sanity pushes a listener event that automatically revalidates Next.js Server Components in the background with zero manual page refreshes.
- **Stega Metadata & `stegaClean`** ([`sanity/lib/iconLibrary.ts`](sanity/lib/iconLibrary.ts)):
  In draft/live mode, Sanity encodes hidden Stega characters into strings to track document paths. For dictionary lookups (such as dynamic icon resolution), [`stegaClean(name)`](sanity/lib/iconLibrary.ts) strips invisible characters to guarantee exact key matching while preserving Stega tags on visible text nodes.

### 2. Cache Resolution & Development Data Sync
To ensure changes appear immediately during development:

- **Dynamic Fetching**: All GROQ queries in [`sanity/lib/data.ts`](sanity/lib/data.ts) pass `{ next: { revalidate: 0 } }` to avoid Next.js server fetch caching.
- **CDN Bypass**: [`sanity/lib/data.ts`](sanity/lib/data.ts) automatically sets `useCdn: false` during development (`NODE_ENV === 'development'`) and draft mode to bypass Sanity API Edge CDN propagation latency.
- **Route Dynamic Rendering**: Key pages ([`app/page.tsx`](app/page.tsx) and [`app/services/page.tsx`](app/services/page.tsx)) export `dynamic = 'force-dynamic'` and `revalidate = 0`.
