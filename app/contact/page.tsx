import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ContactInfo } from '@/components/pages/contact/info';
import { ConsultationForm } from '@/components/home/contact';
import { fetchSiteSettings, fetchServices, fetchHomePage } from '@/sanity/lib/data';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactPage() {
  const settings = await fetchSiteSettings();
  const services = await fetchServices();
  const homeData = await fetchHomePage();

  return (
    <>
      <Header settings={settings} />
      <main className="bg-bg-primary text-text-on-dark flex min-h-[80vh] items-center px-6 py-20 md:px-24 lg:px-32">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="flex flex-col justify-center lg:col-span-5">
            <ContactInfo homeData={homeData} />
          </div>
          <div className="bg-bg-surface/10 border-border-on-dark rounded-sm border p-6 backdrop-blur-xs sm:p-10 lg:col-span-7">
            <ConsultationForm homeData={homeData} services={services} />
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
