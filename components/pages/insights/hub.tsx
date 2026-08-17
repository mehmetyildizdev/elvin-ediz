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
      <section className="bg-bg-app px-6 py-16 md:px-12 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* LEFT MAIN COLUMN (8 cols): Insights & Information Sections */}
            <div className="flex flex-col gap-20 lg:col-span-8">
              <FeaturedInsights insightsPageData={insightsPageData} posts={insightPosts} />
              <InformationGuides insightsPageData={insightsPageData} posts={infoPosts} />
            </div>

            {/* RIGHT SIDEBAR COLUMN (4 cols): Announcements, News & Consultation */}
            <div className="flex flex-col gap-10 lg:col-span-4">
              <AnnouncementsSidebar insightsPageData={insightsPageData} posts={announcementPosts} />
              <NewsSidebar insightsPageData={insightsPageData} posts={newsPosts} />
              <ConsultationCard insightsPageData={insightsPageData} settings={settings} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
