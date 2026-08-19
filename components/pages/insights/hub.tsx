import Link from 'next/link';
import { Bell, BookOpen, Newspaper, Sparkles } from 'lucide-react';
import type { InsightsPageData, PostData, SiteSettingsData } from '@/sanity/lib/types';
import { defaultInsightsPage, defaultPosts, defaultSiteSettings } from '@/sanity/lib/types';
import { PageHeader } from '@/components/ui/page-header';
import { cleanStega } from './utils';
import { FeaturedInsights } from './sections/featured-insights';
import { InformationGuides } from './sections/information-guides';
import { AnnouncementsSidebar } from './sections/announcements-sidebar';
import { NewsSidebar } from './sections/news-sidebar';
import { ConsultationCard } from './sections/consultation-card';

interface InsightsHubProps {
  insightsPageData?: InsightsPageData;
  posts?: PostData[];
  settings?: SiteSettingsData;
}

export function InsightsHub({
  insightsPageData = defaultInsightsPage,
  posts = [],
  settings = defaultSiteSettings,
}: InsightsHubProps) {
  // Use posts if available, otherwise fallback to defaults so cards are never blank
  const allPosts = posts && posts.length > 0 ? posts : defaultPosts;

  // Segregate posts by kind (supporting both singular and plural forms, robust to Stega metadata)
  const insightPosts = allPosts.filter((p) => {
    const k = cleanStega(p.kind);
    return k === 'insight' || k === 'insights' || !k;
  });
  const infoPosts = allPosts.filter((p) => {
    const k = cleanStega(p.kind);
    return k === 'information' || k === 'info';
  });
  const announcementPosts = allPosts.filter((p) => {
    const k = cleanStega(p.kind);
    return k === 'announcement' || k === 'announcements';
  });
  const newsPosts = allPosts.filter((p) => {
    const k = cleanStega(p.kind);
    return k === 'news';
  });

  return (
    <div>
      {/* 01. Click-Editable Page Header */}
      <PageHeader
        eyebrow={insightsPageData.eyebrow}
        title={insightsPageData.titleMain}
        accent={insightsPageData.titleAccent}
        copy={insightsPageData.description}
      />

      {/* 02. Main Multi-Section Content Area */}
      <section className="bg-bg-app px-6 py-12 md:px-12 md:py-20">
        <div className="mx-auto max-w-7xl">
          {/* Category Quick-Navigation Strip */}
          <div className="border-border-subtle/80 bg-bg-surface/90 mb-12 flex flex-col justify-between gap-3.5 rounded-sm border p-4 shadow-2xs backdrop-blur-xs xl:flex-row xl:items-center xl:p-3">
            <div className="flex flex-col gap-2.5 xl:flex-row xl:items-center xl:gap-3">
              <span className="text-text-muted px-0.5 text-[11px] font-bold tracking-wider uppercase select-none xl:px-1 shrink-0">
                Browse By Category:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href="#insights-section"
                  className="bg-accent/10 hover:bg-accent/20 text-accent border-accent/20 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all hover:scale-102"
                >
                  <Sparkles size={12} className="text-accent" />
                  Featured Insights
                  {insightPosts.length > 0 && (
                    <span className="bg-accent/20 ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold">
                      {insightPosts.length}
                    </span>
                  )}
                </a>

                <Link
                  href="/information"
                  className="hover:border-accent/30 hover:bg-bg-primary/5 text-text-main hover:text-accent border-border-subtle inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all hover:scale-102"
                >
                  <BookOpen size={12} className="text-accent" />
                  Practical Guides
                  {infoPosts.length > 0 && (
                    <span className="bg-bg-app text-text-muted ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold">
                      {infoPosts.length}
                    </span>
                  )}
                </Link>

                <Link
                  href="/announcements"
                  className="hover:border-accent/30 hover:bg-bg-primary/5 text-text-main hover:text-accent border-border-subtle inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all hover:scale-102"
                >
                  <Bell size={12} className="text-accent" />
                  Official Notices
                  {announcementPosts.length > 0 && (
                    <span className="bg-bg-app text-text-muted ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold">
                      {announcementPosts.length}
                    </span>
                  )}
                </Link>

                <Link
                  href="/news"
                  className="hover:border-accent/30 hover:bg-bg-primary/5 text-text-main hover:text-accent border-border-subtle inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold transition-all hover:scale-102"
                >
                  <Newspaper size={12} className="text-accent" />
                  Immigration News
                  {newsPosts.length > 0 && (
                    <span className="bg-bg-app text-text-muted ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold">
                      {newsPosts.length}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            <Link
              href="/questions"
              className="text-text-muted hover:text-accent hidden shrink-0 items-center gap-1 text-xs font-semibold transition-colors xl:inline-flex"
            >
              Have a specific question? Visit Q&A →
            </Link>
          </div>

          <div className="flex flex-col gap-12">
            {/* ROW 1: Featured Insights (8 cols) & Official Notices / Announcements (4 cols) Perfectly Aligned */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-stretch">
              <div className="flex flex-col lg:col-span-8">
                <FeaturedInsights insightsPageData={insightsPageData} posts={insightPosts} />
              </div>
              <div className="flex flex-col lg:col-span-4">
                <div className="border-border-subtle bg-bg-surface flex h-full flex-col rounded-sm border shadow-xs">
                  <AnnouncementsSidebar
                    insightsPageData={insightsPageData}
                    posts={announcementPosts}
                  />
                </div>
              </div>
            </div>

            {/* Full-Width Architectural Divider Between Rows */}
            <div className="relative my-2 flex items-center justify-center">
              <div className="border-border-subtle absolute inset-0 flex items-center">
                <div className="border-border-subtle w-full border-t" />
              </div>
              <div className="bg-bg-app border-border-subtle text-accent/90 relative flex items-center gap-2.5 rounded-full border px-4 py-1 text-[11px] font-bold tracking-widest uppercase shadow-2xs">
                <span className="bg-accent h-1.5 w-1.5 rounded-full" />
                <span>Knowledge Base & Community Updates</span>
                <span className="bg-accent h-1.5 w-1.5 rounded-full" />
              </div>
            </div>

            {/* ROW 2: Information Guides (8 cols) & News + Consultation (4 cols) starting at identical baseline */}
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
              <div className="flex flex-col lg:col-span-8">
                <InformationGuides insightsPageData={insightsPageData} posts={infoPosts} />
              </div>
              <div className="flex flex-col gap-8 lg:col-span-4">
                <div className="border-border-subtle bg-bg-surface flex flex-col rounded-sm border shadow-xs">
                  <NewsSidebar insightsPageData={insightsPageData} posts={newsPosts} />
                </div>
                <ConsultationCard
                  insightsPageData={insightsPageData}
                  settings={settings}
                  variant="card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
