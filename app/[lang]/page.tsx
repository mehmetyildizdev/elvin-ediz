import type { Metadata } from 'next';
import {
  Hero,
  TrustBar,
  Services,
  RcicSection,
  Testimonials,
  About,
  Insights,
  Contact,
} from '@/components/home';
import {
  fetchSiteSettings,
  fetchHomePage,
  fetchServices,
  fetchTestimonials,
  fetchGoogleReviews,
  fetchStaff,
} from '@/sanity/lib/data';
import { buildPageMetadata, buildPageJsonLd } from '@/sanity/lib/seo';
import { JsonLd } from '@/components/seo/json-ld';
import { defaultLanguage, isValidLanguage } from '@/sanity/i18n';

export const revalidate = 1209600; // 2 weeks

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;
  const [settings, homeData] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchHomePage(currentLang),
  ]);

  const canonicalPath = currentLang === defaultLanguage ? '/' : `/${currentLang}`;

  return buildPageMetadata({
    pageTitle: homeData.heroTitle,
    pageDescription: homeData.heroSubtitle || homeData.strategyParagraph1,
    pageCoverImageUrl: homeData.whoAreWeImageUrl || homeData.aboutImageUrl,
    seo: homeData.seo,
    settings,
    canonicalPath,
  });
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang = defaultLanguage } = await params;
  const currentLang = isValidLanguage(lang) ? lang : defaultLanguage;

  const [settings, homeData, services, testimonials, googleReviews, staff] = await Promise.all([
    fetchSiteSettings(currentLang),
    fetchHomePage(currentLang),
    fetchServices(currentLang),
    fetchTestimonials(currentLang),
    fetchGoogleReviews(),
    fetchStaff(currentLang),
  ]);

  const canonicalPath = currentLang === defaultLanguage ? '/' : `/${currentLang}`;

  const homeJsonLd = buildPageJsonLd({
    title: homeData.heroTitle || 'Elvin Ediz Immigration Services',
    description: homeData.heroSubtitle,
    url: canonicalPath,
    defaultType: 'Organization',
    structuredDataType: homeData.seo?.structuredDataType,
    settings,
    services,
  });

  return (
    <main>
      <JsonLd data={homeJsonLd} />
      <Hero homeData={homeData} settings={settings} />
      <TrustBar homeData={homeData} />
      <Services services={services} homeData={homeData} lang={currentLang} />
      <RcicSection homeData={homeData} settings={settings} />
      <About staff={staff} homeData={homeData} settings={settings} />
      <Testimonials testimonials={testimonials} googleReviews={googleReviews} homeData={homeData} />
      <Insights homeData={homeData} lang={currentLang} />
      <Contact homeData={homeData} services={services} />
    </main>
  );
}
