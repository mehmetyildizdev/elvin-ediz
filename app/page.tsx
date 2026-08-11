import { Header } from '@/components/layout/header';
import { Hero } from '@/components/sections/hero';
import { TrustBar } from '@/components/sections/trust-bar';
import { Services } from '@/components/sections/services';
import { RcicSection } from '@/components/sections/rcic-section';
import { Testimonials } from '@/components/sections/testimonials';
import { About } from '@/components/sections/about';
import { Process } from '@/components/sections/process';
import { Insights } from '@/components/sections/insights';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/layout/footer';
import {
  fetchSiteSettings,
  fetchHomePage,
  fetchServices,
  fetchTestimonials,
  fetchStaff,
} from '@/sanity/lib/data';

export default async function Home() {
  const settings = await fetchSiteSettings();
  const homeData = await fetchHomePage();
  const services = await fetchServices();
  const testimonials = await fetchTestimonials();
  const staff = await fetchStaff();

  return (
    <main>
      <Header settings={settings} />
      <Hero homeData={homeData} />
      <TrustBar />
      <Services services={services} />
      <RcicSection homeData={homeData} />
      <About staff={staff} homeData={homeData} />
      <Testimonials testimonials={testimonials} />
      <Process />
      <Insights />
      <Contact />
      <Footer />
    </main>
  );
}
