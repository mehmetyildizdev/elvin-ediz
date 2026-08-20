import type { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import {
  Hero,
  TrustBar,
  Services,
  RcicSection,
  Testimonials,
  About,
  Process,
  Insights,
  Contact,
} from '@/components/home';
import { Footer } from '@/components/layout/footer';
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

export const revalidate = 1209600; // 2 weeks

export async function generateMetadata(): Promise<Metadata> {
  const [settings, homeData] = await Promise.all([
    fetchSiteSettings(),
    fetchHomePage(),
  ]);

  return buildPageMetadata({
    pageTitle: homeData.heroTitle,
    pageDescription: homeData.heroSubtitle || homeData.strategyParagraph1,
    pageCoverImageUrl: homeData.whoAreWeImageUrl || homeData.aboutImageUrl,
    seo: homeData.seo,
    settings,
    canonicalPath: '/',
  });
}

export default async function Home() {
  const [settings, homeData, services, testimonials, googleReviews, staff] = await Promise.all([
    fetchSiteSettings(),
    fetchHomePage(),
    fetchServices(),
    fetchTestimonials(),
    fetchGoogleReviews(),
    fetchStaff(),
  ]);

  const homeJsonLd = buildPageJsonLd({
    title: homeData.heroTitle || 'Elvin Ediz Immigration Services',
    description: homeData.heroSubtitle,
    url: '/',
    defaultType: 'Organization',
    structuredDataType: homeData.seo?.structuredDataType,
    settings,
    services,
  });

  return (
    <main>
      <JsonLd data={homeJsonLd} />
      <Header settings={settings} />
      <Hero homeData={homeData} settings={settings} />
      <TrustBar homeData={homeData} />
      <Services services={services} homeData={homeData} />
      <RcicSection homeData={homeData} settings={settings} />
      <About staff={staff} homeData={homeData} settings={settings} />
      <Testimonials
        testimonials={testimonials}
        googleReviews={googleReviews}
        homeData={homeData}
      />
      <Process homeData={homeData} />
      <Insights homeData={homeData} />
      <Contact homeData={homeData} services={services} />
      <Footer settings={settings} />
    </main>
  );
}



