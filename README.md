# Elvin Ediz Immigration Services

Web application and content management system for **Elvin Ediz Immigration Services**.

---

## 🌐 Live Environments

- **Public Website (Vercel)**: [https://elvin-ediz.vercel.app/](https://elvin-ediz.vercel.app/)
- **Sanity Studio (CMS)**: [https://elvin-ediz.sanity.studio/](https://elvin-ediz.sanity.studio/)

---

## 🛠️ Architecture & Tech Stack

- **Frontend & Server Framework**: Next.js (App Router, Server Components, TypeScript, Tailwind CSS).
- **Hosting & Serverless Platform**: Vercel (Native Next.js ISR, automatic edge caching & GitHub deployment).
- **Headless Content Management**: Sanity.io (v6 Studio hosted on `sanity.studio`).
- **Form Submissions**: Native Next.js server route (`/api/appointment`) directly saving incoming client inquiries into the Sanity dataset with optional notification webhooks.

---

## 📁 Sanity Studio Content Structure

The Studio is streamlined for fast, intuitive content management:

1. **Site Settings & Topbar**: Business phone, email, WhatsApp settings, address, and announcement banner text.
2. **Page Content**: Home page hero/sections, Services hero, Insights & Updates hub, Q&A accordions, and Privacy Policy.
3. **Immigration Services**: Dedicated catalog of immigration programs, requirements, timelines, and fees.
4. **Google Reviews & Testimonials**: Client reviews with live ratings plus curated testimonials.
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
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-07-14
SANITY_EDITOR_TOKEN=your_sanity_token
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_PREVIEW_URL=https://your-site.vercel.app
```

### 3. Run Locally

```bash
# Start website (http://localhost:3000)
pnpm dev

# Start Sanity Studio locally (runs on http://localhost:3333)
pnpm run studio
```

---

## 🚢 Deployment

### 1. Website (Vercel)

The website deploys automatically on every `git push` to the `main` branch via Vercel's GitHub integration.

To configure your Vercel project:

1. Connect repository in your Vercel dashboard.
2. Set the Environment Variables:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_EDITOR_TOKEN` _(or `SANITY_API_READ_TOKEN`)_
   - `SANITY_REVALIDATE_SECRET`

### 2. Sanity Studio (Sanity Hosting)

Deploy schema and CMS updates to `https://elvin-ediz.sanity.studio/`:

```bash
pnpm run studio:deploy
```

---

## ⚡ Sanity Visual Editing & Live Preview

1. **`<VisualEditing />`** (`next-sanity/visual-editing` in [`app/layout.tsx`](app/layout.tsx)):
   Enables click-to-edit overlays and live DOM element selection when browsing the site inside the Sanity Studio Presentation Tool.
2. **`<SanityLive />`** (`next-sanity/live` in [`sanity/lib/live.ts`](sanity/lib/live.ts) & [`app/layout.tsx`](app/layout.tsx)):
   Maintains a real-time Server-Sent Events (SSE) subscription in Draft Mode, reflecting changes live in the Studio preview window.
3. **Draft Mode Expiration**:
   - For demo and review sessions, the draft preview cookie (`__prerender_bypass`) in [`app/api/draft/route.ts`](app/api/draft/route.ts) is configured to automatically expire after **1 hour (3600s)**.
   - You can manually disable draft mode anytime by visiting [`/api/disable-draft`](app/api/disable-draft/route.ts).
4. **Stega Stripping** ([`components/pages/insights/utils.ts`](components/pages/insights/utils.ts) & [`sanity/lib/iconLibrary.ts`](sanity/lib/iconLibrary.ts)):
   Uses `cleanStega()` to ensure invisible metadata characters don't interfere with dynamic icon dictionary mappings and URL slugs.

---

## 🔄 On-Demand Cache Revalidation (Webhook)

When editors publish content in Sanity Studio, Next.js instantly purges the cached pages and hub listings via the scoped webhook route at [`/api/revalidate`](app/api/revalidate/route.ts).

### Setting up the Webhook in Sanity:

1. Go to Sanity Management Dashboard (`sanity.io/manage`) -> Select your Project -> **API** -> **Webhooks**.
2. Click **Create Webhook**:
   - **Name**: `Live Site On-Demand Revalidation`
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Dataset**: `production`
   - **Trigger on**: `Create`, `Update`, `Delete`
   - **Filter**: `_type in ["post", "service", "homePage", "siteSettings", "staffMember", "testimonial", "googleReviews", "faqPage", "privacyPage", "insightsPage", "servicesPage"]`
   - **Projection**: `{ _type, "slug": slug.current, kind }`
   - **HTTP method**: `POST`
   - **Secret**: Set a secret matching your `SANITY_REVALIDATE_SECRET` environment variable.

