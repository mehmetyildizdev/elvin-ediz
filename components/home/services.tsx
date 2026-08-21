import Link from 'next/link';
import { IdCard } from 'lucide-react';
import type { ServiceData, HomePageData } from '@/sanity/lib/types';
import { defaultServices, defaultHomePage } from '@/sanity/lib/types';
import { getIconComponent } from '@/sanity/lib/iconLibrary';

export function Services({
  services = defaultServices,
  homeData = defaultHomePage,
  lang = 'en',
}: {
  services?: ServiceData[];
  homeData?: HomePageData;
  lang?: string;
}) {
  const validServices = (services || []).filter((s) => s && s.title);
  const localize = (path: string) => {
    if (!lang || lang === 'en') return path;
    if (path.startsWith(`/${lang}`)) return path;
    return `/${lang}${path.startsWith('/') ? path : `/${path}`}`;
  };

  const viewAllHref = homeData.servicesViewAllLink
    ? localize(homeData.servicesViewAllLink)
    : localize('/services');

  return (
    <section className="bg-bg-app px-6 py-20 md:px-12 md:py-32" id="services">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-24">
        <div className="flex flex-col justify-center lg:col-span-5">
          <p className="text-accent mb-4 text-xs font-bold tracking-widest uppercase">
            {homeData.servicesEyebrow || 'IMMIGRATION PATHWAYS'}
          </p>
          <h2 className="text-text-main mb-6 font-serif text-4xl leading-tight sm:text-5xl md:text-5xl">
            {homeData.servicesTitleMain || 'Choose your'} <br />
            <span className="text-accent font-serif italic">
              {homeData.servicesTitleAccent || 'immigration plan.'}
            </span>
          </h2>
          <p className="text-text-muted max-w-md text-base leading-relaxed">
            {homeData.servicesDescription ||
              'We personalize your immigration plan to suit your needs and goals. Your pathway to Canada is divided into distinct, clear categories.'}
          </p>
          <Link
            href={viewAllHref}
            className="text-accent hover:text-accent-hover mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
          >
            {homeData.servicesViewAllText || `View all ${validServices.length} pathways →`}
          </Link>
        </div>

        <div className="border-border-subtle flex flex-col border-t lg:col-span-7">
          {validServices.map((service, i) => {
            const IconComp = getIconComponent(service.iconName) || IdCard;
            const serviceHref = localize(`/services?tab=${service.slug}#pathways-tabs`);

            return (
              <Link
                href={serviceHref}
                key={service._id || service.slug}
                className="border-border-subtle hover:border-accent/40 hover:bg-bg-surface/70 group grid cursor-pointer grid-cols-1 items-center gap-4 border-b py-6 transition-all duration-300 hover:pl-4 sm:gap-6 md:grid-cols-12"
              >
                <span className="text-accent font-serif text-lg font-semibold">0{i + 1}</span>
                <span className="border-border-subtle text-accent bg-bg-surface group-hover:border-accent/50 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-105">
                  <IconComp size={22} />
                </span>
                <div className="flex flex-col gap-0.5 pr-2 md:col-span-6">
                  <h3 className="text-text-main group-hover:text-accent font-serif text-lg font-semibold transition-colors duration-200 md:text-xl">
                    {service.title}
                  </h3>
                  <p className="text-text-muted hidden text-xs leading-relaxed md:block">
                    {service.summary}
                  </p>
                </div>
                <div className="flex justify-end md:col-span-3">
                  <span className="text-accent group-hover:text-accent-hover inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-colors">
                    Learn more
                    <span className="transition-transform duration-200 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
