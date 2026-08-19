# Elvin Ediz Immigration Services

## Stack

- **Next.js + Tailwind** website hosted on Cloudflare (OpenNext).
- **Sanity Studio** for content management.

## Sanity Studio

The Studio is intentionally streamlined:

1. **Posts & Insights** — direct creation and management for Insights, News, Announcements, and Information articles.
2. **Q&A** — managed Q&A items rendered dynamically on the website.
3. **Services & Reviews** — manageable service packages and synced Google Reviews.
4. **Form Appointments** — incoming consultation requests submitted through the website.
5. **Team** and **Site settings**.

Set `SANITY_STUDIO_PROJECT_ID` and `SANITY_STUDIO_DATASET` before running or deploying the Studio. The schema and desk structure are in `sanity.config.ts` and `sanity/`.

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
