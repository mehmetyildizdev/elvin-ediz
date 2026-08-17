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

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const [settings, homeData, services, testimonials, googleReviews, staff] = await Promise.all([
    fetchSiteSettings(),
    fetchHomePage(),
    fetchServices(),
    fetchTestimonials(),
    fetchGoogleReviews(),
    fetchStaff(),
  ]);

  return (
    <main>
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



