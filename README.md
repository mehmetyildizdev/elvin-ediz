# Elvin Ediz Immigration Services

Web application and content management system for **Elvin Ediz Immigration Services**.

---

## 🌐 Live Environments

- **Public Website (Cloudflare)**: [https://elvin-ediz.memostar91.workers.dev/](https://elvin-ediz.memostar91.workers.dev/)
- **Sanity Studio (CMS)**: [https://elvin-ediz.sanity.studio/](https://elvin-ediz.sanity.studio/)

---

## 🛠️ Architecture & Tech Stack

- **Frontend & Server Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components, TypeScript, Tailwind CSS).
- **Edge Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/) via [@opennextjs/cloudflare](https://opennext.js.org/cloudflare).
- **Headless Content Management**: [Sanity.io](https://www.sanity.io/) (v6 Studio hosted on `sanity.studio`).
- **Form Submissions**: Native Next.js server route (`/api/appointment`) directly saving incoming client inquiries into the Sanity dataset with optional notification webhooks.
- **Review Automation**: Automated Puppeteer script for syncing verified Google Business reviews to Sanity (`scripts/sync-google-reviews.mjs`).

---

## 📁 Sanity Studio Content Structure

The Studio is streamlined for fast, intuitive content management:

1. **Site Settings & Topbar**: Business phone, email, WhatsApp settings, address, and announcement banner text.
2. **Page Content**: Home page hero/sections, Services hero, Insights & Updates hub, Q&A accordions, and Privacy Policy.
3. **Immigration Services**: Dedicated catalog of immigration programs, requirements, timelines, and fees.
4. **Google Reviews & Testimonials**: Synced Google reviews with live ratings plus curated testimonials.
5. **Insights & Articles**: Direct management for 4 categorized publication feeds:
   - _Insights_
   - _News_
   - _Announcements_
   - _Information_
6. **Form Appointments**: Live pipeline for incoming website consultation leads:
   - `🟢 New Inquiries` (Needs Attention)
   - `⚪ Contacted` (Handled)

---

## 🚀 Local Development

### 1. Prerequisites

- Node.js `v20+` or `v24+`
- `pnpm` (`v9` or `v10`)

### 2. Setup Environment

Copy `.env.example` to `.env.local` and set your credentials:

```bash
cp .env.example .env.local
```

Key environment variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
NEXT_PUBLIC_SANITY_API_VERSION
SANITY_EDITOR_TOKEN
SANITY_AUTH_TOKEN
SANITY_STUDIO_PROJECT_ID
SANITY_STUDIO_DATASET
SANITY_STUDIO_PREVIEW_URL
```

### 3. Run Locally

```bash
# Start website
pnpm dev

# Start Sanity Studio locally (runs on http://localhost:3333)
pnpm run studio
```

---

## 🚢 Deployment

### 1. Website (Cloudflare Workers via OpenNext)

You can deploy directly from your terminal:

```bash
pnpm run deploy
```

_Or use the manual GitHub Actions workflow: **Actions ➜ Deploy to Cloudflare ➜ Run workflow**._

### 2. Sanity Studio (Sanity Hosting)

Deploy schema and CMS updates to `https://elvin-ediz.sanity.studio/`:

```bash
pnpm run studio:deploy
```

---

## ⚡ Sanity Live Editing & Real-Time Sync

1. **`<VisualEditing />`** (`next-sanity/visual-editing` in [`app/layout.tsx`](app/layout.tsx)):
   Enables click-to-edit overlays and live DOM mutation previews when browsing the site inside the Sanity Studio Presentation Tool.
2. **`<SanityLive />`** (`next-sanity/live` in [`sanity/lib/live.ts`](sanity/lib/live.ts) & [`app/layout.tsx`](app/layout.tsx)):
   Maintains a real-time Server-Sent Events (SSE) subscription to Sanity mutations, updating server components immediately when documents are edited or published without manual refreshes.
3. **Stega Stripping** ([`sanity/lib/iconLibrary.ts`](sanity/lib/iconLibrary.ts)):
   Uses `stegaClean()` to ensure invisible metadata characters don't interfere with dynamic icon dictionary mappings and UI logic.
