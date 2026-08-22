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
- **Internationalization (i18n)**: Sanity Document Internationalization + Next.js Dynamic Language Routing (`app/[lang]/`) supporting English, Turkish, Arabic (RTL), and French.

---

## 🌍 Multi-Language (i18n) Architecture

The application provides end-to-end multi-language support with automatic fallbacks and SEO-optimized URLs:

### 1. Supported Languages

- **English (`en`)**: Master default language. Served at clean root paths (e.g. `/`, `/services`, `/questions`, `/insights/[slug]`).
- **Turkish (`tr`)**: Localized subpath (e.g. `/tr/services`, `/tr/questions`).
- **Arabic (`ar`)**: Localized subpath with automated **RTL (Right-to-Left)** reading direction and layout adjustments (`<html lang="ar" dir="rtl">`).
- **French (`fr`)**: Localized subpath (e.g. `/fr/services`, `/fr/insights/[slug]`).

### 2. URL Strategy & Next.js Proxy (`proxy.ts`)

- Default English visitors keep clean, standard URLs without unnecessary `/en/` redirects.
- Non-default languages use clean top-level subpaths (`/tr/...`, `/ar/...`, `/fr/...`).
- Post slugs in Sanity remain pure without redundant language prefixes (e.g. `/tr/insights/express-entry-pnp`).

### 3. Clean Bundle Boundary (`sanity/i18n/index.ts` vs `sanity/i18n/schema.ts`)

To prevent heavy Sanity Studio internals from leaking into the public website browser bundle:

- **`sanity/i18n/index.ts` (Frontend-Safe)**: Exports pure constants, language definitions (`supportedLanguages`, `defaultLanguage`), and lightweight direction helpers (`getLanguageDirection`, `isValidLanguage`). Safe to import in React client components and Next.js layouts.
- **`sanity/i18n/schema.ts` (Studio-Only)**: Exports Sanity Studio schema helpers (`languageField`, `isSlugUniqueByLanguage`, `slugifyWithI18n`) that import Studio runtime packages (`defineField`, Studio validation types). Used exclusively inside `sanity/schemaTypes/`.

### 4. Language-Aware Data Queries with Fallback (`sanity/lib/data.ts`)

All data fetchers accept an optional `lang` parameter and use GROQ `coalesce()` queries:

- If a translated document exists in the requested language, it is returned immediately.
- If a document is not yet translated, the query seamlessly falls back to the English version so visitors never encounter broken or empty pages.

### 5. Automated Hreflang International SEO

Metadata automatically emits Google-compliant `hreflang` alternate links (`en`, `tr`, `ar`, `fr`, and `x-default`) on every page for indexing.

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

1. **`<VisualEditing />`** (`next-sanity/visual-editing` in [`app/[lang]/layout.tsx`](app/[lang]/layout.tsx)):
   Enables click-to-edit overlays and live DOM element selection when browsing the site inside the Sanity Studio Presentation Tool.
2. **`<SanityLive />`** (`next-sanity/live` in [`sanity/lib/live.ts`](sanity/lib/live.ts) & [`app/[lang]/layout.tsx`](app/[lang]/layout.tsx)):
   Maintains a real-time Server-Sent Events (SSE) subscription in Draft Mode, reflecting changes live in the Studio preview window.
3. **Draft Mode Expiration**:
   - For demo and review sessions, the draft preview cookie (`__prerender_bypass`) in [`app/api/draft/route.ts`](app/api/draft/route.ts) is configured to automatically expire after **1 hour (3600s)**.
   - You can manually disable draft mode anytime by visiting [`/api/disable-draft`](app/api/disable-draft/route.ts).
4. **Stega Stripping** ([`components/pages/insights/utils.ts`](components/pages/insights/utils.ts) & [`sanity/lib/iconLibrary.ts`](sanity/lib/iconLibrary.ts)):
   Uses `cleanStega()` to ensure invisible metadata characters don't interfere with dynamic icon dictionary mappings and URL slugs.

---

## 📊 Cloud Platform Quotas & Studio Performance Impact (Vercel & Sanity Free Tiers)

When managing content, the choice between **Structure Tool** and **Presentation Tool** directly influences local editor responsiveness and cloud platform resource consumption:

| Platform & Metric                                    | Primary Related Uses                                                   | Structure Tool Impact                                       | Presentation Tool Impact                                                     | Quota / Performance Note                                       |
| :--------------------------------------------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------- | :--------------------------------------------------------------------------- | :------------------------------------------------------------- |
| **Vercel: Serverless Function Execution (GB-Hours)** | Live preview re-renders, draft Server Actions, Next.js dynamic routing | **Zero** (Vercel compute is completely idle during editing) | **High** (Re-renders Next.js Server Components on each draft mutation burst) | ⚠️ **Primary bottleneck on Vercel Free Tier (100 GB-hrs/mo)**  |
| **Vercel: Function Invocations & Middleware**        | Route middleware, draft session auth, live revalidation webhooks       | **Zero** while typing; only 1 invocation upon `Publish`     | **Moderate** (1 invocation per draft stream update)                          | ℹ️ Well within free allowances                                 |
| **Sanity: Live Listener (SSE Stream)**               | Real-time content sync between Content Lake and preview window         | **Zero** (No active live stream connected)                  | **Active** (Maintains open SSE connection while tab is open)                 | ℹ️ Handled within Sanity Free Live Content limits              |
| **Sanity: Non-CDN API Requests**                     | Fresh draft queries (`useCdn: false` in live preview)                  | Negligible (Only when opening a document)                   | **Moderate** (Fetches uncached draft data during preview updates)            | ℹ️ Within Sanity Free 10k monthly non-CDN allowance            |
| **Sanity: Document Mutations (Auto-Saves)**          | Typing and editing content fields                                      | **Standard** (Debounced delta patches)                      | **Standard** (Debounced delta patches)                                       | ℹ️ Same across both tools                                      |
| **Editor Input Responsiveness**                      | Real-time typing, long-form copy drafting                              | ⚡ **100% Fluid** (Zero input lag or focus interruption)    | ⏱️ **Can stutter during typing** if DOM overlays re-sync caret focus         | 💡 _Toggle overlays OFF in Presentation toolbar while writing_ |

> 📖 **Complete Client & Editor Guide:** For detailed workflows, step-by-step editing instructions, translation management, and best practices, see [docs/content-editor-guide.md](docs/content-editor-guide.md).

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

---

## 🎯 3-Tier Automated SEO Fallback System

The application implements an automated, zero-friction SEO architecture in [`sanity/lib/seo`](sanity/lib/seo). Editors can publish content without filling out any SEO fields, while search engines and social platforms receive 100% complete metadata and structured data:

1. **Tier 1: Document Content Fallbacks (Automatic)**
   - **Meta Title**: Generated from the document's main `title` / `heroTitle` and formatted with the site template.
   - **Meta Description**: Automatically extracted from `excerpt`, summary, or lead body paragraphs.
   - **Social Share Images**: Uses the document's uploaded `coverImage` or feature photo.
   - **Canonical URL**: Dynamically generated from the clean URL slug (`https://elvinediz.com/insights/[slug]`).
   - **Structured Data (JSON-LD)**: Automatically compiles Schema.org graphs (`Article`, `NewsArticle`, `LegalService`, `FAQPage`, `WebPage`) with author (`Nazly Sunguroglu, RCIC`), publisher, timestamps, and logo.

2. **Tier 2: Global Site Defaults**
   - If document-level fields (like cover image or excerpt) are empty, metadata seamlessly falls back to global values in **Site Settings** (`defaultMetaTitle`, `defaultMetaDescription`, `defaultOgImageUrl`, `siteKeywords`).

3. **Tier 3: Explicit Studio Overrides (Optional)**
   - Editors can open the **SEO & Social Sharing** tab on any document in Sanity Studio to supply custom search titles, custom descriptions, social preview banners, or search engine indexing directives (`noIndex` / `noFollow`).

---

## 💾 Disaster Recovery & Unified Backup Pipeline

The repository includes a unified backup pipeline in [`.github/workflows/backup.yml`](.github/workflows/backup.yml) that packages both the **application code** and the **complete Sanity CMS data (NDJSON documents + raw media assets)** into a single timestamped `.zip` archive.

### 📦 Inside the Backup Archive

Every generated backup archive contains:

```text
elvin-ediz-complete-backup-YYYY-MM-DD_HH-MM-SS.zip
├── code/
│   └── code-snapshot-YYYY-MM-DD_HH-MM-SS.tar.gz    # Clean Git repo source (no node_modules or build bloat)
├── sanity/
│   └── sanity-export-production-YYYY-MM-DD.tar.gz  # Full NDJSON dataset + all uploaded images & documents
└── manifest.json                                   # Metadata: commit SHA, branch, timestamp, dataset
```

---

### 🚀 Running a Manual Backup from GitHub UI

1. Navigate to your GitHub repository and click the **Actions** tab.
2. Under **Workflows** on the left, select **`Project & Sanity CMS Backup`**.
3. Click the **`Run workflow`** dropdown button on the right:
   - **Sanity Dataset to Export**: `production` (default)
   - **Include media assets**: `true` (default)
4. Click **Run workflow**.
5. Once the run finishes (green checkmark), click on the completed run:
   - Scroll down to the **Artifacts** section at the bottom.
   - Click **`elvin-ediz-complete-backup-<timestamp>`** to download the ready-to-use zip file.
   - _Artifacts are retained and downloadable directly from GitHub for 30 days._

---

### 🔄 How to Restore from a Backup

1. **Unzip the main backup package**:
   ```bash
   unzip elvin-ediz-complete-backup-2026-08-22.zip -d ./my-backup
   ```
2. **Restore Application Code**:
   ```bash
   tar -xzf ./my-backup/code/code-snapshot-*.tar.gz -C ./restored-app
   ```
3. **Restore Sanity CMS Content & Assets**:
   ```bash
   pnpm sanity dataset import ./my-backup/sanity/sanity-export-production-*.tar.gz production --replace
   ```

---

### ⏰ Switching to Automated Scheduled Backups

By default, the workflow is configured for on-demand manual triggers. To make it run **automatically on a schedule** (e.g., weekly or daily):

1. Open [`.github/workflows/backup.yml`](.github/workflows/backup.yml).
2. Uncomment the `schedule` block near the top:
   ```yaml
   on:
     workflow_dispatch: # Keep for on-demand runs
     schedule:
       - cron: '0 2 * * 0' # Runs automatically every Sunday at 02:00 UTC
       # - cron: '0 2 * * *' # Uncomment for daily automated backups
   ```
3. Commit and push the changes to your `main` branch. GitHub Actions will now automatically generate and store the backup archives on schedule.

---

### ☁️ Uploading Backups to Google Drive (Optional)

If you wish to automatically upload every generated backup archive to a designated Google Drive folder:

1. **Create a Google Cloud Service Account**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/) and create a project (free).
   - Enable the **Google Drive API**.
   - Create a **Service Account** under _IAM & Admin -> Service Accounts_ and generate a JSON Key.
2. **Share Your Google Drive Folder**:
   - Open your Google Drive in a browser and create a dedicated folder (e.g. `Elvin-Ediz-Backups`).
   - Share that folder with your Service Account's email address (giving it **Editor** permissions).
   - Copy the folder ID from the browser URL (`https://drive.google.com/drive/folders/<FOLDER_ID>`).
3. **Add Secrets to GitHub Repository**:
   - Go to your GitHub repo -> **Settings** -> **Secrets and variables** -> **Actions**.
   - Add `GDRIVE_SERVICE_ACCOUNT_KEY`: Paste the entire JSON key file content.
   - Add `GDRIVE_FOLDER_ID`: Paste your Google Drive folder ID.
   - Ensure `SANITY_EDITOR_TOKEN` (or `SANITY_AUTH_TOKEN`) is also added to secrets.
4. **Enable the Step in the Workflow**:
   - Open [`.github/workflows/backup.yml`](.github/workflows/backup.yml) and uncomment step **`6. Upload Combined Backup to Google Drive`**.
